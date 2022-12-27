import React, {useState} from 'react'
import { Box, Container, Typography, Button, LinearProgress } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import {ICosts} from '../../../models/costs.model'
import {formatDate} from '../../../utils/arrayUtils'
import { deleteCost, deleteCostFx, updateCostsFx } from '../../../store/costs'
import {UpdateCosts} from './UpdateCosts'
import { useStore } from 'effector-react'


export const CostsItem = ({date, text, price, _id}: ICosts) => {

  const [edit, setEdit] = useState<boolean>(false)
  const pending = useStore(updateCostsFx.pending)

  return (
    <Container component='span' sx={{p: 2, border: '1px solid grey', mt: 0.05}}>
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
    </Container>
  )
}

