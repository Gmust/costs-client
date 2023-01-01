import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { useForm } from 'effector-forms'
import { updateCostForm } from '../../../store/forms/forms'
import { Alert, Button, CardActions, CardContent, TextField, Tooltip } from '@mui/material'
import { setSelectedId, updateCostsFx } from '../../../store/costs'
import { useStore } from 'effector-react'
import { Cancel, Save } from '@mui/icons-material'
import { Dayjs } from 'dayjs'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Navbar } from '../../navbar/Navbar'

type TUpdateCostsForm = {
  id: string | number,
  setEdit: Dispatch<SetStateAction<boolean>>
  text: string,
  price: number
}

export const UpdateCosts = ({ setEdit, id, text, price }: TUpdateCostsForm) => {


  const { submit, fields, eachValid, values, reset, errorText } = useForm(updateCostForm)
  const pending = useStore(updateCostsFx.pending)
  setSelectedId(id)

  useEffect(() => {
    if (isNaN(fields.price.value)) {
      fields.price.set(0)
    }
  }, [fields.price.value])

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (fields.price.value === 0) {
      fields.price.set(price)
    }
    if (fields.text.value === '') {
      fields.text.set(text)
    }
    e.preventDefault()
    submit()
    reset()
    setEdit(false)
  }

  const handleChangeDate = (newValue: Dayjs | null) => {
    if (newValue === null || undefined) {
      fields.date.onChange(new Date().toString())
      return
    }
    // @ts-ignore
    fields.date.onChange(newValue.toString())
  }


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column' }} component='form' onSubmit={onSubmit}>
        <TextField
          margin='normal'
          fullWidth
          size='small'
          required
          label='Text'
          variant='outlined'
          defaultValue={text}
          onChange={(e) => fields.text.onChange(e.target.value)}
        />
        {fields.text.errors.length > 0 &&
          <Alert variant='filled' severity='error'>{errorText('text')}</Alert>}
        <DatePicker
          onChange={handleChangeDate}
          value={fields.date.value ? fields.date.value : new Date()}
          renderInput={(params) => <TextField fullWidth size='small' {...params} />}
        />
        {fields.date.errors.length > 0 &&
          <Alert variant='filled' severity='error'>{errorText('date')}</Alert>}
        <TextField
          margin='normal'
          fullWidth
          size='small'
          required
          label='Amount'
          variant='outlined'
          defaultValue={price}
          onChange={(e) => fields.price.onChange(Number(e.target.value))}
        />
        {fields.price.errors.length > 0 &&
          <Alert variant='filled' severity='error'>{errorText('price')}</Alert>}

        <CardActions sx={{ display: 'flex', maxWidth: '10px' }}>
          <Tooltip title='Save'>
            <Button type='submit' disabled={pending || !eachValid} color='success'><Save /></Button>
          </Tooltip>

          <Tooltip title='Cancel'>
            <Button color='success' size='small' onClick={() => setEdit(false)}>
              <Cancel color='error' />
            </Button>
          </Tooltip>
        </CardActions>
      </CardContent>

    </LocalizationProvider>
  )
}

