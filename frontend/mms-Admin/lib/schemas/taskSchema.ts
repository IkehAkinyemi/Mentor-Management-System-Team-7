import * as yup from 'yup'

export const CREATE_TASK_SCHEMA = yup.object({
  title: yup.string().label("Title").required(),
  details: yup.string().label("Details").required(),
})