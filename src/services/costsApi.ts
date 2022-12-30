import { ICosts, ICreateCost } from '../models/costs.model'
import { setCostsError, setSnackbar } from '../store/alerts'
import { $authHost } from './index'
import { createCost, selectedId, setCosts, updateCost } from '../store/costs'
import { setIsAuth } from '../store/auth'


export class CostsClient {

  static async createCosts(data: { text: string, price: string | number, date: string | Date }) {
    try {
      const result = await $authHost.post('/cost', data)
      createCost(result.data)
      setSnackbar('Successfully created')
      return result.data
    } catch (e: any) {
      setCostsError(e?.response.data.message)
    }
  }

  static async getCosts() {
    try {
      const result = await $authHost.get(`/cost`)
      setIsAuth(true)
      return setCosts(result.data)
    } catch (e: any) {
      setIsAuth(false)
      setCostsError(e?.response.data.message)
    }
  }

  static async deleteCost(id: string | number) {
    try {
      const result = await $authHost.delete(`/cost/${id}`)
      setSnackbar('Successfully deleted')
      return result
    } catch (e: any) {
      setCostsError(e?.response.data.message)
    }
  }

  static async updateCost(data: ICosts, id: string | number) {
    try {
      const result = await $authHost.patch(`/cost/${id}`, data)
      data._id = selectedId.getState()
      updateCost(data)
      setSnackbar('Successfully updated')
      return result
    } catch (e: any) {
      setCostsError(e?.response.data.message)
    }
  }

}