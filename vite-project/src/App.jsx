
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import DashboardPage from './DashboardPage';
import EventForm from './EventForm';
import Layout from './Layout'
const App = () => {
  return (
    <Router>
      <Switch>
      
        <Route path="/signup" component={SignupPage} />
        <Route path="/dashboard" component={DashboardPage} />
        <Route path="/add" component={EventForm} />
        <Route path="/" component={LoginPage} />
      

        
      </Switch>
    </Router>
  );
};

export default App;
