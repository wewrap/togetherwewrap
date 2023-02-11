import React, { useState } from 'react';
import axios from 'axios';



export const LoginForm = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
          axios.post("http://localhost:8000/login/password", {
            username,
            password,
          })
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error(error);
          });
      };  
    
    
    return (
        <form action="/login/password" method="post" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username 12121a</label>
                <input id="username" name="username" type="text" autoComplete="username" required value={username} onChange={event => setUsername(event.target.value)} />
            </div>
            <div>
                <label htmlFor="current-password">Password</label>
                <input id="current-password" name="password" type="password" autoComplete="current-password" required value={password} onChange={event => setPassword(event.target.value)} />
            </div>
            <div>
                <button type="submit">Log in</button>
            </div>
        </form>
    );
};
