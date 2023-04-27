import * as yup from 'yup'

export const CHANGE_PASSWORD_SCHEMA = yup.object({
  currentPassword: yup.string().label("Current Password").required(),
  newPassword: yup
    .string()
    .label("New password")
    .min(8)
    .max(32)
    .required()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain atleast 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  confirmPassword: yup
    .string()
    .label("Confirm password")
    .oneOf([yup.ref("NewPassword")], "Passwords must match"),
});