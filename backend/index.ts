/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* Index ts is responsible for connecting the app to local port */
import app from './app';
import http from 'http';
import { port } from './utils/config';
import { Server } from 'socket.io'
import { PlanController } from './controllers/plan';
import PledgeController from './controllers/pledge';

const server = http.createServer(app)
export const io = new Server(server);

io.on('connection', (socket) => {
  console.log('user connected')

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('handleSetGoal', async (data) => {
    const planRecord = await PlanController.updatePlan(data)
    io.emit('finishedHandleSetGoal', planRecord)
  })

  socket.on('handleUserNotifyMoneySent', async (data) => {
    const pledgeRecord = await PledgeController.createPledge(data)
    io.emit('finishedHandleUserNotifyMoneySent', pledgeRecord)
  })

  socket.on('handlePledgeMoneyReceivedStatus', async (data) => {
    const updatedPledgeRecordAndPlanData = await PledgeController.updatePledge(data)
    io.emit('finishedHandlePledgeMoneyReceivedStatus', updatedPledgeRecordAndPlanData)
  })
})

server.listen(port, () => {
  console.log(`Server started: http://localhost:${port}/`);
});
