import { type Response, type NextFunction, type Request } from 'express';
import { BrainstormIdeaPostService } from '../service/brainstorm';
import { type User } from '@prisma/client';

export class BrainstormStageController {
  static async getBrainstormStageData(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // we need to user credentials to get the planMembership, we also need  the planId
      const planID = req.query.planID;

      if (typeof planID !== 'string') {
        throw new Error('planID is not a string');
      }

      const brainStormIdeaPost = await BrainstormIdeaPostService.getAllBrainstormIdeaPosts(planID)

      res.status(200).json(brainStormIdeaPost)
    } catch (error) {
      console.error(`Error in BrainstormStageController.getBrainstormStageData: ${error}`)
      res.status(400).json({ error: 'Error retrieving brainstorm idea posts' })
    }
  }

  static async createBrainstormIdea(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = req.user as User;

      const { planID, ...createBrainstormIdeaPostData } = req.body;

      const brainStormIdeaPost = await BrainstormIdeaPostService.createBrainstormIdeaPost(planID, user.id, createBrainstormIdeaPostData)

      res.status(200).json(brainStormIdeaPost)
    } catch (error) {

    }
  }
}
