import {setTotalPrice} from '../store/costs'
import {ICosts} from '../models/costs.model'


export const countTotalPrice = (costs: ICosts[]) => {
  if (costs === undefined) {
    return
  }

  setTotalPrice(
    costs.reduce((defaultCount, item) => defaultCount + item.price, 0),
  )

}

export const formatDate = (date: Date | string) => {
  const newDate = new Date(date)

  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }


  return newDate.toLocaleString('pl', options as Intl.DateTimeFormatOptions)

}