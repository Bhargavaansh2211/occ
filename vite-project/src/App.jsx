
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import DashboardPage from './DashboardPage';
import EventForm from './EventForm';
import AboutUs from './AboutUs';

const App = () => {
  return (
    <Router>
      <Switch>
      
        <Route path="/signup" component={SignupPage} />
        <Route path="/dashboard" component={DashboardPage} />
        <Route path="/add" component={EventForm} />
        <Route path="/aboutus" component={AboutUs}/>
        <Route path="/" component={LoginPage} />
      

        
      </Switch>
    </Router>
  );
};

export default App;
