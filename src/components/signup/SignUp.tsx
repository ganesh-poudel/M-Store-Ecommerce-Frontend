import { Formik, Form, FormikProps, Field } from 'formik';
import { useNavigate } from 'react-router';
import { useState } from 'react';

import { useAddUserMutation } from '../../redux/users/userApi';
import { UserRegistrationType } from '../../redux/users/user';

const SignUp = () => {
  const navigate = useNavigate();
  const [userRegister] = useAddUserMutation();
  const [inputError, setInputError] = useState('');

  const userRegisterHandler = async (userData: UserRegistrationType, resetForm: Function) => {
    console.log('user data', userData);
    await userRegister(userData)
      .unwrap()
      .then((data) => {
        console.log('data', data);
        navigate('/products');
      })
      .catch((err) => {
        setInputError(err.data.message);
      });
  };

  return (
    <Formik
      initialValues={{
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        address: '',
        avatar: '',
      }}
      onSubmit={(values: UserRegistrationType, actions) => {
        userRegisterHandler(values, actions.resetForm);
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 500);
      }}
    >
      {(props: FormikProps<UserRegistrationType>) => {
        const { values, touched, errors, handleBlur, handleChange, isSubmitting } = props;
        return (
          <Form>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Become a member
                </h2>
              </div>

              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    First Name
                  </label>
                  <div className="mt-2">
                    <Field
                      className=" pl-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      name="firstname"
                      id="firstname"
                      value={values.firstname}
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Last Name
                  </label>
                  <div className="mt-2">
                    <Field
                      className=" pl-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      name="lastname"
                      id="lastname"
                      value={values.lastname}
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>

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
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="mt-2">
                    <Field
                      className=" pl-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      name="password"
                      id="password"
                      value={values.password}
                      type="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    User Name
                  </label>
                  <div className="mt-2">
                    <Field
                      className=" pl-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      name="username"
                      id="username"
                      value={values.username}
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Address
                  </label>
                  <div className="mt-2">
                    <Field
                      className=" pl-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      name="address"
                      id="address"
                      value={values.address}
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                      Avatar
                    </label>
                  </div>
                  <div className="mt-2">
                    <Field
                      className="pl-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      name="avatar"
                      id="avatar"
                      value={values.avatar}
                      type="text"
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
                    Register
                  </button>
                </div>
              </div>
            </div>
            ;
          </Form>
        );
      }}
    </Formik>
  );
};

export default SignUp;
