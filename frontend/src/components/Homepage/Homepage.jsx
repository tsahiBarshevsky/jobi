import React from 'react';
import { Button, Divider, Typography, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Link as Scroll } from 'react-scroll';
import Illustartion from '../../assets/about-illustartion.svg';
import Feature1 from '../../assets/features/f1.png';
import Feature2 from '../../assets/features/f2.png';
import Feature3 from '../../assets/features/f3.png';
import Feature4 from '../../assets/features/f4.png';
import Feature5 from '../../assets/features/f5.png';
import Feature6 from '../../assets/features/f6.png';
import useStyles from './styles';
import './Homepage.sass';
import Navbar from './Navbar/Navbar';

const Homepage = () => 
{
    const classes = useStyles();

    return (
        <div className="homepage-container">
            <Navbar />
            <div id="hero-container" title="Background image made designed by pikisuperstar from Freepik">
                <div className={classes.toolbar} />
                <Typography className={classes.heroTitle} variant="h2" align="center" gutterBottom>
                    Welcome to Jobi!
                </Typography>
                <Typography className={classes.heroSubtitle} variant="h5" align="center">
                    A jobseeker? Using a clumsy Excel file for tracking of jobs for which you've applied? Forget about it and meet Jobi - an online job tracker!
                </Typography>
                <Button 
                    component={Scroll} 
                    to="about-us" 
                    variant="contained" 
                    className={classes.button} 
                    smooth spy exact='true' 
                    duration={1000} offset={-40}
                >
                    <Typography className={classes.text} variant="h6" align="center">
                        Tell me more!
                    </Typography>
                </Button>
            </div>
            <div id="about-us">
                <div className="section-title">
                    <Typography className={classes.sectionTitle} variant="h4">About us</Typography>
                    <Divider className={classes.divider} />
                </div>
                <Grid container spacing={3} direction="row" justifyContent="center" alignItems="center">
                    <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                        <div className="about-us-title-warpper">
                            <Typography className={classes.aboutTitle} variant="h4">
                                Jobi is everything a job seeker needs
                            </Typography>
                        </div>
                        <Typography className={classes.text} paragraph>
                            Cnsectetur adipisicing cvbelit, sxced dbeo eiucdsmod tempor incididunt ut labore egsfgt dolore magna aliqua. Ut encim ad minim veniam, quis nostrud exercitation ulclamco laboris nisi ufgut aliquip edgx ebrha.
                        </Typography>
                        <Typography className={classes.text}>
                            Cnsectetur adipisicing cvbelit, sxced dbeo eiucdsmod tempor incididunt ut labore egsfgt folorem.
                        </Typography>
                        <Button 
                            component={Link} 
                            to="/registration" 
                            variant="contained" 
                            className={classes.aboutButton} 
                        >
                            <Typography className={classes.text} variant="h6" align="center">
                                Get started
                            </Typography>
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                        <img className="about-us-image" src={Illustartion} alt="" />
                    </Grid>
                </Grid>
            </div>
            <div id="how-does-it-works-container">
                <div className="section-title">
                    <Typography className={classes.sectionTitle} variant="h4">How does it works</Typography>
                    <Divider className={classes.divider} style={{background: 'black'}} />
                </div>
                <ol className="steps">
                    <li className="step">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent egestas pellentesque erat, at maximus tellus iaculis et. Suspendisse vitae purus quis tortor condimentum consequat non a urna. Interdum et malesuada.</li>
                    <li className="step">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent egestas pellentesque erat, at maximus tellus iaculis et. Suspendisse vitae purus quis tortor condimentum consequat non a urna. Interdum et malesuada.</li>
                    <li className="step">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent egestas pellentesque erat, at maximus tellus iaculis et. Suspendisse vitae purus quis tortor condimentum consequat non a urna. Interdum et malesuada.</li>
                </ol>
            </div>
            <div id="features-container">
                <div className="section-title">
                    <Typography className={classes.sectionTitle} variant="h4">Features</Typography>
                    <Divider className={classes.divider} />
                </div>
                <div className="columns">
                    <div className="column">
                        <div className="feature-box">
                            <img className="feature-image" src={Feature1} alt="Prevents unpleasantness" title="Icons made by Freepik from Flaticon" />
                            <div className="feature-text">
                                <Typography className={classes.featureTitle} variant="h6">Prevents unpleasantness</Typography>
                                <Typography className={classes.featureText} variant="subtitle1" color="textSecondary">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent egestas pellentesque erat, at maximus tellus iaculis et. Suspendisse vitae purus quis tortor condimentum consequat non a urna. Interdum et malesuada.
                                </Typography>
                            </div>
                        </div>
                        <div className="feature-box">
                            <img className="feature-image" src={Feature2} alt="No Excel files needed" title="Icons made by Freepik from Flaticon" />
                            <div className="feature-text">
                                <Typography className={classes.featureTitle} variant="h6">No Excel files needed</Typography>
                                <Typography className={classes.featureText} variant="subtitle1" color="textSecondary">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent egestas pellentesque erat, at maximus tellus iaculis et. Suspendisse vitae purus quis tortor condimentum consequat non a urna. Interdum et malesuada.
                                </Typography>
                            </div>
                        </div>
                        <div className="feature-box">
                            <img className="feature-image" src={Feature3} alt="Mobile friendly" title="Icons made by Freepik from Flaticon" />
                            <div className="feature-text">
                                <Typography className={classes.featureTitle} variant="h6">Mobile friendly</Typography>
                                <Typography className={classes.featureText} variant="subtitle1" color="textSecondary">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent egestas pellentesque erat, at maximus tellus iaculis et. Suspendisse vitae purus quis tortor condimentum consequat non a urna. Interdum et malesuada.
                                </Typography>
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <div className="feature-box">
                            <img className="feature-image" src={Feature4} alt="Friendly interface" title="Icons made by Freepik from Flaticon" />
                            <div className="feature-text">
                                <Typography className={classes.featureTitle} variant="h6">Friendly interface</Typography>
                                <Typography className={classes.featureText} variant="subtitle1" color="textSecondary">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent egestas pellentesque erat, at maximus tellus iaculis et. Suspendisse vitae purus quis tortor condimentum consequat non a urna. Interdum et malesuada.
                                </Typography>
                            </div>
                        </div>
                        <div className="feature-box">
                            <img className="feature-image" src={Feature5} alt="Sign in with Google" title="Icons made by Freepik from Flaticon" />
                            <div className="feature-text">
                                <Typography className={classes.featureTitle} variant="h6">Sign in with Google</Typography>
                                <Typography className={classes.featureText} variant="subtitle1" color="textSecondary">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent egestas pellentesque erat, at maximus tellus iaculis et. Suspendisse vitae purus quis tortor condimentum consequat non a urna. Interdum et malesuada.
                                </Typography>
                            </div>
                        </div>
                        <div className="feature-box">
                            <img className="feature-image" src={Feature6} alt="Use simple drag & drop" title="Icons made by Freepik from Flaticon" />
                            <div className="feature-text">
                                <Typography className={classes.featureTitle} variant="h6">Use simple drag & drop</Typography>
                                <Typography className={classes.featureText} variant="subtitle1" color="textSecondary">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent egestas pellentesque erat, at maximus tellus iaculis et. Suspendisse vitae purus quis tortor condimentum consequat non a urna. Interdum et malesuada.
                                </Typography>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Homepage;

