/* Index ts is responsible for connecting the app to local port */

import app from './app';
import http from 'http';
import { port } from './utils/config';

const server = http.createServer(app)

server.listen(port, () => {
  console.log(`Server started: http://localhost:${port}/`);
});
