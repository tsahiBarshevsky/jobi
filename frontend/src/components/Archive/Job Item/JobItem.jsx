import React, { useState } from 'react';
import { 
    makeStyles, Typography, Divider, IconButton, Tooltip, 
    Button, Dialog, DialogTitle, DialogContent, 
    DialogContentText, DialogActions } from '@material-ui/core';
import UnarchiveRoundedIcon from '@material-ui/icons/UnarchiveRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import './JobItem.sass';

const useStyles = makeStyles((theme) => ({
    text: { fontFamily: `'Poppins', sans-serif` },
    divider: { marginBlock: 10 },
    paper: 
    { 
        borderRadius: 15, 
        width: 500,
        cursor: 'default', 
        [theme.breakpoints.down('xs')]:
        {
            width: '100%'
        }
    },
    cancel:
    {
        height: 40,
        borderRadius: 25,
        fontSize: 18,
        zIndex: 1,
        marginTop: 20,
        marginBottom: 10,
        color: '#3aa9ab',
        border: '2px solid #3aa9ab',
        backgroundColor: 'transparent',
        textTransform: 'capitalize',
        transition: '0.5s ease-out',
        '&:hover':
        {
            backgroundColor: 'transparent'
        }
    },
    delete:
    {
        height: 40,
        borderRadius: 25,
        fontSize: 18,
        zIndex: 1,
        marginTop: 20,
        marginBottom: 10,
        color: 'white',
        backgroundColor: '#3aa9ab',
        textTransform: 'capitalize',
        transition: '0.5s ease-out',
        '&:hover':
        {
            backgroundColor: '#3aa9ab'
        }
    }
}));

const JobItem = ({ job, jobs, setJobs }) => 
{
    const [open, setOpen] = useState(false);
    const classes = useStyles();

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
        setOpen(false);
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
        <>
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
                        <IconButton style={{width: 35, height: 35}} onClick={() => unarchive()}><UnarchiveRoundedIcon /></IconButton>
                    </Tooltip>
                    <Tooltip title={<Typography className={classes.text} variant="caption">Delete permanently</Typography>} placement="top" arrow>
                        <IconButton style={{width: 35, height: 35}} onClick={() => setOpen(true)}><DeleteRoundedIcon /></IconButton>
                    </Tooltip>
                </div>
                <Dialog classes={{paper: classes.paper}} open={open} onClose={handleClose} fullWidth>
                    <DialogTitle>
                        <Typography className={classes.text} variant="h6">Delete job</Typography>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText className={classes.dialogText}>
                            Are you sure you want to delete {`${job.title}`}?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button className={classes.cancel} onClick={handleClose} variant="contained">
                            Cancel
                        </Button>
                        <Button className={classes.delete} onClick={() => deleteJob()} variant="contained">
                            Yes, delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    )
}

export default JobItem;
