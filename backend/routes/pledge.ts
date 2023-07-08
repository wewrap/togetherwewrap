import express from 'express';
import PledgeController from '../controllers/pledge';

const pledgeRouter = express.Router();

pledgeRouter.get('/', PledgeController.getAllPledgesData);

export default pledgeRouter;
