import React, { useState } from 'react';
import axios from 'axios';
import './login.css';

export const LoginForm = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
          const response = await axios.post("http://localhost:8000/login/password", {
            email,
            password,
          });
          console.log(response.data)
        } catch(error) {
            console.error(error);
        }
    };
    
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

    return (
        <div className='login_form'>
          <img src='./wewrap_green.png' alt='wewrap logo'></img>
          <h1>Log in to your account</h1>
          <p className='subheader'>Don't have an account? &nbsp;<a href='' >Sign up</a> </p>
          <form action="/login/password" method="post" onSubmit={handleSubmit}>
              <div className='user_creds'>
                  <label htmlFor="email">Email*</label>
                  <input className="email" name="email" type="text" autoComplete="on" required value={email} onChange={handleEmailChange}/>
              </div>
              <div className='user_creds'>
                  <label htmlFor="current_password">Password*</label>
                  <input className="current_password" name="password" type="password" autoComplete="on" required value={password} onChange={handlePasswordChange}/>
              </div>
              <div className='user_helper'>
                <label>
                  <input type="checkbox" name="remember-me" id="remember-me"/>Remember Me
                </label>
                <p className='forget_password'>Forgot password?</p>
              </div>
              <div>
                  <button className='submit_button' type="submit">Log in</button>
              </div>
          </form>
        </div>
    );
};
