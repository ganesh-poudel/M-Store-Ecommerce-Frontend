import * as Yup from "yup";
export const validationSchema = Yup.object().shape({
  email: Yup.string().email().required("Enter valid email-id"),
});
