
import { type Response, type NextFunction, type Request } from 'express';
import PlanMembership from '../service/planMembership';

export default class PlanMembershipController {
  static async getPlanMembership(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const planMembershipID = req.params.id;

      const userPlanMembership = await PlanMembership.getPlanMembership(planMembershipID);

      res.status(201).json(userPlanMembership);
    } catch (error) {
      console.error(`Error in PlanMembershipController.getPlanMembership: ${error}`)
      res.status(400).json({ error })
    }
  }
}
