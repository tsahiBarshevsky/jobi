import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import Dashboard from './components/Dashboard/Dashboard';
import Example from './components/Example/Example';
import './App.sass';

const App = () => 
{
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Example} />
            </Switch>
        </Router>
    )
}

export default App;
