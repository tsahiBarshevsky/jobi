import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Typography, Tooltip } from '@material-ui/core';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import ArchiveRoundedIcon from '@material-ui/icons/ArchiveRounded';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import useStyles from './styles';

const EditJob = ({ openEdit, setOpenEdit, id, columns, setColumns }) =>
{
    const [job, setJob] = useState({});
    const [title, setTitle] = useState('');
    const [company, setCompany] = useState('');
    const [disableEditing, setDisableEditing] = useState(true);
    const classes = useStyles();

    useEffect(() =>
    {
        if (openEdit)
        {
            fetch(`/get-single-job?id=${id}`)
            .then(res => res.json())
            .then(json => {
                setJob(json);
                setTitle(json.title);
                setCompany(json.company);
            });
        }
    }, [id, openEdit]);

    const handleClose = () =>
    {
        setOpenEdit(false);
        setTitle('');
        setCompany('');
        setDisableEditing(true);
    }

    const sendToArchive = () =>
    {
        fetch(`/archive-job?id=${id}`)
        .then(res => res.json())
        .then(json => console.log(json));

        //Update columns
        const source = job.status;
        const column = columns[source];
        const copiedItems = [...column.items];
        const indexToDelete = copiedItems.map(function(e) { return e._id }).indexOf(id);
        if (indexToDelete > -1)
            copiedItems.splice(indexToDelete, 1)
        setColumns({
            ...columns,
            [source]: {
                ...column,
                items: copiedItems
            }
        });
        handleClose();
    }

    const handleEditing = () =>
    {
        if (disableEditing)
        {
            setDisableEditing(false)
        }
        else
        {
            fetch(`/edit-job?id=${id}`,
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        title: title,
                        company: company
                    })
                }
            )
            .then(res => res.json())
            .then(json => {
                console.log(json);

                // New job to replace
                const newJob = {
                    _id: id,
                    title: title,
                    company: company,
                    owner: job.owner,
                    status: job.status,
                    date: job.date,
                    archive: job.archive
                };

                // Update columns
                const source = job.status;
                const column = columns[source];
                const copiedItems = [...column.items];
                const indexToUpdate = copiedItems.map(function(e) { return e._id }).indexOf(id);

                // Replacement
                copiedItems[indexToUpdate] = newJob;
                setColumns({
                    ...columns,
                    [source]: {
                        ...column,
                        items: copiedItems
                    }
                });
            });
            handleClose();
        }
    }

    return (
        <Dialog open={openEdit} onClose={handleClose} className={classes.dialog}>
            <DialogTitle>{job.title}</DialogTitle>
            <DialogContent className={classes.content}>
                <Typography variant="h6">{`Applied on: ${new Date(job.date * 1000).toLocaleDateString("en-GB")}`}</Typography>
                <Typography variant="h6">{`Status: ${job.status}`}</Typography>
                <h3>{id}</h3>
                <form>
                    <TextField
                        required
                        disabled={disableEditing}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={classes.input}
                        variant="outlined"
                        label="Job title" />
                    <TextField
                        required
                        disabled={disableEditing}
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className={classes.input}
                        variant="outlined"
                        label="Company" />

                </form>
            </DialogContent>
            <DialogActions>
                <Tooltip title="Archive" placement="top" arrow>
                    <IconButton onClick={sendToArchive}><ArchiveRoundedIcon /></IconButton>
                </Tooltip>
                <Tooltip title={disableEditing ? "Edit" : "Save changes"} placement="top" arrow>
                    <IconButton onClick={handleEditing}>
                        {disableEditing ? <EditRoundedIcon /> : <SaveRoundedIcon />}
                    </IconButton>
                </Tooltip>
            </DialogActions>
        </Dialog>
    )
}

export default EditJob;
