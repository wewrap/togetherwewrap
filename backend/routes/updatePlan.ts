import express from 'express'
import { UpdatePlanStageController } from '../controllers/updatePlanStage';
const updatePlanStageRouter = express.Router()

updatePlanStageRouter.put('/:id', UpdatePlanStageController.updateToNextPlanStage)

export default updatePlanStageRouter;
