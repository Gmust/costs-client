import {createDomain} from 'effector'
import {ICosts} from '../models/costs.model'
import {CostsClient} from '../services/costsApi'


const costs = createDomain()


const handleRemoveCost = (costs: ICosts[], id: any) =>
  costs.filter(cost => cost._id !== id)

const handleUpdateCost = (
  costs: ICosts[],
  id: string | number,
  payload: Partial<ICosts>,
) => costs.map(cost => {
  if (cost._id === id) {
    return {
      ...cost,
      ...payload,
    }
  }
  return cost
})
export const getCostsFx = costs.createEffect({
  handler: async () => {
    return await CostsClient.getCosts()
  },
})

export const createCostFx = costs.createEffect({
  handler: async (data: {text: string, price: string | number, date: string | Date}) => {
    return await CostsClient.createCosts(data)
  },
})

export const updateCostsFx = costs.createEffect({
  handler: async (cost: ICosts) => {
    return await CostsClient.updateCost(cost, selectedId.getState())
  },
})

export const deleteCostFx = costs.createEffect({
  handler: async (id: string | number) => {
    return await CostsClient.deleteCost(id)
  },
})

export const setTotalPrice = costs.createEvent<number>()
export const setSelectedId = costs.createEvent<string | number>()

export const createCost = costs.createEvent<ICosts>()
export const updateCost = costs.createEvent<ICosts>()
export const deleteCost = costs.createEvent<string | number>()
export const setCosts = costs.createEvent<ICosts[]>()



export const selectedId = costs.createStore<number | string >('')
  .on(setSelectedId, (_, id) => id)

export const $costs = costs.createStore<ICosts[]>([])
  .on(createCost, (state, cost) => [...state, cost])
  .on(setCosts, (_, costs) => costs)
  .on(updateCost, (state, costs) => [
    ...handleUpdateCost(
      state,
      costs._id as string,
      {
        text: costs.text,
        price: costs.price,
        date: costs.date,
      },
    ),
  ])
  .on(deleteCost, (state, id) => [...handleRemoveCost(state, id)])

export const $totalPrice = costs.createStore<number>(0)
  .on(setTotalPrice, (_, value) => value)