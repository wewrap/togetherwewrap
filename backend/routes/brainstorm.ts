import express from 'express';
import { BrainstormStageController } from '../controllers/brainstorm';
import { body } from 'express-validator';
import { handleInputErrors } from '../modules/middleware';

const brainstormRouter = express.Router()

brainstormRouter.get('/',
  BrainstormStageController.getBrainstormStageData)

brainstormRouter.post('/',
  body('description').isString(),
  body('item').isString(),
  body('itemLink').isString(),
  body('planID').isString(),
  handleInputErrors,
  BrainstormStageController.createBrainstormIdea)

brainstormRouter.put('/:id',
  body('description').isString(),
  body('item').isString(),
  body('itemLink').isString(),
  body('planID').isString(),
  handleInputErrors,
  BrainstormStageController.updateBrainstormIdea)

brainstormRouter.delete('/:id', BrainstormStageController.deleteBrainstormIdeas)

export default brainstormRouter;
