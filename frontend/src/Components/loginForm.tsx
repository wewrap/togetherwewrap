import React, { useState } from 'react';
import axios from 'axios';
import './login.css';

export const LoginForm = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
          const response = await axios.post("http://localhost:8000/login/password", {
            username,
            password,
          });
          console.log(response.data)
        } catch(error) {
            console.error(error);
        }
    };
    
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
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
                  <label htmlFor="username">username*</label>
                  <input id="username" name="username" type="text" autoComplete="on" required value={username} onChange={handleUsernameChange}/>
              </div>
              <div className='user_creds'>
                  <label htmlFor="current_password">password*</label>
                  <input id="current_password" name="password" type="password" autoComplete="on" required value={password} onChange={handlePasswordChange}/>
                  <p className='form_text'>remember me</p>
              </div>
              <div>
                  <button type="submit">Log in</button>
              </div>
          </form>
        </section>
    );
};
