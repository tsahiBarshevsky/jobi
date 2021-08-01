import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useHistory } from 'react-router';
import { useAuth } from '../../Contexts/AuthContext';
import { auth } from '../../firebase';
import { Progress } from 'rsuite';
import DataTable from 'react-data-table-component';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import Sidebar from '../Sidebar/Sidebar';
import LoadingAnimation from '../Loading Animation/LoadingAnimation';
import Stat1 from '../../assets/stats/job-search.png';
import Stat2 from '../../assets/stats/interview.png';
import Stat3 from '../../assets/stats/contract.png';
import Stat4 from '../../assets/stats/weekly-calendar.png';
import { tableColumns } from './columns';
import useStyles from './styles';
import './Stats.sass';

const Stats = () => 
{
    const [jobs, setJobs] = useState('');
    const [columns, setColumns] = useState('');
    const [mapped, setMapped] = useState({});
    const [week, setWeek] = useState({});
    const [weeklyApplications, setWeeklyApplications] = useState(0);
    const [monthlyApplications, setMonthlyApplications] = useState([]);
    const [progressThisWeek, setProgressThisWeek] = useState(0);
    const [offeredThisWeek, setOfferedThisWeek] = useState(0);
    const classes = useStyles();
    const history = useHistory();
    const { user } = useAuth();

    // Line chart variables
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: 
        [{
            label: '# of applications',
            data: Object.keys(monthlyApplications).length > 0 ? monthlyApplications.map(a => a.amount) : [],
            fill: false,
            backgroundColor: '#1d5692',
            borderColor: '#1d569250'
        }]
    };
    const options = {scales : {y : {min: 0}}};

    useEffect(() => 
    {
        if (!user)
        {
            history.push('/login');
            return;
        }
        document.title = `Jobi - ${user.displayName ? user.displayName : user.email}'s stats`;
        fetch(`https://jobi-backend.herokuapp.com/get-stats?email=${user.email}`)
        .then(res => res.json())
        .then(json => {
            var arr = [];
            json.jobs.map((job) => {
                return (
                    arr.push({
                        position: job.title,
                        company: job.company,
                        status: job.status,
                        progress: <div style={{width: 250}}>{renderProgressLine(job)}</div>,
                        link: job.url && <a href={job.url} target="_blank" rel="noreferrer">{job.url.slice(0, 55)}...</a>
                    })
                );
            });
            setColumns(arr);
            setJobs(json.jobs);
            setMapped(json.mapped);
            setWeek(json.week);
            setWeeklyApplications(json.weeklyApplies);
            setMonthlyApplications(json.monthlyApplies);
            setProgressThisWeek(json.progressThisWeek);
            setOfferedThisWeek(json.offeredThisWeek);
        });
    }, [history, user]);

    const renderProgressLine = (job) =>
    {
        switch (job.status)
        {
            case 'Wishlist':
                return <Progress.Line percent={0} status="active" />
            case 'Applied':
                return <Progress.Line percent={25} strokeColor="#0d47a1" status="active" />
            case 'In Progress':
                return <Progress.Line percent={50} strokeColor="#fbc02d" status="active" />
            case 'Offered':
                return <Progress.Line percent={75} strokeColor="#f57c00" status="active" />
            case 'Accepted':
                return <Progress.Line percent={100} status="success" />
            case 'Rejected':
                return <Progress.Line percent={100} status="fail" />
            default: return null;
        }
    }

    return (user && jobs && Object.keys(mapped).length > 0) ? (
        <div className="page-container">
            <Sidebar auth={auth} />
            <div className="stats-container">
                <div className="stats-header">
                    <Typography className={classes.title} variant="h6">{user.displayName ? user.displayName : user.email}'s stats</Typography>
                </div>
                <Grid 
                    container 
                    spacing={3} 
                    direction="row" 
                    justifyContent="space-between" 
                    alignItems="flex-start"
                    className={classes.grid}
                >
                    <Grid item xs={12} sm={6} md={6} lg={3} className={classes.item}>
                        <div className="statistic-container">
                            <div className="content">
                                <Typography className={classes.statTitle} variant="subtitle2">Total Jobs</Typography>
                                <div style={{position: 'absolute', bottom: 10}}>
                                    <Typography className={classes.statContent} variant="h5">{jobs.length}</Typography>
                                    <Typography className={classes.text} variant="caption">In all stages</Typography>
                                </div>
                            </div>
                            <div className="image-container">
                                <img src={Stat1} alt="Stat1" title="Icons made by Freepik from Flaticon" />
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={3} className={classes.item}>
                        <div className="statistic-container">
                            <div className="content">
                                <Typography className={classes.statTitle} variant="subtitle2">Added This Week</Typography>
                                <div style={{position: 'absolute', bottom: 10}}>
                                    <Typography className={classes.statContent} variant="h5">{weeklyApplications}</Typography>
                                    <Typography className={classes.text} variant="caption">
                                        {moment(week.start).format("DD/MM/YY")} - {moment(week.end).format("DD/MM/YY")}
                                    </Typography>
                                </div>
                            </div>
                            <div className="image-container">
                                <img src={Stat4} alt="Stat4" title="Icons made by Freepik from Flaticon" />
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={3} className={classes.item}>
                        <div className="statistic-container">
                            <div className="content">
                                <Typography className={classes.statTitle} variant="subtitle2">Job In Progress</Typography>
                                <div style={{position: 'absolute', bottom: 10}}>
                                    <Typography className={classes.statContent} variant="h5">{mapped.inProgress.length}</Typography>
                                    <Typography className={classes.text} variant="caption">{progressThisWeek} added this week</Typography>
                                </div>
                            </div>
                            <div className="image-container">
                                <img src={Stat2} alt="Stat3" title="Icons made by Freepik from Flaticon" />
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={3} className={classes.item}>
                        <div className="statistic-container">
                            <div className="content">
                                <Typography className={classes.statTitle} variant="subtitle2">Job Offered</Typography>
                                <div style={{position: 'absolute', bottom: 10}}>
                                    <Typography className={classes.statContent} variant="h5">{mapped.offered.length}</Typography>
                                    <Typography className={classes.text} variant="caption">{offeredThisWeek} added this week</Typography>
                                </div>
                            </div>
                            <div className="image-container">
                                <img src={Stat3} alt="Stat3" title="Icons made by DinosoftLabs from Flaticon" />
                            </div>
                        </div>
                    </Grid>
                </Grid>
                <div className="stat-container">
                    <Typography className={classes.statTitle} variant="subtitle1">Jobs Overview</Typography>
                    <DataTable
                        columns={tableColumns}
                        data={columns}
                        pagination
                        pointerOnHover
                        theme="solarized"
                    />
                </div>
                <div className="stat-container">
                    <Typography className={classes.statTitle} variant="subtitle1">Monthly Jobs Applications Activity</Typography>
                    <Line data={data} options={options} />
                </div>
            </div>
        </div>
    ) : <LoadingAnimation />
    
}

export default Stats;
