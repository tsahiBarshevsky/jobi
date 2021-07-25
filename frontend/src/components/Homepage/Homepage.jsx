import React from 'react';
import { Button, Divider, Typography } from '@material-ui/core';
import { Link as Scroll } from 'react-scroll';
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
                <div className="about-us-text">
                    <div className="text-wrapper">
                        <Typography className={classes.text} paragraph>Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.</Typography>
                        <Typography className={classes.text} paragraph>The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn’t listen.</Typography>
                    </div>
                    <img className="image" src="https://images.pexels.com/photos/1764436/pexels-photo-1764436.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="" />
                    <div className="text-wrapper">
                        <Typography className={classes.text} paragraph>Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.</Typography>
                        <Typography className={classes.text}>The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn’t listen.</Typography>
                    </div>
                    {/* <img className="image-mobile" src="https://images.pexels.com/photos/1764436/pexels-photo-1764436.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="" /> */}
                </div>
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

