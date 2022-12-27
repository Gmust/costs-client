import React from 'react'
import {CostsItem} from './CostsItem'
import {ICosts} from '../../../models/costs.model'

const CostsList = ({costs}: {costs: ICosts[]}) => {
  return (
      <>
        {costs.map((info) =>
          <CostsItem key={info._id} text={info.text} date={info.date} price={info.price}
                     _id={info._id?.toString()} />)}
      </>
  )
}

export default CostsList