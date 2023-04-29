import express from 'express'
import { body } from 'express-validator'
import { handleInputErrors } from '../modules/middleware'
import ContactController from '../controllers/contacts'

const contactCreatorRouter = express.Router()

contactCreatorRouter.get('/',
  handleInputErrors,
  ContactController.getContacts)

contactCreatorRouter.post('/',
  body('firstName').isString(),
  body('lastName').isString(),
  body('email').isEmail(),
  body('phoneNumber').isString(),
  body('notes').isString(),
  body('relationships').isArray(),
  handleInputErrors,
  ContactController.createContact)

export default contactCreatorRouter
