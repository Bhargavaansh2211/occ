import React from 'react';
import EventListItem from './EventListItem';
import EventFilters from './EventFilters';
import {Link} from 'react-router-dom';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";   
import Header from './header';

const DashboardPage = () => (
    
    

    <div>
        <Header />
        <EventFilters/>
        <div className="card">
        <div className="blog-card">
            <EventListItem/>
        </div>
          
        {<Link to="/add" className="button-floating"><button><FontAwesomeIcon icon={faPlus}/></button></Link> }
    </div>
    

    </div>
    
)

export default DashboardPage;