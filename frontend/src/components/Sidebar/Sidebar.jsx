import React from 'react';
import { Typography } from '@material-ui/core';
import { MdDashboard, IoStatsChart, FiLogOut } from 'react-icons/all';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import useStyles from './styles';
import './Sidebar.sass';

const Sidebar = () => 
{
    const classes = useStyles();
    const location = useLocation();

    return (
        <div className="sidebar-container">
            <div className="links-container">
                <Link to='/board' className="link">
                    <MdDashboard className="icon" />
                    <Typography className={classes.text} variant="subtitle1">Board</Typography>
                </Link>
                <Link to='/stats' className="link">
                    <IoStatsChart className="icon" />
                    <Typography className={classes.text} variant="subtitle1">Stats</Typography>
                </Link>
                <div className="logout">
                    <FiLogOut className="icon" id="logout" />
                    <Typography className={classes.text} variant="subtitle1">Logout</Typography>
                </div>
            </div>
            <div className="mobile-links-container">
                <Link to='/board' className="mobile-link">
                    <MdDashboard className="icon" />
                    <Typography className={classes.text} variant="subtitle2">Board</Typography>
                </Link>
                <Link to='/stats' className="mobile-link">
                    <IoStatsChart className="icon" />
                    <Typography className={classes.text} variant="subtitle1">Stats</Typography>
                </Link>
                <div className="mobile-logout">
                    <FiLogOut className="icon" id="logout" />
                    <Typography className={classes.text} variant="subtitle1">Logout</Typography>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;
