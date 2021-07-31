import React from 'react';
import { Typography } from '@material-ui/core';
import { MdDashboard, IoStatsChart, FiLogOut } from 'react-icons/all';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router';
import useStyles from './styles';
import './Sidebar.sass';

const Sidebar = ({ auth }) => 
{
    const classes = useStyles();
    const location = useLocation();
    const history = useHistory();

    const logout = async() =>
    {
        await auth.signOut();
        history.push('/');
    }
    
    return (
        <div className="sidebar-container">
            <Typography variant="h4" className={classes.logo}>Jobi</Typography>
            <div className="links-container">
                {location.pathname !== '/board' ?
                    <Link to='/board' className="link">
                        <MdDashboard className="icon" />
                        <Typography className={classes.text} variant="subtitle1">Board</Typography>
                    </Link>
                :
                    <div className="link" style={{backgroundColor: '#043a71'}}>
                        <MdDashboard className="icon" />
                        <Typography className={classes.text} variant="subtitle1">Board</Typography>
                    </div>
                }
                {location.pathname !== '/stats' ?
                    <Link to='/stats' className="link">
                        <IoStatsChart className="icon" />
                        <Typography className={classes.text} variant="subtitle1">Stats</Typography>
                    </Link>
                :
                    <div className="link" style={{backgroundColor: '#043a71'}}>
                        <IoStatsChart className="icon" />
                        <Typography className={classes.text} variant="subtitle1">Stats</Typography>
                    </div>
                }
                <div className="logout" onClick={logout}>
                    <FiLogOut className="icon" id="logout" />
                    <Typography className={classes.text} variant="subtitle1">Logout</Typography>
                </div>
            </div>
            <div className="copyright">
                <Typography className={classes.text} variant="caption">
                    Jobi &copy; {new Date().getFullYear()}
                </Typography>
            </div>
            <div className="mobile-links-container">
                {location.pathname !== '/board' ?
                    <Link to='/board' className="mobile-link">
                        <MdDashboard className="icon" />
                        <Typography className={classes.text} variant="subtitle2">Board</Typography>
                    </Link>
                :
                    <div className="mobile-link" style={{backgroundColor: '#043a71'}}>
                        <MdDashboard className="icon" />
                        <Typography className={classes.text} variant="subtitle2">Board</Typography>
                    </div>
                }  
                {location.pathname !== '/stats' ?
                    <Link to='/stats' className="mobile-link">
                        <IoStatsChart className="icon" />
                        <Typography className={classes.text} variant="subtitle2">Stats</Typography>
                    </Link>
                :
                    <div className="mobile-link" style={{backgroundColor: '#043a71'}}>
                        <IoStatsChart className="icon" />
                        <Typography className={classes.text} variant="subtitle2">Stats</Typography>
                    </div>
                }  
                <div className="mobile-logout" onClick={logout}>
                    <FiLogOut className="icon" id="logout" />
                    <Typography className={classes.text} variant="subtitle2">Logout</Typography>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;
