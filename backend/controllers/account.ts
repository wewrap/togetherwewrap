import { type Response, type NextFunction, type Request } from 'express';
import { AccountService } from '../service/account';

export class AccountController {
  static async updateAccountInformation(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userID = req.params.id;

      const updatedUserAccountRecord = await AccountService.updateAccount({ id: userID }, req.body)

      res.status(200).json(updatedUserAccountRecord)
    } catch (error) {
      console.error(`Error in AccountController.updateAccountInformation: ${error}`)
      res.status(400).json({ error })
    }
  }
}
