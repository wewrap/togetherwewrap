import express from 'express'
import PlanInviteController from '../controllers/verifyPlan';
const verifyPlanInviteRouter = express.Router()

verifyPlanInviteRouter.get('/:id', PlanInviteController.verifyPlanInvite)

export default verifyPlanInviteRouter;
