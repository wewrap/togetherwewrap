import express from 'express'
import InviteContactController from '../controllers/inviteContacts';
const verifyPlanInviteRouter = express.Router()

verifyPlanInviteRouter.get('/:id', InviteContactController.verifyPlanInvite)

export default verifyPlanInviteRouter;
