import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthProvider } from './Contexts/AuthContext';
import Homepage from './components/Homepage/Homepage';
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
                <Route exact path="/" component={Homepage}>
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
