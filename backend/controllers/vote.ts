import { type User } from '@prisma/client';
import { type Response, type NextFunction, type Request } from 'express';
import { VoteService } from '../service/vote';

export default class VoteController {
  static async updateVote(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const planID = req.query.planID;
      const user = req.user as User;
      console.log('🚀 ~ file: vote.ts:9 ~ VoteController ~ getBrainstormStageData ~ user:', user)
      const selectedVotePost = req.body.selectedVotePost;
      console.log('🚀 ~ file: vote.ts:10 ~ VoteController ~ getBrainstormStageData ~ selectedVotePost:', selectedVotePost)

      if (typeof planID !== 'string') {
        throw new Error('planID is missing in query params');
      }

      // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
      const updatedVotePost = await VoteService.updateVotePost(planID, user, selectedVotePost);
      res.status(201).json(updatedVotePost);
    } catch (error) {
      console.error(`Error in BrainstormStageController.getBrainstormStageData: ${error}`)
      res.status(400).json({ error })
    }
  }
}
