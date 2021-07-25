import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../../Contexts/AuthContext';
import { auth } from '../../firebase';
import { Bar } from 'react-chartjs-2';
import NavBar from '../Navbar/Navbar';
import './Statistics.sass';

const Statistics = () => 
{
    const [months, setMonths] = useState([]);
    const history = useHistory();
    const { user } = useAuth();
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: 
        [{
            label: 'Total Applies on this month',
            data: months.map(a => a.amount),
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
        fetch(`/get-jobs-per-month?email=${user.email}`)
        .then(res => res.json())
        .then(json => setMonths(json));
    }, [history, user]);

    const logout = async() =>
    {
        await auth.signOut();
        history.push('/');
    };

    return (
        <>
            <NavBar user={user} logout={logout} />
            <div className="statistics-container">
            <Bar data={data} />
            </div>
        </>
    )
}

export default Statistics;
