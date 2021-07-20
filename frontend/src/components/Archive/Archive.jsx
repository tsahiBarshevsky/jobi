import React, { useState, useEffect } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Grid } from '@material-ui/core';
import { useHistory } from 'react-router';
import { useAuth } from '../../Contexts/AuthContext';
import { auth } from '../../firebase';
import Navbar from '../Navbar/Navbar';
import JobItem from './Job Item/JobItem';
import './Archive.sass';

const Archive = () => 
{
    const [jobs, setJobs] = useState([]);
    const history = useHistory();
    const { user } = useAuth();
    const matches = useMediaQuery('(max-width: 400px)');

    useEffect(() => 
    {
        if (!user)
        {
            history.push('/');
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
                <Grid container spacing={3} direction="row" justifyContent="center" alignItems="center">
                    {jobs.map((job) => {
                        return (
                            <Grid item key={job._id} style={matches ? {width: '100%'} : {}}>
                                <JobItem job={job} /> 
                            </Grid>
                        )
                    })}
                </Grid>
            </div>
        </>
    )
}

export default Archive;
