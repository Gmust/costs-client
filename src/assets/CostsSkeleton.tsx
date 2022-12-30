import React from 'react'
import { Skeleton } from '@mui/material'

type TCostsSkeleton = {
  amount: number
}

export const CostsSkeleton = ({ amount }: TCostsSkeleton) => {
  const skeletonArr = []

  for (let i = 0; i < amount; i++) {
    skeletonArr.push(i + 1)
  }


  return (
    <>
      {skeletonArr.map((item) =>
        <Skeleton key={item} animation='wave' sx={{ margin: 2 }} variant='rectangular'
                  height='160px' width='160px' />,
      )}

    </>
  )
}

