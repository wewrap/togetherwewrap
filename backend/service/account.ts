import UserModel from '../models/user';

export class AccountService {
  static async updateAccount(whereParam: { id: string }, updateData: any) {
    try {
      const response = await UserModel.dbUpdateOneUser(whereParam, updateData);

      return response
    } catch (error) {
      throw Error(`Error in AccountService.updateAccount: ${error}`)
    }
  }
}
