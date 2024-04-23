import React, {useState} from 'react';
import isEmail from 'validator/lib/isEmail';

import {Tilt} from 'react-tilt';
import { Link } from 'react-router-dom';
import { faGoogle, faFacebookSquare} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const LoginPage = ({ startLogin, error,unsetError, loading}) => {

    const [email, getEmail] = useState('');
    const [password, getPassword] = useState('');
    
    const onStartLogin = (e) => {
        e.preventDefault(); 
        if(isEmail(email)){
            const credentials = {
                name:"ansh",
                handle:"Ansh",
                email,
                password
            };
            console.log(credentials.email)
        }
    }
  
    
    
    return(
        <div className="box-layout">
            <div className="box-layout__logo-outside animated fadeInDown delay-1s">
            </div>
            {loading && <div className="spinner"></div>}
            <div className="box-layout__box  animated fadeInRight delay-1s">
            <div className="box-layout__logo-inside">
                    <Tilt className="Tilt" options={{ max : 25 }} >
                        <img src="images/logo.png" alt=""/>
                        <h1 className="box-layout__title animated flash delay-2s">Occasionly</h1>
                        <h2 className="box-layout__subtitle">Explore different activities held in IIIT</h2>
                    </Tilt>
            </div>
                <div className="box-layout__form">
                    
                        <form onSubmit={onStartLogin}>
                        <input  type="email" value={email}
                        onChange={e => (getEmail(e.target.value))}
                        placeholder="email"
                        className="animated fadeInLeft delay-2s"
                        />
                        <input type="password" value={password}  
                        onChange={e => (getPassword(e.target.value))}
                        placeholder={error ? <p>{error}</p> : "password"}
                        className="animated fadeInRight delay-2s"
                        />
                       <Link to='/dashboard'> <button className="button button-primary">Login</button></Link>
                      
                    </form>
                    
                    
                    
                    {error && showErrors()}
                    <div className="box-layout__question">
                    <label >no account? </label><Link to='/signup'>Sign Up</Link>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
export  default LoginPage