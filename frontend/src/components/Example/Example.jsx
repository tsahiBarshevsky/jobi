import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";




const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) 
        return;
    const { source, destination, draggableId } = result; // draggableId is job id also
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

    if (source.droppableId !== destination.droppableId) {
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

function Example() 
{
    const phases = ["Applied", "In Progress", "Rejected", "Not Answered"];
    const [jobs, setJobs] = useState([]);
    const [firstRun, setFirstRun] = useState(true);
    const email = 'Tsahi';
    
    useEffect(() => {
        fetch(`/get-all-jobs?email=${email}&archived=false`)
        .then(res => res.json())
        .then(json => {
            setJobs(json);
            if (firstRun)
            {
                const columnsFromBackend = {
                    [phases[0]]: {
                        name: "Applied",
                        items: jobs
                    },
                    [phases[1]]: {
                        name: "In Progress",
                        items: []
                    },
                    [phases[2]]: {
                        name: "Rejected",
                        items: []
                    },
                    [phases[3]]: {
                        name: "Not Answered",
                        items: []
                    }
                };
                setColumns(columnsFromBackend);
                setFirstRun(false);
            }
        });
    }, [firstRun, jobs, phases]);

    const [columns, setColumns] = useState({});

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
                <div style={{ margin: 8 }}>
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
                            padding: 4,
                            width: 250,
                            minHeight: 500
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
    );
}

export default Example;

