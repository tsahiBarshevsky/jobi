import React, { useState, useEffect } from 'react';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const Dashboard = () => 
{
    const [columns, setColumns] = useState({});
    const email = 'Tsahi';

    useEffect(() => {
        fetch(`/get-all-jobs?email=${email}&archived=false`)
        .then(res => res.json())
        .then(json => {
            const columnsFromBackend = {
                ["Applied"]: {
                    name: "Applied",
                    items: json.applied
                },
                ["In Progress"]: {
                    name: "In Progress",
                    items: json.inProgress
                },
                ["Rejected"]: {
                    name: "Rejected",
                    items: json.rejected
                },
                ["Not Answered"]: {
                    name: "Not Answered",
                    items: json.notAnswered
                }
            };
            setColumns(columnsFromBackend);
        });
    }, []);

    const addJob = () =>
    {
        var newJob = {
            owner: email,
            title: 'Job from client2',
            company: 'Company from client2',
            date: new Date(),
            status: 'Applied',
            archived: false
        }
        fetch('/add-new-job',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newJob)
            }
        )
        .then(res => res.json())
        .then(res => {
            console.log(res.message);

            // Update
            const source = "Applied";
            const column = columns[source];
            const copiedItems = [...column.items];
            
            newJob._id = res.job_id;
            copiedItems.push(newJob);
            setColumns({
                ...columns,
                [source]: {
                    ...column,
                    items: copiedItems
                }
            });
        });
    }
    
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

    return (
        <div style={{ display: "flex", justifyContent: "center", flexWrap: 'wrap', height: "100%", backgroundColor: '#f5f5f5'}}>
        <DragDropContext
            onDragEnd={result => onDragEnd(result, columns, setColumns)}
        >
            {Object.entries(columns).map(([columnId, column], index) => {
            return (
                <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}
                key={columnId}
                >
                <h2>{column.name}</h2>
                <div style={{ margin: 10 }}>
                    <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                        return (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{
                            background: snapshot.isDraggingOver
                                ? "lightblue"
                                : "lightgrey",
                            padding: 10,
                            width: 250,
                            minHeight: 500,
                            borderRadius: 10
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
                                        onClick={() => console.log(item._id)}
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{
                                        borderRadius: 5,
                                        userSelect: "none",
                                        padding: 16,
                                        margin: "0 0 8px 0",
                                        minHeight: "50px",
                                        backgroundColor: snapshot.isDragging
                                            ? "#263B4A"
                                            : "#456C86",
                                        color: "white",
                                        ...provided.draggableProps.style
                                        }}
                                    >
                                        {item.title}
                                        <br />
                                        {item.company}
                                        <br />
                                        {item.status}
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
        </div>
    )
}

export default Dashboard;
