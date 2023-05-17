import express from 'express'
import PlanInviteController from '../controllers/verifyPlan';
const verifyPlanInviteRouter = express.Router()

verifyPlanInviteRouter.post('/:id', PlanInviteController.verifyPlanInvite)

export default verifyPlanInviteRouter;
