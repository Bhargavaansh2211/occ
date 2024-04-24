import React, {useState} from 'react';
import isEmail from 'validator/lib/isEmail';

import {Tilt} from 'react-tilt';
import { Link } from 'react-router-dom';
const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const onStartLogin = (e) => {
        e.preventDefault(); 
        if(isEmail(email)){
            const credentials = {
                name:"abcd",
                handle:"abcd",
                email,
                password
            };
            console.log(credentials.email)
        }
    }
  
    
    
    return(
        <div className="box-layout">
            <div className="box-layout__logo-outside ">
            </div>
             <div className="spinner"></div>
            <div className="box-layout__box ">
            <div className="box-layout__logo-inside">
                    <Tilt className="Tilt" options={{ max : 25 }} >
                        <img src="images/logo.png" alt=""/>
                        <h1 className="box-layout__title ">Occasionly</h1>
                        <h2 className="box-layout__subtitle">Explore different activities held in IIIT</h2>
                    </Tilt>
            </div>
                <div className="box-layout__form">
                    
                        <form onSubmit={onStartLogin}>
                        <input  type="email" value={email}
                        onChange={e => (setEmail(e.target.value))}
                        placeholder="email"
                        
                        />
                        <input type="password" value={password}  
                        onChange={e => (setPassword(e.target.value))}
                        placeholder={"password"}
                        className="animated fadeInRight delay-2s"
                        />
                       <Link to='/dashboard'> <button className="button button-primary">Login</button></Link>
                      
                    </form>
                    
                    
                    
                    
                    <div className="box-layout__question">
                    <label >no account? </label><Link to='/signup'>Sign Up</Link>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
export  default LoginPage