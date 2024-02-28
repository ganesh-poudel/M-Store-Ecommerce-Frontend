import { Grid, TextField, Button, Typography } from "@mui/material";
import { Formik, Form, FormikProps } from "formik";
import { validationSchema } from "../../schemas/LoginSchema";
import { useAddUserMutation, useGetAllUsersQuery } from "../../redux/users/userApi";
import { UserRegistrationType } from "../../redux/users/user";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserLoginType } from "../../redux/auth/auth";
import { useLoginMutation } from "../../redux/auth/authApi";
import { useState } from "react";
import { isFetchBaseQueryError } from "../../utils/loginHelper";

export const Login = () => {
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const userLoginHandler = async (data: UserLoginType, resetForm: Function) => {
    try {
      const payLoad = await login(data).unwrap();
      console.log("payload =>", payLoad);
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        console.log(error.status);
        setError(error.status.toString());
      }
      console.log("error =>", error);
    }
  };

  return (
    <div>
      <div>{error}</div>
      <Formik
        initialValues={{
          email: "",
          password: "",
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
            <Form style={{ marginTop: "50px" }}>
              <Grid item lg={10} md={10} sm={10} xs={10}>
                <Typography variant="h5">Welcome Back</Typography>
                <Typography>Enter your credentials for login</Typography>
              </Grid>
              <Grid item lg={10} md={10} sm={10} xs={10}>
                <TextField
                  name="email"
                  id="email"
                  label="Email-id"
                  value={values.email}
                  type="email"
                  helperText={errors.email && touched.email ? errors.email : "Enter email-id"}
                  error={errors.email && touched.email ? true : false}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={{ width: "26rem" }}
                />
              </Grid>
              <Grid item lg={10} md={10} sm={10} xs={10}>
                <TextField
                  name="password"
                  id="password"
                  label="Password"
                  value={values.password}
                  type="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={{ width: "26rem" }}
                />
                <Grid item lg={10} md={10} sm={10} xs={10}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    disabled={isSubmitting}
                    sx={{ width: "26rem", height: "4rem", mt: "1.5rem" }}
                  >
                    Login
                  </Button>
                </Grid>
                <Grid item lg={10} md={10} sm={10} xs={10} mt="40px">
                  <Typography>
                    Don't have an account <br />
                    <Link to="/registration">Sign Up</Link>
                  </Typography>
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
