import express from 'express'
import PlanMemberListController from '../controllers/planMemberList'

const planMemberListRouter = express.Router()

planMemberListRouter.get('/', PlanMemberListController.getPlanMemberList)

export default planMemberListRouter
