import React, { Dispatch, SetStateAction } from 'react'
import { Modal, Box, Fade, Backdrop, TextField, Button, Alert, LinearProgress } from '@mui/material'
import { useForm } from 'effector-forms'
import { createCostForm } from '../../store/forms/forms'
import { useStore } from 'effector-react'
import { createCostFx } from '../../store/costs'
import { $errorCosts } from '../../store/alerts'
import { formatDate } from '../../utils/arrayUtils'
import { DatePicker, DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'


type TModalProps = {
  open: boolean,
  handleModalClose: Dispatch<SetStateAction<boolean>>
}


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%) scale(1.1)',
  width: '50vh',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
}


export const CreateCostModal = ({ open, handleModalClose }: TModalProps) => {

  const { fields, submit, eachValid, errorText } = useForm(createCostForm)
  const pending = useStore(createCostFx.pending)
  const costsError = useStore($errorCosts)

  const onSubmit = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault()
    submit()
    !costsError && handleModalClose(false)
  }


  const handleChange = (newValue: Dayjs | null) => {
    // @ts-ignore
    fields.date.onChange(newValue.toString())
  }


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={open}
        onClose={handleModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style} component='form' onSubmit={onSubmit}>
            <Box>
              <TextField
                margin='normal'
                fullWidth
                required
                label='Place of spent'
                variant='outlined'
                value={fields.text.value}
                onChange={(e) => fields.text.onChange(e.target.value)}
              />
              {fields.text.errors.length > 0 && <Alert variant='filled' severity='error'>
                {errorText('text')}
              </Alert>}

              <TextField
                margin='normal'
                fullWidth
                required
                label='Amount'
                variant='outlined'
                value={fields.price.value}
                onChange={(e) => fields.price.onChange(Number(e.target.value))}
              />
              {fields.price.errors.length > 0 && <Alert variant='filled' severity='error'>
                {errorText('price')}
              </Alert>}

              <DatePicker
                onChange={handleChange}
                value={fields.date.value}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />


              {fields.date.errors.length > 0 && <Alert variant='filled' severity='error'>
                {errorText('date')}
              </Alert>}
            </Box>
            {pending && <LinearProgress />}
            {costsError && <Alert variant='filled' severity='warning'>{costsError}</Alert>}

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              <Button variant='contained' color='success' sx={{ margin: 1 }} type='submit'
                      disabled={!eachValid || pending}>
                Add
              </Button>

              <Button variant='contained' color='error' sx={{ margin: 1 }} onClick={() => handleModalClose(false)}>
                Close
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </LocalizationProvider>
  )
}

