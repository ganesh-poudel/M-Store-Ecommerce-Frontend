import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import { styled } from "@mui/material/styles";
import { ToastContainer, toast } from "react-toastify";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Formik, FormikProps, Form, FieldArray, Field } from "formik";
import { UserRegistrationType } from "../../redux/users/user";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { useAddSingleProductMutation, useGetAllProductsQuery } from "../../redux/products/product.api";
import { useDispatch } from "react-redux";
import { CreateProductType } from "../../redux/products/product";
import { WidgetsTwoTone } from "@mui/icons-material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const CreateProductModal = () => {
  // const { data: userList } = useGetAllProductsQuery();
  // console.log(userList);
 
  // console.log(JSON.parse(images))
  const [addProduct] = useAddSingleProductMutation();
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const notify = () => toast("Product successfully added");

  const addProductHandler = async (data: CreateProductType, resetForm: Function) => {
    try {
      await addProduct(data);
      resetForm({});
      navigate("/admin");
    } catch (error) {
      console.error("rejected", error);
    }
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="center">
        <AddCircleIcon sx={{color:"red"}} />
        <Button onClick={handleOpen}>ADD NEW PRODUCT</Button>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" ml="50px">
            ADD NEW PRODUCT
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Formik
              initialValues={{
                title: "",
                price: 0,
                description: "",
                categoryId: 0,
                images: [""],
              }}
              onSubmit={(values: CreateProductType, actions) => {
                addProductHandler(values, actions.resetForm);
                setTimeout(() => {
                  actions.setSubmitting(false);
                  notify();
                }, 500);
              }}
            >
              {(props: FormikProps<CreateProductType>) => {
                const { values, touched, errors, handleBlur, handleChange, isSubmitting } = props;
                return (
                  <Form style={{ marginTop: "50px" }}>
                    <Grid container spacing={2} justifyContent="center">
                      <Grid item lg={10} md={10} sm={10} xs={10}>
                        <TextField
                          name="title"
                          id="title"
                          label="Title"
                          value={values.title}
                          type="text"
                          // helperText={errors.name && touched.name ? errors.name : "Enter your full name."}
                          // error={errors.name && touched.name ? true : false}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          sx={{ width: "26rem" }}
                        />
                      </Grid>
                      <Grid item lg={10} md={10} sm={10} xs={10}>
                        <TextField
                          name="price"
                          id="price"
                          label="Price"
                          value={values.price}
                          type="number"
                          // helperText={errors.email && touched.email ? errors.email : "Enter email-id"}
                          // error={errors.email && touched.email ? true : false}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          sx={{ width: "26rem" }}
                        />
                      </Grid>
                      <Grid item lg={10} md={10} sm={10} xs={10}>
                        <TextField
                          name="description"
                          id="description"
                          label="Description"
                          value={values.description}
                          type="text"
                          // helperText={
                          //   errors.password && touched.password
                          //     ? "Please valid password. One uppercase, one lowercase, one special character and no spaces"
                          //     : "One uppercase, one lowercase, one special character and no spaces"
                          // }
                          // error={errors.password && touched.password ? true : false}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          sx={{ width: "26rem" }}
                          multiline
                          rows={5}
                        />
                      </Grid>

                      <Grid item lg={10} md={10} sm={10} xs={10}>
                        <TextField
                          name="categoryId"
                          id="categoryId"
                          label="CategoryId"
                          value={values.categoryId}
                          type="number"
                          // helperText={errors.avatar && touched.avatar ? errors.avatar : "Provide avatar link"}
                          // error={errors.avatar && touched.avatar ? true : false}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          sx={{ width: "26rem" }}
                        />
                      </Grid>

                      {/* <Grid item lg={10} md={10} sm={10} xs={10}>
                        <TextField
                          name="images[0]"
                          id="images"
                          label="Links for Images"
                          value={values.images[0]}
                          type="text"
                          // helperText={errors.avatar && touched.avatar ? errors.avatar : "Provide avatar link"}
                          // error={errors.avatar && touched.avatar ? true : false}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          sx={{ width: "26rem" }}
                        />
                        <TextField
                          name="images[1]"
                          id="images"
                          label="Links for Images"
                          value={values.images[1]}
                          type="text"
                          // helperText={errors.avatar && touched.avatar ? errors.avatar : "Provide avatar link"}
                          // error={errors.avatar && touched.avatar ? true : false}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          sx={{ width: "26rem" }}
                        />
                        <TextField
                          name="images[2]"
                          id="images"
                          label="Links for Images"
                          value={values.images[2]}
                          type="text"
                          // helperText={errors.avatar && touched.avatar ? errors.avatar : "Provide avatar link"}
                          // error={errors.avatar && touched.avatar ? true : false}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          sx={{ width: "26rem" }}
                        />
                      </Grid> */}
                      <Grid item lg={10} md={10} sm={10} xs={10}>
                        <Typography>ADD PRODUCT IMAGES</Typography>
                        <FieldArray name="images">
                          {({ push, remove, form }) => {
                            console.log(form);
                            const { values } = form;
                            const { images } = values;
                            return (
                              <>
                                {images.map((item: string, index: number) => (
                                  <Box display="flex" alignItems="center" gap={2} key={index}>
                                    <Field name={`images[${index}]`} />
                                    <RemoveCircleIcon onClick={() => remove(index)} />
                                  </Box>
                                ))}
                                <Button onClick={() => push("")}>ADD LINK</Button>
                              </>
                            );
                          }}
                        </FieldArray>
                      </Grid>
                      {/* <FieldArray name="images">
                        {({ push, remove, form }) => {
                          console.log(form);
                          return (
                            <Grid>
                              <Grid display="flex" gap={1}>
                                <Typography>Images Links</Typography>
                              </Grid>
                              {form.values.images.map((ele:string, index:number) => (
                                <Grid display="flex" alignItems="center">
                                  <TextField name={`images.${index}`} sx={{ width: "100%" }} />
                                  <RemoveCircleIcon onClick={() => remove(index)} />
                                </Grid>
                              ))}
                              <Button onClick={() => push("adcgd")}>ADD LINK</Button>
                            </Grid>
                          );
                        }}
                      </FieldArray> */}
                      {/* <FieldArray name="phNumbers">
                        {(fieldArrayProps) => {
                          const { push, remove, form } = fieldArrayProps;
                          const { values } = form;
                          const { phNumbers } = values;
                          // console.log('fieldArrayProps', fieldArrayProps)
                          // console.log('Form errors', form.errors)
                          return (
                            <div>
                              {phNumbers.map((phNumber: string, index: number) => (
                                <div key={index}>
                                  <TextField name={`phNumbers[${index}]`} />
                                  {index > 0 && (
                                    <button type="button" onClick={() => remove(index)}>
                                      -
                                    </button>
                                  )}
                                </div>
                              ))}
                              <button type="button" onClick={() => push("")}>
                                +
                              </button>
                            </div>
                          );
                        }}
                      </FieldArray> */}
                    </Grid>
                    <Grid item lg={10} md={10} sm={10} xs={10}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        disabled={isSubmitting}
                        sx={{ width: "26rem", height: "4rem" }}
                      >
                        Submit
                      </Button>
                    </Grid>
                  </Form>
                );
              }}
            </Formik>
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
};
