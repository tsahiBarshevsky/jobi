import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../../Contexts/AuthContext';

const Registration = () => 
{
    const history = useHistory();
    const { user } = useAuth();

    useEffect(() => {
        if (!user)
        {
            history.push('/');
            return;
        }
    }, [history, user]);

    return (
        <div>
            {user && user.email}
            {user && <img src={user.photoURL} alt='ff' />}
        </div>
    )
}

export default Registration;
