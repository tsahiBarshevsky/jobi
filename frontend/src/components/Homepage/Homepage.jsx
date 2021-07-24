import React from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
// import { Link } from 'react-router-dom';
import Vector from '../../assets/CV selection.svg';
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
            <div className="hero-container">
                <Grid container direction="row" justifyContent="center" alignItems="center">
                    <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                        <Typography className={classes.text} variant="h4">
                            A jobseeker? Using Excel files for tracking of jobs for which you've applied? Forget about it and meet Jobi - an online job tracker!
                        </Typography>
                        <Button className={classes.button} variant="contained">
                            <Typography className={classes.text} variant="h6">
                                Tell me more!
                            </Typography>
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                        <img className="vector" src={Vector} alt="Vector" />
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Homepage;

