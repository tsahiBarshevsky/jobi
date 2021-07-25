import React, { useState, useEffect } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Grid, Typography, Tooltip, Fab, Button,
    Dialog, DialogTitle, DialogContent, 
    DialogContentText, DialogActions } from '@material-ui/core';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from 'react-router';
import { useAuth } from '../../Contexts/AuthContext';
import { auth } from '../../firebase';
import Emoji from "react-emoji-render";
import Navbar from '../Navbar/Navbar';
import JobItem from './Job Item/JobItem';
import LoadingAnimation from '../Loading Animation/LoadingAnimation';
import useStyles from './styles';
import './Archive.sass';

const Archive = () => 
{
    const [jobs, setJobs] = useState('');
    const [open, setOpen] = useState(false);
    const history = useHistory();
    const { user } = useAuth();
    const classes = useStyles();
    const matches = useMediaQuery('(max-width: 400px)');

    useEffect(() => 
    {
        if (!user)
        {
            history.push('/login');
            return;
        }
        document.title = `Jobi - ${user.email}'s archive`;
        fetch(`/get-all-jobs?email=${user.email}&archived=true`)
        .then(res => res.json())
        .then(json => setJobs(json));
    }, [history, user]);

    const logout = async() =>
    {
        await auth.signOut();
        history.push('/');
    }

    const handleClose = () => 
    {
        setOpen(false);
    }

    const emptyArchive = () =>
    {
        fetch(`/empty-archive?email=${user.email}`)
        .then(res => res.json())
        .then(json => {
            toast.success(json);
            setOpen(false);
            setJobs([]);
        });
    }

    return (user && jobs) ? (
        <>
            <Navbar user={user} logout={logout} />
            {jobs.length > 0 && 
            <Tooltip title={<Typography className={classes.text} variant="caption">Empty archive</Typography>} placement="right" arrow>
                <Fab className={classes.fab} onClick={() => setOpen(true)}>
                    <DeleteForeverRoundedIcon />
                </Fab>
            </Tooltip>}
            <div className="archive-container">
                {jobs.length > 0 ?
                <Grid container spacing={3} direction="row" justifyContent="center" alignItems="center">
                    {jobs.map((job) => {
                        return (
                            <Grid item key={job._id} style={matches ? {width: '100%'} : {}}>
                                <JobItem job={job} jobs={jobs} setJobs={setJobs} /> 
                            </Grid>
                        )
                    })}
                </Grid>
                :
                <div className="message-container">
                    <Typography variant="h5" align="center" className={classes.welcome}>
                        This is Jobi's archive <Emoji text=":sunglasses:" />
                    </Typography>
                    <Typography variant="h6" align="center" className={classes.text}>
                        And it's seems like yours is empty
                    </Typography>
                </div>}
            </div>
            <Dialog classes={{paper: classes.paper}} open={open} onClose={handleClose} fullWidth>
                <DialogTitle>
                    <Typography className={classes.text} variant="h6">Empty archive</Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText className={classes.dialogText}>
                        Are you sure you want to empty your archive? This is a permanent action and all of the data will be deleted forever
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button className={classes.cancel} onClick={handleClose} variant="contained">
                        Cancel
                    </Button>
                    <Button className={classes.delete} onClick={emptyArchive} variant="contained">
                        Yes, empty
                    </Button>
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
    ) : <LoadingAnimation />
}

export default Archive;
