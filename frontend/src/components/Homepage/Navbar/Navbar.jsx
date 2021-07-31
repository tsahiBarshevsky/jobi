import React, { useState } from 'react';
import { AppBar, Button, Collapse, Toolbar, Typography } from '@material-ui/core';
import { Link, animateScroll } from 'react-scroll';
import { Link as Route } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MenuToggle from './MenuToggle';
import useStyles from './styles';
import './Navbar.sass';

const Navbar = () => 
{
    const [expanded, setExpanded] = useState(false);
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));

    const toggleHome = () => { animateScroll.scrollToTop() }

    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
                <Typography variant="h4" className={classes.logo} onClick={toggleHome}>Jobi</Typography>
                {!matches &&
                <div className={classes.links}>
                    <Link style={{textDecoration: 'none', color: 'white'}}
                        to='about-us'
                        className="scroll-link"
                        smooth spy exact='true' 
                        duration={1000} offset={-40}
                    >
                        About us
                    </Link>
                    <Link style={{textDecoration: 'none', color: 'white'}}
                        to='features-container'
                        className="scroll-link"
                        smooth spy exact='true' 
                        duration={1000} offset={-40}
                    >
                        Features
                    </Link>
                    <Button component={Route} to='/registration' className={classes.registration}>Sign up</Button>
                    <Button component={Route} to='/login' className={classes.login}>Sign in</Button>
                </div>}
                {matches && <MenuToggle expanded={expanded} setExpanded={setExpanded} />}
            </Toolbar>
            <Collapse in={expanded} timeout={500} unmountOnExit>
                <div className={classes.mobileMenu}>
                    <ul className={classes.list}>
                        <li className={classes.listItem}>
                            <Link to='about-us' style={{textDecoration: 'none', color: 'white'}} onClick={() => setExpanded(false)} className={classes.link} smooth spy exact='true' duration={1000} offset={-40}>About us</Link>
                        </li>
                        <li className={classes.listItem}>
                            <Link to='features-container' style={{textDecoration: 'none', color: 'white'}} onClick={() => setExpanded(false)} className={classes.link} smooth spy exact='true' duration={1000} offset={-40}>Features</Link>
                        </li>
                        <li className={classes.listItem}>
                            <Route to='registration' style={{textDecoration: 'none', color: 'white'}} className={classes.link}>Sign up</Route>
                        </li>
                        <li className={classes.listItem}>
                            <Route to='/login' style={{textDecoration: 'none', color: 'white'}} className={classes.link}>Sign in</Route>
                        </li>
                    </ul>
                </div>
            </Collapse>
        </AppBar>
    )
}

export default Navbar;
