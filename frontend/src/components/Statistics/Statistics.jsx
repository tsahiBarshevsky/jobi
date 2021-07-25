import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../../Contexts/AuthContext';
import { auth } from '../../firebase';
import { Bar } from 'react-chartjs-2';
import NavBar from '../Navbar/Navbar';
import LoadingAnimation from '../Loading Animation/LoadingAnimation';
import './Statistics.sass';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    text: { fontFamily: `'Poppins', sans-serif`, fontWeight: 600, letterSpacing: 1.2 }
}))

const Statistics = () => 
{
    const [statistics, setStatistics] = useState({});
    const classes = useStyles();
    const history = useHistory();
    const { user } = useAuth();
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: 
        [{
            label: 'Total Applies on this month',
            data: Object.keys(statistics).length > 0 ? statistics.months.map(a => a.amount) : [],
            backgroundColor: [
                'rgba(54, 162, 235, 0.3)',
                'rgba(255, 206, 86, 0.3)',
                'rgba(54, 162, 235, 0.3)',
                'rgba(255, 206, 86, 0.3)',
                'rgba(54, 162, 235, 0.3)',
                'rgba(255, 206, 86, 0.3)',
                'rgba(54, 162, 235, 0.3)',
                'rgba(255, 206, 86, 0.3)',
                'rgba(54, 162, 235, 0.3)',
                'rgba(255, 206, 86, 0.3)',
                'rgba(54, 162, 235, 0.3)',
                'rgba(255, 206, 86, 0.3)',
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1,
        },],
    }

    useEffect(() => 
    {
        if (!user)
        {
            history.push('/login');
            return;
        }
        document.title = `Jobi - ${user.email}'s statistics`;
        fetch(`/get-statistics?email=${user.email}`)
        .then(res => res.json())
        .then(json => setStatistics(json));
    }, [history, user]);

    const logout = async() =>
    {
        await auth.signOut();
        history.push('/');
    };

    const renderSentence = () =>
    {
        switch (statistics.total)
        {
            case 0:
                return `Seems like you haven't applied for positions in ${new Date().getFullYear()} yet.`;
            case 1:
                return `So far, in ${new Date().getFullYear()} you've applied for only one position. Keep going 💪🏼`;
            default:
                return `So far, in ${new Date().getFullYear()} you've applied for ${statistics.total} positions. Keep going 💪🏼`;
        }
    }

    return (user && Object.keys(statistics).length > 0) ? (
        <>
            <NavBar user={user} logout={logout} />
            <div className="statistics-container">
                <div className="title-container">
                    <Typography variant="h6" className={classes.text}>
                        {renderSentence()}
                    </Typography>
                </div>
                <div className="chart-container">
                    <Bar data={data} />
                </div>
            </div>
        </>
    ) : <LoadingAnimation />
}

export default Statistics;
