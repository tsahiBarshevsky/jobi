import React, { useState } from 'react';
import { Button, Input, InputAdornment, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { FaGoogle } from 'react-icons/fa';
import { auth } from '../../firebase';
import firebase from 'firebase/app';
import 'firebase/app';
import useStyles from './styles';
import './Login.sass';

const Login = () => 
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const classes = useStyles();
    document.title = 'Jobi - Login';

    const notify = (message) => 
    {
        toast.error(message);
    }

    const login = (event) => 
    {
        event.preventDefault();
        auth.signInWithEmailAndPassword(email, password).catch((error) => {
            notify(error.message);
        });
    }

    const signInWithgoogle = () =>
    {
        auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
        .catch((error) => { notify(error.message); });
    }

    return (
        <div className="login-container">
            <div className="registration" title="Background vector created by rawpixel.com - www.freepik.com">
                <Link to="/" className="logo">Jobi</Link>
                <Typography className={classes.title} variant="h3" align="center">
                    First time here?
                </Typography>
                <Typography className={classes.text} variant="h6" align="center">
                    Cool, nice to see you! To stay up to date on your latest jobs you've applied for lately, create a new account.
                </Typography>
                <Button component={Link} to='/registration' className={classes.button}>Sign up</Button>
            </div>
            <form onSubmit={login}>
            <Typography variant="h4" className={classes.formText}>Sing In To Your Account</Typography>
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
                <Button type="submit" variant="contained" className={classes.submit}>Sign In</Button>
                <h4 className="or"><span>Or</span></h4>
                <Button 
                    variant="contained"
                    className={classes.google}
                    onClick={() => signInWithgoogle()}
                    startIcon={<FaGoogle />}
                >
                    Sign in with google
                </Button>
                <div className="mobile-registration-link">
                    <Typography variant="subtitle1" className={classes.text}>
                        Already registered? <Link className={classes.link} to="/registration">Sign up</Link>
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

export default Login;
