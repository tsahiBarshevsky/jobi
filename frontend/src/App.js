import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { AuthProvider } from './Contexts/AuthContext';
import Registration from './components/Registration/Registration';
import Dashboard from './components/Dashboard/Dashboard';
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
                        </div>
                    </Route>
                    <AuthProvider>
                        <Route exact path="/registration" component={Registration} />
                        <Route exact path="/dashboard" component={Dashboard} />
                    </AuthProvider>
                </Switch>
        </Router>
    )
}

export default App;
