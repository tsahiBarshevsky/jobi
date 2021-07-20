import React, { useState } from 'react';
import { IconButton, Typography, SwipeableDrawer } from '@material-ui/core';
import { Link } from 'react-router-dom';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import { MdDashboard, IoStatsChart, IoArchiveSharp, FiLogOut } from 'react-icons/all';
import useStyles from './styles';
import './Navbar.sass';

const Navbar = ({ user, logout }) => 
{
    const [openDrawer, setOpenDrawer] = useState(false);
    const classes = useStyles();

    const handleOpen = () => 
    {
        setOpenDrawer(true);
    }

    const handleClose = () =>
    {
        setOpenDrawer(false);
    }

    return (
        <>
            <div className="navbar-container">
                <div className="menu">
                    <IconButton className={classes.button} size="small" onClick={handleOpen}><MenuRoundedIcon className="icon"/></IconButton>
                    <Typography className={classes.text} variant="subtitle1">Menu</Typography>
                </div>
                <Link to='/'>
                    <Typography className={classes.text} variant="h6">Jobi</Typography>
                </Link>
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
                    <div className="close-button">
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
                        <img className="image" src={user.photoURL} alt="pic" />
                        <Typography className={classes.text} variant="h6">{user.email}</Typography>
                    </div>}
                    <ul className="options">
                        <li className="option" onClick={handleClose}>
                            <MdDashboard className="icon" />
                            <Typography className={classes.menuItem} variant="h6">Dashboard</Typography>
                        </li>
                        <li className="option" onClick={handleClose}>
                            <IoStatsChart className="icon" />
                            <Typography className={classes.menuItem} variant="h6">Statistics</Typography>
                        </li>
                        <li className="option" onClick={handleClose}>
                            <IoArchiveSharp className="icon" />
                            <Typography className={classes.menuItem} variant="h6">Archive</Typography>
                        </li>
                        <li className="option" onClick={logout}>
                            <FiLogOut className="icon logout" />
                            <Typography className={classes.menuItem} variant="h6">Logout</Typography>
                        </li>
                    </ul>
                </div>
            </SwipeableDrawer>
        </>
    )
}

export default Navbar;
