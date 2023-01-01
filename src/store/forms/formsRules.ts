import { Rule } from 'effector-forms'

export const rules = {
  required: (): Rule<string | number> => ({
    name: 'required',
    validator: (value) => ({
      isValid: Boolean(value),
      errorText: 'This field is required',
    }),
  }),
  username: (): Rule<string> => ({
    name: 'username',
    validator: (value) => ({
      isValid: /^[a-z][a-z0-9]*$/i.test(value),
      errorText: 'You must use only eng symbols and numbers',
    }),
  }),
  minLength: (length: number): Rule<string> => ({
    name: 'minLength',
    validator: (value) => ({
      isValid: value.length >= length,
      errorText: `Min length is ${length}`,
    }),
  }),
  passwordConfirmation: (): Rule<string> => ({
    name: 'passwordConfirmation',
    validator: (confirmation, { password }) => ({
      isValid: confirmation === password,
      errorText: 'Passwords do not corresponds',
    }),
  }),
  priceField: (): Rule<number> => ({
    name: 'price',
    validator: (value) => ({
      isValid: /^[0-9]*$/i.test(String(value)),
      errorText: 'Price must be a number!',
    }),
  }),
  textField: (): Rule<string> => ({
    name: 'text',
    validator: (value) => ({
      isValid: Boolean(value),
      errorText: 'This field is required',
    }),
  }),
  passwordField: (): Rule<string> =>({
    name: 'password',
    validator: (value)=>({
      isValid: /^[a-z]+[a-z0-9]*$/i.test(value),
      errorText: 'Password must contain only eng symbols and numbers '
    })
  })
}