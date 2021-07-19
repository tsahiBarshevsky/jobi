import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { AuthProvider } from './Contexts/AuthContext';
import Registration from './components/Registration/Registration';
import Dashboard from './components/Dashboard/Dashboard';
import './App.sass';

import { auth } from './firebase';
import 'firebase/app';
import firebase from 'firebase/app';

const App = () => 
{
    return (
        <Router>
            <AuthProvider>
                <Switch>
                    <Route exact path="/">
                        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                            <Link to='/dashboard'>Dashboard</Link>
                            <button onClick={() => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}>Sign in with Google</button>
                            <Link to='/login'>Login</Link>
                        </div>
                    </Route>
                    <Route exact path="/registration" component={Registration} />
                    <Route exact path="/dashboard" component={Dashboard} />
                </Switch>
            </AuthProvider>
        </Router>
    )
}

export default App;
