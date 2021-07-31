import React, { useState } from 'react';
import { Button, Input, InputAdornment, Typography } from '@material-ui/core';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import { auth } from '../../firebase';
import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from 'react-router';
import useStyles from './styles';
import './PasswordReset.sass';

const PasswordReset = () => 
{
    const [email, setEmail] = useState('');
    const history = useHistory();
    const classes = useStyles();
    document.title = 'Jobi - Password Reset';

    const sendResetEmail = (event) =>
    {
        event.preventDefault();
        auth.sendPasswordResetEmail(email.trim())
        .then(toast.success('A password reset was sent to your email, check your inbox'))
        .then(
            setTimeout(() => {
                history.push('/');
            }, 5200)
        );
    }

    return (
        <div className="password-reset-container">
            <Typography variant="h4" className={classes.formText}>Send Password Reset Email</Typography>
            <Typography variant="subtitle1" className={classes.text}>
                Enter the email you've registered with to receive a password reset email
            </Typography>
            <form onSubmit={sendResetEmail}>
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
                <Button type="submit" variant="contained" className={classes.submit}>
                    Send password reset
                </Button>
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

export default PasswordReset;
