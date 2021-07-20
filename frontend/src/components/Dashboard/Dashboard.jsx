import React, { useState, useEffect } from 'react';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Divider, Fab, Typography } from '@material-ui/core';
import { useHistory } from 'react-router';
import { useAuth } from '../../Contexts/AuthContext';
import { auth } from '../../firebase';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import Navbar from '../Navbar/Navbar';
import AddJob from './Add Job/AddJob';
import EditJob from './Edit Job/EditJob';
import useStyles from './styles';
import './Dashboard.sass';

const Dashboard = () => 
{
    const [columns, setColumns] = useState({});
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [id, setId] = useState('');
    const classes = useStyles();
    const history = useHistory();
    const { user } = useAuth();

    useEffect(() => 
    {
        if (!user)
        {
            history.push('/');
            return;
        }
        document.title = `Jobi - ${user.email}'s dashboard`;
        fetch(`/get-all-jobs?email=${user.email}&archived=false`)
        .then(res => res.json())
        .then(json => {
            const fetchedData = {
                "Applied": {
                    name: "Applied",
                    items: json.applied
                },
                "In Progress": {
                    name: "In Progress",
                    items: json.inProgress
                },
                "Rejected": {
                    name: "Rejected",
                    items: json.rejected
                },
                "Not Answered": {
                    name: "Not Answered",
                    items: json.notAnswered
                }
            };
            setColumns(fetchedData);
        });
    }, [history, user]);

    const onDragEnd = (result, columns, setColumns) => 
    {
        if (!result.destination) 
            return;
        const { source, destination, draggableId } = result; // draggableId is job id also
        if (source.droppableId !== destination.droppableId) // Move to other list
        {
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems
                }
            });
            // Update job status due to destination 
            fetch(`/update-job-status?id=${draggableId}`,
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        status: destination.droppableId
                    })
                }
            )
            .then(res => res.json())
            .then(res => console.log(res));
        } 
        else 
        {
            const column = columns[source.droppableId];
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems
                }
            });
        }
    };

    const logout = async() =>
    {
        await auth.signOut();
        history.push('/');
    };

    return user && Object.keys(columns).length > 0 && (
        <>
            <Navbar user={user} logout={logout} />
            <Fab className={classes.fab} onClick={() => setOpen(true)}><AddRoundedIcon /></Fab>
            <div className="dashboard-container">
                {columns["Applied"].items.length > 0 || 
                columns["In Progress"].items.length > 0 || 
                columns["Not Answered"].items.length > 0 ||
                columns["Rejected"].items.length > 0 ?
                (<div className="dnd-container">
                    <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
                        {Object.entries(columns).map(([columnId, column], index) => {
                        return (
                            <div className="context" key={columnId}>
                                <Typography className={classes.text} variant="h6">{column.name}</Typography>
                                <div style={{ margin: 10 }}>
                                    <Droppable droppableId={columnId} key={columnId}>
                                    {(provided, snapshot) => {
                                        return (
                                        <div
                                            className="droppable"
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            style={{
                                                background: snapshot.isDraggingOver
                                                    ? "lightgrey"
                                                    : "#393d49"
                                            }}
                                        >
                                            {column.items.map((item, index) => {
                                                return (
                                                    <Draggable
                                                        key={item._id}
                                                        draggableId={item._id}
                                                        index={index}
                                                    >
                                                        {(provided, snapshot) => {
                                                        return (
                                                            <div
                                                                onClick={() => {setOpenEdit(true); setId(item._id)}}
                                                                className="job-container"
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                style={{
                                                                    backgroundColor: snapshot.isDragging ? "#263B4A" : "#456C86",
                                                                    ...provided.draggableProps.style
                                                                }}
                                                            >
                                                                <div className="job-header">
                                                                    <Typography className={classes.text} variant="subtitle1">{item.title}</Typography>
                                                                    <Typography className={classes.text} variant="caption" color="textSecondary">
                                                                        {(new Date(item.date * 1000).toLocaleDateString("en-GB"))}
                                                                    </Typography>
                                                                </div>
                                                                <Divider className={classes.divider} />
                                                                <Typography className={classes.text} variant="subtitle1">{item.company}</Typography>
                                                            </div>
                                                        );
                                                    }}
                                                    </Draggable>
                                                );
                                            })}
                                            {provided.placeholder}
                                        </div>
                                        );
                                    }}
                                    </Droppable>
                                </div>
                            </div>
                        );
                        })}
                    </DragDropContext>
                </div>)
                :
                <h1>You don't have any active jobs yet</h1>}
            </div>
            <AddJob
                open={open} 
                setOpen={setOpen} 
                email={user.email} 
                columns={columns} 
                setColumns={setColumns} />
            <EditJob
                openEdit={openEdit}
                setOpenEdit={setOpenEdit}
                id={id}
                columns={columns} 
                setColumns={setColumns} />
        </>
    )
}

export default Dashboard;
