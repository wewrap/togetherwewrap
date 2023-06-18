import { type Response, type NextFunction, type Request } from 'express';
import { BrainstormIdeaPostService } from '../service/brainstorm';

export class BrainstormStageController {
  static async getBrainstormStageData(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // we need to user credentials to get the planMembership, we also need  the planID
      const planID = req.params.planID;

      const brainStormIdeaPost = await BrainstormIdeaPostService.getAllBrainstormIdeaPosts(planID)

      res.status(200).json(brainStormIdeaPost)
    } catch (error) {
      console.error(`Error in BrainstormStageController.getBrainstormStageData: ${error}`)
      res.status(400).json({ error: 'Error retrieving brainstorm idea posts' })
    }
  }
}
