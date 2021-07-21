import React, { useState, useEffect } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import { useHistory } from 'react-router';
import { useAuth } from '../../Contexts/AuthContext';
import { auth } from '../../firebase';
import Emoji from "react-emoji-render";
import Navbar from '../Navbar/Navbar';
import JobItem from './Job Item/JobItem';
import './Archive.sass';

const useStyles = makeStyles(() => ({
    text: { fontFamily: `'Poppins', sans-serif` }
}));

const Archive = () => 
{
    const [jobs, setJobs] = useState([]);
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

    return user && (
        <>
            <Navbar user={user} logout={logout} />
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
        </>
    )
}

export default Archive;
