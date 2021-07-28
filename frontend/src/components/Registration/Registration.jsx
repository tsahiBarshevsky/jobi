import React, { useState } from 'react';
import { Button, Input, InputAdornment, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { FaGoogle } from 'react-icons/fa';
import { auth } from '../../firebase';
import firebase from 'firebase/app';
import 'firebase/app';
import useStyles from './styles';
import './Registration.sass';

const Registration = () => 
{
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const classes = useStyles();
    document.title = 'Jobi - Registration';

    const notify = (message) => 
    {
        toast.error(message);
    }

    const registration = (event) => 
    {
        event.preventDefault();
        auth.createUserWithEmailAndPassword(email, password)
        .then(function(result)
        {
            return result.user.updateProfile({
                displayName: username
            });
        })
        .catch((error) => 
        {
            notify(error.message);
        });
    }

    const signInWithGoogle = () =>
    {
        auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
        .catch((error) => { notify(error.message); });
    }

    return (
        <div className="registration-container">
            <div className="login" title="Background vector created by rawpixel.com - www.freepik.com">
                <Link to="/" className="logo">Jobi</Link>
                <Typography className={classes.title} variant="h3" align="center">
                    Already registered?
                </Typography>
                <Typography className={classes.text} variant="h6" align="center">
                    To stay up to date on the latest jobs you've applied for lately, please sign into your account with your personal info.
                </Typography>
                <Button component={Link} to='/login' className={classes.button}>Sign in</Button>
            </div>
            <form onSubmit={registration}>
                <Typography variant="h4" className={classes.formText}>Create New Account</Typography>
                <Input 
                    required
                    autoFocus 
                    disableUnderline
                    placeholder="Email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={classes.input}
                    startAdornment={
                        <InputAdornment style={{marginLeft: 15}} position="start">
                            <EmailOutlinedIcon style={{fontSize: 20, color: '#BEBEBE'}} />
                        </InputAdornment>
                    } />
                <Input 
                    required
                    disableUnderline
                    placeholder="Username..."
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={classes.input}
                    startAdornment={
                        <InputAdornment style={{marginLeft: 15}} position="start">
                            <AccountCircleIcon style={{fontSize: 20, color: '#BEBEBE'}} />
                        </InputAdornment>
                    } />
                <Input 
                    required
                    disableUnderline
                    placeholder="Password..."
                    value={password}
                    type={showPassword ? 'text' : 'password'} 
                    onChange={(e) => setPassword(e.target.value)}
                    className={classes.input}
                    startAdornment={
                        <InputAdornment style={{marginLeft: 15}} position="start">
                            <LockOutlinedIcon style={{fontSize: 20, color: '#BEBEBE'}} />
                        </InputAdornment>
                    }
                    endAdornment=
                    {
                        <InputAdornment position="end"
                            onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? 
                            <VisibilityOffIcon className={classes.visibilty} /> 
                            : 
                            <VisibilityIcon className={classes.visibilty} />}
                        </InputAdornment>
                    } />
                <Button type="submit" variant="contained" className={classes.submit}>Create account</Button>
                <h4 className="or"><span>Or</span></h4>
                <Button 
                    variant="contained"
                    className={classes.google}
                    onClick={() => signInWithGoogle()}
                    startIcon={<FaGoogle />}
                >
                    Sign in with google
                </Button>
                <div className="mobile-login-link">
                    <Typography variant="subtitle1" className={classes.text}>
                        Already registered? <Link className={classes.link} to="/login">Sign in</Link>
                    </Typography>
                </div>
            </form>
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    )
}

export default Registration;
