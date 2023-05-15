import express from 'express'
import { body } from 'express-validator'
import { handleInputErrors } from '../modules/middleware'
import InviteContactController from '../controllers/inviteContacts'
const inviteContactsRouter = express.Router();

inviteContactsRouter.post('/',
  body('planID').isString().notEmpty(),
  body('message').isString().notEmpty(),
  body('selectedContacts')
    .custom((value: any[]) => {
      return value.every((contact) => {
        return 'id' in contact &&
          'firstName' in contact &&
          'ownerID' in contact
      })
    }),
  handleInputErrors,
  InviteContactController.inviteContacts
)

export default inviteContactsRouter
