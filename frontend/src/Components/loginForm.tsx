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
        <section>
          <img src='./wewrap_green.png' alt='wewrap logo'></img>
          <h1>Log in to your account</h1>
          <p className='subheader'>Don't have an account? Sign up</p>

          <form action="/login/password" method="post" onSubmit={handleSubmit}>
              <div className='user_creds'>
                  <label htmlFor="email">Email*</label>
                  <input id="email" name="email" type="text" autoComplete="on" required value={email} onChange={handleEmailChange}/>
              </div>
              <div className='user_creds'>
                  <label htmlFor="current_password">Password*</label>
                  <input id="current_password" name="password" type="password" autoComplete="on" required value={password} onChange={handlePasswordChange}/>
                  <p className='form_text'>Remember me</p>
                  <p>Forgot password?</p>
              </div>
              <div>
                  <button type="submit">Log in</button>
              </div>
          </form>
        </section>
    );
};
