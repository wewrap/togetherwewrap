import express from 'express';
import { AccountController } from '../controllers/account';
import { body } from 'express-validator';
import { handleInputErrors } from '../modules/middleware';
const accountRouter = express.Router()

accountRouter.put('/:id',
  body('firstName').isString().optional(),
  body('lastName').isString().optional(),
  body('email').isEmail().optional(),
  body('cashapID').isString().optional(),
  body('venmoID').isString().optional(),
  body('paypalID').isString().optional(),
  handleInputErrors,
  AccountController.updateAccountInformation);

export default accountRouter;
