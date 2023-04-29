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
    .oneOf([yup.ref("new_password")], "Passwords must match"),
});

export const UPDATE_PROFILE_SCHEMA = yup.object({
  first_name: yup.string().label("First Name").required(),
      last_name: yup.string().label("Last Name").required(),
      about: yup.string().label("About").required(),
      website: yup.string().label("Website").required(),
      // profile_image_url: yup.string().label("First Name").required(),
      country: yup.string().label("Country").required(),
      city: yup.string().label("City").required(),
      github_url: yup.string().label("Github Link").required(),
      linkedin_url: yup.string().label("Linked Url").required(),
      twitter_url: yup.string().label("Twitter Url").required(),
      instagram_url: yup.string().label("Instagram Url").required()
})