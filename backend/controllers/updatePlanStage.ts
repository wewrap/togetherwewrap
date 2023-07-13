// import { type User } from '@prisma/client';
import { type Response, type NextFunction, type Request } from 'express';
import PlanService from '../service/plan';
import { type PlanStage } from '@prisma/client';

export class UpdatePlanStageController {
  static async updateToNextPlanStage(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const planID = req.body.planID
      const stage = req.params.id as PlanStage

      const planRecord = await PlanService.updatePlanStage(planID, stage);

      res.status(200).json(planRecord)
    } catch (error) {
      console.error(`Error in UpdatePlanStageController.updateToNextPlanStage: ${error}`)
      res.status(400).json({ error })
    }
  }
}
