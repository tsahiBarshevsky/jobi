import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Typography, Tooltip } from '@material-ui/core';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import ArchiveRoundedIcon from '@material-ui/icons/ArchiveRounded';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
        .then(json => toast.success(`${job.title} sent to archive`));

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
        if (title === '' || company === '')
            toast.error("Oops! You've left one of the fields blank");
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
                toast.success(json);

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
        <>
            <Dialog open={openEdit} onClose={handleClose} classes={{paper: classes.paper}} className={classes.dialog}>
                <DialogTitle className={classes.title}>
                    <div className={classes.titleItems}>
                        <Typography className={classes.text} variant="h6">{job.title}</Typography>
                        <IconButton onClick={() => handleClose()} size="small" disableRipple><CloseRoundedIcon /></IconButton>
                    </div>
                </DialogTitle>
                <DialogContent className={classes.content}>
                    <Typography className={classes.text} variant="subtitle1">{`Applied on: ${new Date(job.date * 1000).toLocaleDateString("en-GB")}`}</Typography>
                    <Typography className={classes.text} variant="subtitle1">{`Status: ${job.status}`}</Typography>
                    <form style={{marginTop: 25}}>
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
                <DialogActions className={classes.actions}>
                    <Tooltip title={<Typography className={classes.text} variant="caption">Archive</Typography>} placement="top" arrow>
                        <IconButton className={classes.iconButton} onClick={sendToArchive}>
                            <ArchiveRoundedIcon />
                        </IconButton>
                    </Tooltip>
                    {disableEditing ?
                    <Tooltip title={<Typography className={classes.text} variant="caption">Edit</Typography>} placement="top" arrow>
                        <IconButton className={classes.iconButton} onClick={() => setDisableEditing(false)}>
                            <EditRoundedIcon />
                        </IconButton>
                    </Tooltip>
                    :
                    <Tooltip title={<Typography className={classes.text} variant="caption">Save changes</Typography>} placement="top" arrow>
                        <IconButton className={classes.iconButton} onClick={() => handleEditing()}>
                            <SaveRoundedIcon />
                        </IconButton>
                    </Tooltip>}
                </DialogActions>
            </Dialog>
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    )
}

export default EditJob;
