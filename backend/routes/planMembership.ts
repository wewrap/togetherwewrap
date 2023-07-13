import express from 'express';
import PlanMembershipController from '../controllers/planMembership';
// import { body, } from 'express-validator';
// import { handleInputErrors } from '../modules/middleware';

const planMembershipRouter = express.Router();

planMembershipRouter.get('/:id', PlanMembershipController.getPlanMembership);

export default planMembershipRouter;
