import { createForm } from 'effector-forms'
import { forward } from 'effector'
import { loginUserFx, registerUserFx } from '../auth'
import { createCostFx, updateCostsFx } from '../costs'
import { rules } from './formsRules'


export const loginForm = createForm({
  fields: {
    username: {
      init: '',
      rules: [
        rules.username(),
        rules.required(),
        rules.minLength(3),
      ],
    },
    password: {
      init: '',
      rules: [
        rules.passwordField(),
        rules.required(),
        rules.minLength(6),
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
        rules.username(),
        rules.minLength(3),
      ],
    },
    password: {
      init: '',
      rules: [
        rules.passwordField(),
        rules.minLength(6),
        rules.required(),
      ],
    },
    confirmation: {
      init: '',
      rules: [
        rules.passwordConfirmation(),
        rules.minLength(6),
        rules.required(),
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
      init: 0 as number,
      rules: [
        rules.priceField(),
      ],
    },
    date: {
      init: new Date() as unknown as string,
    },
  },
  validateOn: ['change'],
})

export const updateCostForm = createForm({
  fields: {
    text: {
      init: '' as string,
      rules: [
        rules.textField(),
      ],
    },
    price: {
      init: 0 as number,
      rules: [
        rules.priceField(),
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
  from: updateCostForm.formValidated,
  to: updateCostsFx,
})