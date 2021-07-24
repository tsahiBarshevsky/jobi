import React from 'react';
// import { Button, Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
// import useStyles from './styles';
import './Homepage.sass';

const Homepage = () => 
{
    // const classes = useStyles();

    return (
        <div className="homepage-container">
            <Link to='/dashboard'>Dashboard</Link>
            <Link to='/login'>Login</Link>
            <Link to='/registration'>Registration</Link>
            <Link to='/archive'>Archive</Link>
        </div>
    )
}

export default Homepage;

