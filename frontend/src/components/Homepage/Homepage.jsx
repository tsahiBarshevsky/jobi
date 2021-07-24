import React from 'react';
import { Button, Typography } from '@material-ui/core';
// import { Link } from 'react-router-dom';
import useStyles from './styles';
import './Homepage.sass';

const Homepage = () => 
{
    const classes = useStyles();

    return (
        <div className="homepage-container">
            {/* <Link to='/dashboard'>Dashboard</Link>
            <Link to='/login'>Login</Link>
            <Link to='/registration'>Registration</Link>
            <Link to='/archive'>Archive</Link> */}
            <div className="hero-container" title="Background image made designed by pikisuperstar from Freepik">
                <Typography className={classes.heroTitle} variant="h2" align="center" gutterBottom>
                    Welcome to Jobi!
                </Typography>
                <Typography className={classes.heroSubtitle} variant="h5" align="center">
                    A jobseeker? Using a clumsy Excel file for tracking of jobs for which you've applied? Forget about it and meet Jobi - an online job tracker!
                </Typography>
                <Button variant="contained" className={classes.button}>
                    <Typography className={classes.text} variant="h6" align="center">
                        Tell me more!
                    </Typography>
                </Button>
            </div>
        </div>
    )
}

export default Homepage;

