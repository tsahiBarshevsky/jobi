import React, { useState } from 'react';
import { 
    makeStyles, Typography, Divider, IconButton, Tooltip, 
    Button, Dialog, DialogTitle, DialogContent, 
    DialogContentText, DialogActions } from '@material-ui/core';
import UnarchiveRoundedIcon from '@material-ui/icons/UnarchiveRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './JobItem.sass';

const useStyles = makeStyles(() => ({
    text: { fontFamily: `'Poppins', sans-serif` },
    divider: { marginBlock: 10}
}));

const JobItem = ({ job, jobs, setJobs }) => 
{
    const [open, setOpen] = useState(false);
    const classes = useStyles();

    // const notify = (message) =>
    // {
    //     toast.success(message);
    // }

    const updateJobs = () =>
    {
        const copy = jobs.slice();
        const indexToDelete = copy.map(function(e) { return e._id }).indexOf(job._id);
        if (indexToDelete > -1)
            copy.splice(indexToDelete, 1)
        setJobs(copy);
    }

    const unarchive = () => 
    {
        fetch(`/unarchive-job?id=${job._id}`)
        .then(res => res.json())
        .then(json => {
            console.log(json);
            updateJobs();
        });
    }

    const deleteJob = () =>
    {
        fetch(`/delete-job?id=${job._id}`)
        .then(res => res.json())
        .then(json => {
            console.log(json);
            updateJobs();
        });
    }

    const handleClose = () =>
    {
        setOpen(false);
    }

    return (
        <div className="job-item-container">
            <div className="header">
                <Typography className={classes.text} variant="subtitle1">{job.title}</Typography>
                <Typography className={classes.text} variant="caption" color="textSecondary">
                    {(new Date(job.date * 1000).toLocaleDateString("en-GB"))}
                </Typography>
            </div>
            <Divider className={classes.divider} />
            <Typography className={classes.text} variant="subtitle1">{job.company}</Typography>
            <div className="actions">
                <Tooltip title={<Typography className={classes.text} variant="caption">Unarchive</Typography>} placement="top" arrow>
                    <IconButton onClick={() => unarchive()}><UnarchiveRoundedIcon /></IconButton>
                </Tooltip>
                <Tooltip title={<Typography className={classes.text} variant="caption">Delete permanently</Typography>} placement="top" arrow>
                    <IconButton onClick={() => setOpen(true)}><DeleteRoundedIcon /></IconButton>
                </Tooltip>
            </div>
            {/* <ToastContainer
                position="bottom-center"
                autoClose={5000}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
            /> */}
            <Dialog open={open} onClose={handleClose} fullWidth disableBackdropClick>
                <DialogTitle className={classes.dialog}>Delete job</DialogTitle>
                <DialogContent className={classes.dialog}>
                    <DialogContentText className={classes.dialogText}>
                        Are you sure you want to delete {`${job.title}`}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions className={classes.dialog}>
                    <Button onClick={handleClose} variant="contained">
                        Cancel
                    </Button>
                    <Button onClick={() => deleteJob()} variant="contained">
                        Yes, delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default JobItem;
