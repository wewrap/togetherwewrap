import PlanModel from '../models/plan'

export default class PlanService {
  public static async initiatePlan(data: any): Promise<any> {
    try {
      const modelResponse = await PlanModel.dbCreateOneplan(data)

      if (modelResponse === undefined) throw new Error('model response is undefined')

      return modelResponse
    } catch (err) {
      console.error('create plan service failed', err)
    }
  }
}
