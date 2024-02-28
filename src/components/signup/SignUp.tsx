
import { Grid, TextField, Button } from "@mui/material";
import { Formik, Form, FormikProps } from "formik";
import { validationSchema } from "../../schemas/signUpSchema";
import { useAddUserMutation, useGetAllUsersQuery } from "../../redux/users/userApi";
import { UserRegistrationType } from "../../redux/users/user";
import { useNavigate } from "react-router";


const SignUp = () => {

  const { data: userList } = useGetAllUsersQuery();
  const [addUser] = useAddUserMutation();
  const navigate = useNavigate()

  const addUserHandler = async (data: UserRegistrationType, resetForm: Function) => {
    const isUserExist = userList?.some((ele) => ele.email === data.email);
    if (!isUserExist) {
      try {
        const payload = await addUser(data).unwrap();
        console.log("fulfilled", payload);
        resetForm({});
        navigate("/login")
      } catch (error) {
        console.error("rejected", error);
      }
    } else {
      alert("user already exist");
    }
  };

  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          password: "",
          email: "",
          avatar: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values: UserRegistrationType, actions) => {
          // createNewUser(values, actions.resetForm);
          addUserHandler(values, actions.resetForm);
          setTimeout(() => {
            actions.setSubmitting(false);
            console.log("hello");
          }, 500);
        }}
      >
        {(props: FormikProps<UserRegistrationType>) => {
          const { values, touched, errors, handleBlur, handleChange, isSubmitting } = props;
          return (
            <Form style={{ marginTop: "50px" }}>
              <h1>Sign up</h1>
              <Grid container spacing={2} justifyContent="center">
                <Grid item lg={10} md={10} sm={10} xs={10}>
                  <TextField
                    name="name"
                    id="name"
                    label="Full Name"
                    value={values.name}
                    type="text"
                    helperText={errors.name && touched.name ? errors.name : "Enter your full name."}
                    error={errors.name && touched.name ? true : false}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    sx={{ width: "26rem" }}
                  />
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
                    helperText={
                      errors.password && touched.password
                        ? "Please valid password. One uppercase, one lowercase, one special character and no spaces"
                        : "One uppercase, one lowercase, one special character and no spaces"
                    }
                    error={errors.password && touched.password ? true : false}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    sx={{ width: "26rem" }}
                  />
                </Grid>

                <Grid item lg={10} md={10} sm={10} xs={10}>
                  <TextField
                    name="avatar"
                    id="avatar"
                    label="Link for avatar"
                    value={values.avatar}
                    type="text"
                    helperText={errors.avatar && touched.avatar ? errors.avatar : "Provide avatar link"}
                    error={errors.avatar && touched.avatar ? true : false}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    sx={{ width: "26rem" }}
                  />
                </Grid>

                <Grid item lg={10} md={10} sm={10} xs={10}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    disabled={isSubmitting}
                    sx={{ width: "26rem", height:"4rem" }}
                  >
                    Submit
                  </Button>
                  {/* {displayFormStatus && (
                    <div className="formStatus">
                      {formStatus.type === "error" ? (
                        <p>{formStatus.message}</p>
                      ) : formStatus.type === "success" ? (
                        <p>{formStatus.message}</p>
                      ) : null}
                    </div>
                  )} */}
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default SignUp;
