import * as yup from 'yup'

export const CHANGE_PASSWORD_SCHEMA = yup.object({
  current_password: yup.string().label("Current Password").required(),
  new_password: yup
    .string()
    .label("New password")
    .min(8)
    .max(32)
    .required()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain atleast 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  confirm_password: yup
    .string()
    .label("Confirm password")
    .oneOf([yup.ref("new_password"), null], "Passwords must match"),
});