import * as Yup from "yup";
// export const signUpSchema = Yup.object({
//   // name: yup.string().min(3).required("Please enter name"),
//   // email: yup.string().email("Please enter valid email").required("Please enter email"),
//   // password: yup.string().min(6).required("Please enter valid password"),
//   // avatar: yup.string().required("Provide link for avatar"),
//   name: Yup.string().min(2).max(25).required("Please enter name"),
//   email: Yup.string()
//     .email()
//     .matches(
//       /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//     )
//     .required("Please enter your email"),
//   password: Yup.string()
//     .matches(
//       /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
//       "Password must contain at least 8 characters, one uppercase, one number and one special case character"
//     )
//     .required("Please enter your password"),
//   avatar: Yup.string()
//     .matches(/(https?:\/\/.*\.(?:png|jpg|jpeg|gif|png|svg))/i, "enter valid link")
//     .required("Please enter avatar link"),
// });

export const validationSchema = Yup.object().shape({
  email: Yup.string().email().required("Enter valid email-id"),
  name: Yup.string().required("Please enter full name"),
  password: Yup.string()
    .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,20}\S$/)
    .required("Please valid password. One uppercase, one lowercase and no spaces"),
  avatar: Yup.string().matches(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|png|svg))/).required("Please provide avatar link ")
  // confirmPassword: Yup.string()
  //   .required("Required")
  //   .test("password-match", "Password musth match", function (value) {
  //     return this.parent.password === value;
  //   }),
});
