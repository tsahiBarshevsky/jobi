import React, { useState } from 'react';
import { IconButton, Typography, SwipeableDrawer } from '@material-ui/core';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import { MdDashboard, IoStatsChart, FiLogOut } from 'react-icons/all';
import useStyles from './styles';
import './Navbar.sass';

const Navbar = () => 
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
                <Typography className={classes.text} variant="h6">Jobi</Typography>
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
                    <div className="user-info">
                        <img className="image" src="https://images.pexels.com/photos/6430730/pexels-photo-6430730.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="pic" />
                    </div>
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
