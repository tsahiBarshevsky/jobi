import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from '../../firebase';
import firebase from 'firebase/app';
import 'firebase/app';
import './Login.sass';

const Login = () => 
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
            <form onSubmit={login}>
                <TextField 
                    required
                    autoFocus 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    variant="outlined" 
                    label="Email" />
                <TextField 
                    required
                    value={password}
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    variant="outlined" 
                    label="Password" />
                <Button type="submit" variant="contained">Login</Button>
                or
                <Button onClick={() => signInWithgoogle()} variant="contained">Sign in with google</Button>
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
