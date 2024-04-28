import { Formik, Form, FormikProps, Field } from 'formik';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { useDispatch} from 'react-redux';

import { UserLoginType } from '../../redux/auth/auth';
import { useLoginMutation } from '../../redux/auth/authApi';
import { saveLoginToken, setUser } from '../../redux/auth/authSlice';
import { validationSchema } from '../../schemas/LoginSchema';

export const Login = () => {
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const [inputError, setInputError] = useState('');

  const dispatch = useDispatch();

  const userLoginHandler = async (credients: UserLoginType, resetForm: Function) => {
    await login(credients)
      .unwrap()
      .then((data) => {
        console.log('data', data);
        const { accessToken } = data.tokens;
        dispatch(saveLoginToken(accessToken));
        dispatch(setUser(data.user));
        navigate('/products');
      })
      .catch((err) => {
        setInputError(err.data.message);
      });
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values: UserLoginType, actions) => {
        userLoginHandler(values, actions.resetForm);
        setTimeout(() => {
          actions.setSubmitting(false);
        }, 500);
      }}
    >
      {(props: FormikProps<UserLoginType>) => {
        const { values, touched, errors, handleBlur, handleChange, isSubmitting } = props;
        return (
          <Form>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Sign in to your account
                </h2>
              </div>

              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2">
                    <Field
                      className=" pl-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      name="email"
                      id="email"
                      value={values.email}
                      type="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                      Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <Field
                      className="pl-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      name="password"
                      id="password"
                      value={values.password}
                      type="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>
                <div className="mt-5">
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign in
                  </button>
                </div>

                <p className="mt-10 text-center text-sm text-gray-500">
                  Don't have an account <br />
                  <button onClick={() => navigate('/register')}>Sign Up</button>
                </p>
              </div>
            </div>
            ;
          </Form>
        );
      }}
    </Formik>
  );
};
