import React, { useState, useEffect } from 'react';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Divider, Fab, Typography, Tooltip } from '@material-ui/core';
import { useHistory } from 'react-router';
import { useAuth } from '../../Contexts/AuthContext';
import Emoji from "react-emoji-render";
// import { auth } from '../../firebase';
import useStyles from './styles';
import './Board.sass';
import LoadingAnimation from '../Loading Animation/LoadingAnimation';
import EditJob from '../Board/Edit Job/EditJob';

const Board = () => 
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
            history.push('/login');
            return;
        }
        document.title = `Jobi - ${user.email}'s dashboard`;
        fetch(`/get-all-jobs?email=${user.email}`)
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

    // Drag function
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

    return user && Object.keys(columns).length > 0 ? (
    <>
        <div className="board-container">
            {columns["Applied"].items.length > 0 || 
            columns["In Progress"].items.length > 0 || 
            columns["Not Answered"].items.length > 0 ||
            columns["Rejected"].items.length > 0 ?
            (
                <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
                    {Object.entries(columns).map(([columnId, column], index) => {
                    return (
                        <div className="context" key={columnId}>
                            <div>
                                <Droppable droppableId={columnId} key={columnId}>
                                {(provided, snapshot) => {
                                    return (
                                        <div
                                            className="droppable"
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            style={{
                                                background: snapshot.isDraggingOver ? "#A9A9A9" : "lightgray"
                                            }}
                                        >
                                            <div style={{marginBottom: 20}}>
                                                <Typography className={classes.columnTitle} variant="h6">{column.name}</Typography>
                                                <Typography className={classes.text} variant="subtitle1" color="textSecondary">{column.items.length} jobs</Typography>
                                            </div>
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
                                                                    marginBottom: (column.items.length - 1) === index ? 0 : 15,
                                                                    ...provided.draggableProps.style,
                                                                }}
                                                            >
                                                                <div className="job-header">
                                                                    <Typography className={classes.text} variant="subtitle1">{item.title}</Typography>
                                                                    <Typography className={classes.text} variant="caption" color="textSecondary">
                                                                        {(new Date(item.timeline[0].date * 1000).toLocaleDateString("en-GB"))}
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
            )
            :
            <div className="message-container">
                <Typography variant="h5" align="center" className={classes.welcome}>
                    Welcome to Jobi! <Emoji text=":sunglasses:" />
                </Typography>
                <Typography variant="h6" align="center" className={classes.text}>
                    You don't have any active jobs yet
                </Typography>
            </div>}
        </div>
        <EditJob
            openEdit={openEdit}
            setOpenEdit={setOpenEdit}
            id={id}
            columns={columns} 
            setColumns={setColumns} />
    </>
    ) : <LoadingAnimation />
}

export default Board;
