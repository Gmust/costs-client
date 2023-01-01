import React, { useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Button,
  LinearProgress,
  CardContent,
  CardActions,
  Card,
  Tooltip,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import { ICosts } from '../../../models/costs.model'
import { formatDate } from '../../../utils/arrayUtils'
import { deleteCost, deleteCostFx, updateCostsFx } from '../../../store/costs'
import { UpdateCosts } from './UpdateCosts'
import { useStore } from 'effector-react'
import { Delete, Edit } from '@mui/icons-material'


export const CostsItem = ({ date, text, price, _id }: ICosts) => {

  const [edit, setEdit] = useState<boolean>(false)
  const pending = useStore(updateCostsFx.pending)

  const handleDeleteCost = () => {
    deleteCostFx(_id!)
    deleteCost(_id!)
  }

  return (
    /*<Container component='span' sx={{p: 2, border: '1px solid grey', mt: 0.05}}>
      <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        {
          edit ?
            <UpdateCosts setEdit={setEdit} id={_id}/>
            :
            <Box sx={{display: 'flex', flexDirection: {sm: 'column', md: 'row'}, justifyContent: 'space-between'}}>
              <Typography sx={{ml: 1}}>Info: {text} </Typography>
              <Typography sx={{ml: 1}}>Total: {price}</Typography>
              <Typography sx={{ml: 1}}>Date: {formatDate(date)}</Typography>
            </Box>

        }

        <Box>
          <Button onClick={()=> setEdit(!edit)} ><ModeEditIcon color='success'/></Button>
          <Button><CloseIcon onClick={() => {
            deleteCostFx(_id!)
            deleteCost(_id!)
          }} color='error' /></Button>
        </Box>
      </Box>
      {pending && <LinearProgress/>}
    </Container>*/

    <Card sx={{ minWidth: 200, maxWidth: 300, minHeight: 180, margin: 1 }}>
      {edit
        ?
        <UpdateCosts
          id={_id!} setEdit={setEdit} price={price} text={text} />
        :
        <>
          <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
              {text}
            </Typography>
            <Typography variant='h5' component='div'>
            </Typography>
            <Typography sx={{ mb: 1.5 }} color='text.secondary'>
              {formatDate(date)}
            </Typography>
            <Typography variant='body2'>
              Total: {price}
            </Typography>
          </CardContent>
          <CardActions sx={{ display: 'flex', maxWidth: '10px' }}>
            <Tooltip title='Delete'>
              <Button color='error' onClick={() => handleDeleteCost()}><Delete /></Button>
            </Tooltip>

            <Tooltip title='Edit'>
              <Button color='success' size='small' onClick={() => setEdit(true)}>
                <Edit />
              </Button>
            </Tooltip>
          </CardActions>
        </>
      }

    </Card>
  )
}

