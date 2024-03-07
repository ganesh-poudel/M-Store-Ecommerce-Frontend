import { Grid, TextField, Button, Typography } from "@mui/material";
import { Formik, Form, FormikProps } from "formik";
import { validationSchema } from "../../schemas/LoginSchema";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { UserLoginResponseType, UserLoginType } from "../../redux/auth/auth";
import { useLazyUserSessionQuery, useLoginMutation, useUserSessionQuery } from "../../redux/auth/authApi";
import { useEffect, useState } from "react";
import { isFetchBaseQueryError } from "../../utils/loginHelper";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../redux/store";
import { logout, saveLoginToken, setUser } from "../../redux/auth/authSlice";

export const Login = () => {
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const [inputError, setInputError] = useState("");
  const [isData, setIsData] = useState(true);
  const dispatch = useDispatch();
  const currentUserInfo = useSelector((state:AppState) => state.authReducer.user);
  const accessToken = useSelector((state: AppState) => state.authReducer.accessToken);
  const [getUser, { data: user }] = useLazyUserSessionQuery();

  const userLoginHandler = async (credients: UserLoginType, resetForm: Function) => {
    await login(credients)
      .unwrap()
      .then((data) => {
        const { access_token } = data;
        dispatch(saveLoginToken(access_token));
        getUser()
          .unwrap()
          .then((data) => {
            dispatch(setUser(data));
          });
        navigate('/products')
      })
      .catch((err) => {
        setInputError(err.data.message);
      });
  };

  if (accessToken) {
    return (
      <div>
        <div>
          welcome {currentUserInfo?.name}
          <p>{currentUserInfo?.role}</p>
          <p>{currentUserInfo?.email}</p>
          <p>{currentUserInfo?.password}</p>
          <button>Admin panel</button>
        </div>
      </div>
    );
  }

  // https://www.zeldadungeon.net/wiki/Link#/media/File:Link_-_TotK_key_art_nobg.png
  return (
    <div>
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
                <Typography variant="h4">Login</Typography>
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
