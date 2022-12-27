import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import { useForm } from 'effector-forms'
import { updateCostForm } from '../../../store/forms'
import { Box, Button,  TextField } from '@mui/material'
import DoneIcon from '@mui/icons-material/Done'
import {  setSelectedId, updateCostsFx } from '../../../store/costs'
import { useStore } from 'effector-react'
import { formatDate } from '../../../utils/arrayUtils'

type TUpdateCostsForm = {
  id: string | number,
  setEdit: Dispatch<SetStateAction<boolean>>
}

export const UpdateCosts = ({ setEdit, id }: TUpdateCostsForm) => {


  const { submit, fields, eachValid, values, reset } = useForm(updateCostForm)
  const pending = useStore(updateCostsFx.pending)
  setSelectedId(id)

  const onSubmit = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault()
    submit()
    reset()
    setEdit(false)
  }

  return (
    <Box component='form'
         sx={{ display: 'flex', flexDirection: { sm: 'column', md: 'row' }, justifyContent: 'space-between' }}
         onSubmit={onSubmit}
    >
      <TextField
        margin='normal'
        fullWidth
        required
        label='Text'
        variant='outlined'
        value={fields.text.value}
        onChange={(e) => fields.text.onChange(e.target.value)}
      />
      <TextField
        margin='normal'
        fullWidth
        required
        label='Amount'
        variant='outlined'
        value={fields.price.value}
        onChange={(e) => fields.price.onChange(e.target.value)}
      />
      <TextField
        margin='normal'
        fullWidth
        required
        label='Date'
        variant='outlined'
        value={formatDate(fields.date.value)}
        onChange={(e) => fields.date.onChange(e.target.value)}
      />
      <Button type='submit' disabled={!eachValid || pending}><DoneIcon /></Button>
    </Box>
  )
}

