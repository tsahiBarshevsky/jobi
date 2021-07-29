import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { useHistory } from 'react-router';
import { useAuth } from '../../Contexts/AuthContext';
import { auth } from '../../firebase';
import { Progress } from 'rsuite';
import DataTable from 'react-data-table-component';
import Sidebar from '../Sidebar/Sidebar';
import LoadingAnimation from '../Loading Animation/LoadingAnimation';
import { columns } from './columns';
import useStyles from './styles';
import './Stats.sass';

const Stats = () => 
{
    const [jobs, setJobs] = useState('');
    const classes = useStyles();
    const history = useHistory();
    const { user } = useAuth();

    useEffect(() => 
    {
        if (!user)
        {
            history.push('/login');
            return;
        }
        document.title = `Jobi - ${user.displayName ? user.displayName : user.email}'s stats`;
        fetch(`/get-all-jobs-for-stats?email=${user.email}`)
        .then(res => res.json())
        .then(json => {
            var arr = [];
            json.map((job) => {
                return (
                arr.push({
                    position: job.title,
                    company: job.company,
                    status: job.status,
                    progress: <>{renderProgressLine(job)}</>,
                    link: <a href={job.url} target="_blank" rel="noreferrer">{job.url}</a>
                }));
            });
            setJobs(arr);
        });
    }, [history, user]);

    const renderProgressLine = (job) =>
    {
        switch (job.status)
        {
            case 'Wishlist':
                return <Progress.Line percent="0" status="active" />
            case 'Applied':
                return <Progress.Line percent="25" strokeColor="#0d47a1" status="active" />
            case 'In Progress':
                return <Progress.Line percent="50" strokeColor="#fbc02d" status="active" />
            case 'Accepted':
                return <Progress.Line percent="100" status="success" />
            case 'Rejected':
                return <Progress.Line percent="100" status="fail" />
            default: return null;
        }
    }

    return (user && jobs) ? (
        <div className="page-container">
            <Sidebar auth={auth} />
            <div className="stats-container">
                <div className="stats-header">
                    <Typography className={classes.title} variant="h6">{user.displayName ? user.displayName : user.email}'s stats</Typography>
                </div>
                <div className="stat-container">
                    <Typography className={classes.statTitle} variant="subtitle1">Jobs overview</Typography>
                    <DataTable
                        columns={columns}
                        data={jobs}
                        pagination
                        pointerOnHover
                        theme="solarized"
                    />
                </div>
            </div>
        </div>
    ) : <LoadingAnimation />
    
}

export default Stats;
