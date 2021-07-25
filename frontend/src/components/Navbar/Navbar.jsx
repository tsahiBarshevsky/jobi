import React, { useState } from 'react';
import { IconButton, Typography, SwipeableDrawer, Divider, Avatar } from '@material-ui/core';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import { AiFillHome, MdDashboard, IoStatsChart, IoArchiveSharp, FiLogOut } from 'react-icons/all';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import useStyles from './styles';
import './Navbar.sass';

const Navbar = ({ user, logout }) => 
{
    const [openDrawer, setOpenDrawer] = useState(false);
    const classes = useStyles();
    const location = useLocation();

    const handleOpen = () => 
    {
        setOpenDrawer(true);
    }

    const handleClose = () =>
    {
        setOpenDrawer(false);
    }

    const rednerRotue = () =>
    {
        switch (location.pathname)
        {
            case '/dashboard':
                return (
                    <div className="route">
                        <MdDashboard className="icon" />
                        <Typography className={classes.text} variant="caption">Dashboard</Typography>
                    </div>
                )
            case '/statistics':
                return (
                    <div className="route">
                        <IoStatsChart className="icon" />
                        <Typography className={classes.text} variant="caption">Statistics</Typography>
                    </div>
                )
            case '/archive':
                return (
                    <div className="route">
                        <IoArchiveSharp className="icon" />
                        <Typography className={classes.text} variant="caption">Archive</Typography>
                    </div>
                )
            default: return null;
        }
    }

    return (
        <>
            <div className="navbar-container">
                <div className="menu">
                    <IconButton className={classes.button} onClick={handleOpen}><MenuRoundedIcon className="icon"/></IconButton>
                    <Typography className={classes.text} variant="subtitle1">Menu</Typography>
                </div>
                {rednerRotue()}
            </div>
            <SwipeableDrawer 
                anchor="left" 
                classes={{paper: classes.paper}} 
                transitionDuration={600} 
                open={openDrawer} 
                onOpen={handleOpen}
                onClose={handleClose}
            >
                <div className="menu-container">
                    <div className="header">
                        <Typography className={classes.text} variant="h6">Jobi</Typography>
                        <IconButton 
                            size="small" 
                            disableRipple onClick={handleClose} 
                            className={classes.close}
                        >
                            <CloseRoundedIcon />
                        </IconButton>
                    </div>
                    {user && 
                    <div className="user-info">
                        {user.photoURL ? 
                        <img className="image" src={user.photoURL} alt={user.email} />
                        :
                        <Avatar className={classes.avatar}>
                            <Typography className={classes.text} variant="h3">
                                {user.email.charAt(0).toUpperCase()}
                            </Typography>
                        </Avatar>}
                        {user.displayName ?
                        <Typography className={classes.text} variant="h6">{user.displayName}</Typography>
                        :
                        <Typography className={classes.text} variant="h6">{user.email}</Typography>}
                    </div>}
                    <ul className="options">
                        <li className="option-container">
                            <div className="option">
                                <AiFillHome className="icon" />
                                <Link className={classes.link} to='/'>
                                    <Typography className={classes.menuItem} variant="h6">Homepage</Typography>
                                </Link>
                            </div>
                        </li>
                        <li className="option-container">
                            <div className="option" onClick={handleClose}>
                                <MdDashboard className="icon" />
                                {location.pathname !== '/dashboard' ?
                                <Link className={classes.link} to='/dashboard'>
                                    <Typography className={classes.menuItem} variant="h6">Dashboard</Typography>
                                </Link>
                                :
                                <Typography className={classes.menuItem} variant="h6">Dashboard</Typography>}
                            </div>
                        </li>
                        <li className="option-container" >
                            <div className="option" onClick={handleClose}>
                                <IoStatsChart className="icon" />
                                {location.pathname !== '/statistics' ?
                                <Link className={classes.link} to='/statistics'>
                                    <Typography className={classes.menuItem} variant="h6">Statistics</Typography>
                                </Link>
                                :
                                <Typography className={classes.menuItem} variant="h6">Statistics</Typography>}
                            </div>
                        </li>
                        <li className="option-container">
                            <div className="option" onClick={handleClose}>
                                <IoArchiveSharp className="icon" />
                                {location.pathname !== '/archive' ?
                                <Link className={classes.link} to='/archive'>
                                    <Typography className={classes.menuItem} variant="h6">Archive</Typography>
                                </Link>
                                :
                                <Typography className={classes.menuItem} variant="h6">Archive</Typography>}
                            </div>
                        </li>
                    </ul>
                    <div className="logout-container">
                        <Divider className={classes.divider} />
                        <div className="logout" onClick={logout}>
                            <FiLogOut className="icon" />
                            <Typography className={classes.menuItem} variant="h6">Logout</Typography>
                        </div>
                    </div>
                </div>
            </SwipeableDrawer>
        </>
    )
}

export default Navbar;
