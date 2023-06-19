import express from 'express';
import { BrainstormStageController } from '../controllers/brainstorm';
import { body } from 'express-validator';

const brainstormRouter = express.Router()

brainstormRouter.get('/', BrainstormStageController.getBrainstormStageData)

brainstormRouter.post('/',
  body('description').isString(),
  body('item').isString(),
  body('itemLink').isString(),
  body('planID').isString(),
  BrainstormStageController.createBrainstormIdea)

brainstormRouter.put('/')

export default brainstormRouter;
