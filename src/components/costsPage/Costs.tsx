import React, {useEffect, useRef, useState, useMemo} from 'react'
import {Container, Box, Typography, Stack, Button, LinearProgress} from '@mui/material'
import {CreateCostModal} from './CreateCostModal'
import {useStore} from 'effector-react'
import {$costs, $totalPrice, getCostsFx} from '../../store/costs'
import {countTotalPrice} from '../../utils/arrayUtils'
import {CostsSkeleton} from '../../assets/CostsSkeleton'
import CostsList from './CostsList/CostsList'

export const Costs = () => {


  const [openModal, setOpenModal] = useState<boolean>(false)
  const shouldLoadCosts = useRef(true)

  const costs = useStore($costs)
  const pending = useStore(getCostsFx.pending)


  useEffect(() => {
    if (shouldLoadCosts.current) {
      shouldLoadCosts.current = false
      getCostsFx()
    }
  }, [])

  const totalPrice = useStore($totalPrice)

  useEffect(() => {
    countTotalPrice(costs)
  }, [costs])

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  return (
    <Container component='main' maxWidth='lg'>
      <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Typography variant='h3'>
          My costs accounting
        </Typography>

        {pending ? <LinearProgress /> :
          <Typography variant='h4'>
            Total spent: {totalPrice}
          </Typography>
        }
        <Box sx={{mt: 1}}>
          <Button onClick={handleOpenModal}>Create Cost</Button>
        </Box>

        <CreateCostModal open={openModal} handleModalClose={handleCloseModal} />


        <Stack sx={{mt: 2, width: {xs: '90vw', lg: '60vw'}}} direction='column'>
          {
            pending &&
            <CostsSkeleton />
          }
          {
            useMemo(() => <CostsList costs={costs} />, [costs])
          }
        </Stack>


      </Box>
    </Container>
  )
}

