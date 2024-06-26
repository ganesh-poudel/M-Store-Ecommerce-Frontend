import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  price: Yup.number().required("Enter valid email-id"),
  title: Yup.string().required("Please enter full name"),
  categoryId: Yup.number().required("Please valid password. One uppercase, one lowercase and no spaces"),
  description: Yup.string().required("Please provide avatar link "),
});
