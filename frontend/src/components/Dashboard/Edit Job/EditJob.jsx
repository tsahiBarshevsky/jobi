import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Typography } from '@material-ui/core';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import ArchiveRoundedIcon from '@material-ui/icons/ArchiveRounded';
import useStyles from './styles';

const EditJob = ({ openEdit, setOpenEdit, id }) => 
{
    const [job, setJob] = useState({});
    const [title, setTitle] = useState('');
    const [company, setCompany] = useState('');
    const [disableEditing, setDisableEditing] = useState(true)
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
                setCompany(json.title);
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
        handleClose();
    }

    return (
        <Dialog open={openEdit} onClose={handleClose} className={classes.dialog}>
            <DialogTitle>{title}</DialogTitle>
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
                <IconButton onClick={sendToArchive}><ArchiveRoundedIcon /></IconButton>
                <IconButton onClick={() => setDisableEditing(!disableEditing)}><EditRoundedIcon /></IconButton>
            </DialogActions>
        </Dialog>
    )
}

export default EditJob;
