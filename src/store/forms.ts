import { createForm } from 'effector-forms'
import { forward } from 'effector'
import { loginUserFx, registerUserFx } from './auth'
import { createCostFx, updateCostsFx } from './costs'
import { formatDate } from '../utils/arrayUtils'


export const loginForm = createForm({
  fields: {
    username: {
      init: '',
      rules: [
        {
          name: 'username',
          validator: (value: string) => /^[a-z][a-z0-9]*$/i.test(value),
        },
      ],
    },
    password: {
      init: '',
      rules: [
        {
          name: 'required',
          validator: (value: string) => Boolean(value),
        },
      ],
    },
  },
  validateOn: ['submit'],
})

export const registerForm = createForm({
  fields: {
    username: {
      init: '',
      rules: [
        {
          name: 'username',
          validator: (value: string) => /^[a-z][a-z0-9]*$/i.test(value),
        },
      ],
    },
    password: {
      init: '',
      rules: [
        {
          name: 'required',
          validator: (value: string) => Boolean(value),
        },
      ],
    },
    confirmation: {
      init: '',
      rules: [
        {
          name: 'confirmation',
          validator: (confirmation, { password }) => confirmation === password,
        },
      ],
    },
  },
})

export const createCostForm = createForm({
  fields: {
    text: {
      init: '' as string,
    },
    price: {
      init: '' as string,
      rules: [
        {
          name: 'price',
          validator: (value: string) => /^[0-9]*$/i.test(value),
        },
      ],
    },
    date: {
      init: new Date(),
    },
  },
  validateOn: ['submit'],
})

export const updateCostForm = createForm({
  fields: {
    text: {
      init: '' as string,

    },
    price: {
      init: '' as string,
      rules: [
        {
          name: 'price',
          validator: (value: string) => /^[0-9]*$/i.test(value),
        },
      ],
    },
    date: {
      init: new Date() as unknown as string,
    },
    id: {
      init: null,
    },
  },
  validateOn: ['submit'],
})

forward({
  from: loginForm.formValidated,
  to: loginUserFx,
})

forward({
  from: registerForm.formValidated,
  to: registerUserFx,
})

forward({
  from: createCostForm.formValidated,
  to: createCostFx,
})

forward({
// @ts-ignore
  from: updateCostForm.formValidated,
  to: updateCostsFx,
})