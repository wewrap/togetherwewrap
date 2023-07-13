import express from 'express';
import { body } from 'express-validator';
import { handleInputErrors } from '../modules/middleware';
import VoteController from '../controllers/vote';

const voteRouter = express.Router();

voteRouter.post('/',
  body('selectedVotePost').isObject(),
  handleInputErrors,
  VoteController.updateVote);

export default voteRouter;
