import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Typography, Tooltip } from '@material-ui/core';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
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

    const handleEditing = () =>
    {
        if (title === '' || company === '')
            // toast.error("Oops! You've left one of the fields blank");
            alert("Oops! You've left one of the fields blank");
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

    const renderDate = (date) =>
    {
        var formatted = date.toLocaleDateString('en-GB');
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        return `${formatted} ${hours}:${minutes.substr(-2)}`;
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
                    <h4>Timeline</h4>
                    {Object.keys(job).length > 0 && job.timeline.map((step, index) => {
                        return (
                            <p>{step.action} at {renderDate(new Date(step.date * 1000))} </p>
                        )
                    })}
                </DialogContent>
                <DialogActions className={classes.actions}>
                    <Tooltip title={<Typography className={classes.text} variant="caption">Save changes</Typography>} placement="top" arrow>
                        <IconButton className={classes.iconButton} onClick={() => handleEditing()}>
                            <SaveRoundedIcon />
                        </IconButton>
                    </Tooltip>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default EditJob;
