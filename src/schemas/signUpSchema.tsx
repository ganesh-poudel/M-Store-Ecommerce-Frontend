import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  email: Yup.string().email().required('Enter valid email-id'),
  name: Yup.string().required('Please enter full name'),
  password: Yup.string()
    .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,20}\S$/)
    .required('Please valid password. One uppercase, one lowercase and no spaces'),
  avatar: Yup.string()
    .matches(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|png|svg))/)
    .required('Please provide avatar link '),
});
