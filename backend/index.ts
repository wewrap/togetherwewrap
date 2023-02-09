/* Index ts is responsible for connecting the app to local port*/

import app from './app';
import http from 'http';

const server = http.createServer(app)

const port = 8000;

app.listen(8000, () => {
    console.log(`Server started: http://localhost:${port}/`);
}); 
