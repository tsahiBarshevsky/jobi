import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { auth } from '../../firebase';
import firebase from 'firebase/app';
import 'firebase/app';
import './Registration.sass';

const Registration = () => 
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const registration = (event) => 
    {
        event.preventDefault();
        auth.createUserWithEmailAndPassword(email, password);
    }

    const signInWithgoogle = () =>
    {
        auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    }

    return (
        <div className="registration-container">
            <form onSubmit={registration}>
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
                <Button type="submit" variant="contained">Create account</Button>
                or
                <Button onClick={() => signInWithgoogle()} variant="contained">Sign in with google</Button>
            </form>
        </div>
    )
}

export default Registration;
