import express from 'express'
import { body } from 'express-validator'
import { handleInputErrors } from '../modules/middleware'
import { createContact, getContacts } from '../controllers/contacts'

const contactRouter = express.Router()

contactRouter.get('/', getContacts)

contactRouter.post('/',
  body('firstName').isString(),
  body('lastName').isString(),
  body('email').isEmail(),
  body('phoneNumber').isString(),
  body('notes').isString(),
  body('source').isString(),
  body('ownerID').isString(),
  body('relationships').isArray(),
  body('importantDateEvent').isArray(),
  handleInputErrors,
  createContact)

export default contactRouter
