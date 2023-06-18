import express from 'express';
import { BrainstormStageController } from '../controllers/brainstorm';

const brainstormRouter = express.Router()

brainstormRouter.get('/:id', BrainstormStageController.getBrainstormStageData)

brainstormRouter.post('/')

brainstormRouter.put('/')

export default brainstormRouter;
