import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { AuthProvider } from './Contexts/AuthContext';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Archive from './components/Archive/Archive';
import './App.sass';

const App = () => 
{
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                        <Link to='/dashboard'>Dashboard</Link>
                        <Link to='/login'>Login</Link>
                        <Link to='/registration'>Registration</Link>
                        <Link to='/archive'>Archive</Link>
                    </div>
                </Route>
                <AuthProvider>
                    <Route exact path="/registration" component={Registration} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/archive" component={Archive} />
                </AuthProvider>
            </Switch>
        </Router>
    )
}

export default App;
