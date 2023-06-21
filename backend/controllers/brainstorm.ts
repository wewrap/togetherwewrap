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

      const brainStormIdeaPost = await BrainstormIdeaPostService.createBrainstormIdeaPost(planID, user, createBrainstormIdeaPostData)

      res.status(200).json(brainStormIdeaPost)
    } catch (error) {

    }
  }

  static async updateBrainstormIdea(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = req.user as User;
      const brainstormIdeaPostID = req.params.id;

      const { planID, ...updateBrainstormIdeaPostData } = req.body;

      // add the brainstormIdeaPostID to the updateBrainstormIdeaPostData object
      updateBrainstormIdeaPostData.id = brainstormIdeaPostID

      const brainStormIdeaPost = await BrainstormIdeaPostService.updateBrainstormIdeaPost(planID, user, updateBrainstormIdeaPostData)

      res.status(200).json(brainStormIdeaPost)
    } catch (error) {
      console.log(error)
      res.status(400).json({ error: 'Error updating brainstorm idea post' })
    }
  }

  static async deleteBrainstormIdeas(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const brainstormIdeaPostID = req.params.id;

      const brainStormIdeaPost = await BrainstormIdeaPostService.deleteBrainstormIdeaPost(brainstormIdeaPostID)
      res.status(200).json(brainStormIdeaPost)
    } catch (error) {
      console.log(error)
      res.status(400).json({ error: 'Error deleting brainstorm idea post' })
    }
  }
}
