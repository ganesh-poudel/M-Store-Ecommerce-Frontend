import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router';
import { Field, FieldArray, FieldProps, Form, Formik, FormikProps } from 'formik';
import { toast } from 'react-toastify';

import {
  useAddSingleProductMutation,
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from '../../redux/products/product.api';
import { CreateProductType, ProductType, Size } from '../../redux/products/product';
import { Button, Pagination } from '@mui/material';
import { usePagination } from '../../hooks/UsePagination';
import { useGetAllCategoryQuery } from '../../redux/category/categoryApi';

export const ProductList = () => {
  const [showModal, setShowModal] = useState(false);
  let [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { data: products } = useGetAllProductsQuery();
  console.log('products', products);
  const [deleteItem] = useDeleteProductMutation();
  const [addProduct] = useAddSingleProductMutation();
  const { data: allCategory } = useGetAllCategoryQuery();
  const PER_PAGE = 10;
  const totalPages = Math.ceil(products?.products.length ?? 0 / PER_PAGE);
  const _DATA = usePagination({ data: products?.products ?? [], itemsPerPage: PER_PAGE });
  const notify = () => toast('Product successfully added');

  const handleChange = (event: React.ChangeEvent<unknown>, pageCurrent: number) => {
    setPage(pageCurrent);
    _DATA.jump(pageCurrent);
  };

  const addProductHandler = async (data: CreateProductType, resetForm: Function) => {
    try {
      await addProduct(data);
      resetForm({});
      navigate('/admin');
      alert('Product created');
    } catch (error) {
      console.error('rejected', error);
    }
  };

  return (
    <div className="w-2/3 justify-center flex flex-col ml-72 ">
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="btn btn-ghost text-xl">Product List</div>
        </div>
        <div className="navbar-center hidden lg:flex"></div>
        <div className="navbar-end">
          <button
            className="bg-yellow-500 text-black active:bg-blue-500 font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
            type="button"
            onClick={() => setShowModal(true)}
          >
            Add Product
          </button>
          {showModal ? (
            <>
              <div className=" bg-gray-400 flex justify-center  items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-1/2 my-6 mx-auto max-w-3xl">
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                      <h3 className="text-3xl font=semibold">Product Info</h3>
                      <button
                        className="bg-transparent border-0 text-black float-right"
                        onClick={() => setShowModal(false)}
                      >
                        <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                          x
                        </span>
                      </button>
                    </div>
                    <div className="relative p-6 flex-auto">
                      <Formik
                        initialValues={{
                          name: '',
                          price: 0,
                          description: '',
                          category: '',
                          images: [''],
                          sizes: [] as Size[],
                        }}
                        onSubmit={(values: CreateProductType, actions) => {
                          addProductHandler(values, actions.resetForm);
                          setTimeout(() => {
                            // alert(JSON.stringify(values, null, 2));
                            actions.setSubmitting(false);
                            notify();
                          }, 500);
                        }}
                      >
                        {(props: FormikProps<CreateProductType>) => {
                          const { values, touched, errors, handleBlur, handleChange, isSubmitting } = props;
                          return (
                            <Form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                              <Grid container spacing={2} justifyContent="center">
                                <label className="block text-black text-sm font-bold mb-1">Name</label>
                                <input
                                  name="name"
                                  id="name"
                                  type="text"
                                  value={values.name}
                                  onChange={handleChange}
                                  className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                                />

                                <label className="block text-black text-sm font-bold mb-1">Price</label>
                                <input
                                  name="price"
                                  id="price"
                                  type="number"
                                  value={values.price}
                                  onChange={handleChange}
                                  className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                                />

                                <label className="block text-black text-sm font-bold mb-1">Description</label>
                                <textarea
                                  name="description"
                                  id="description"
                                  value={values.description}
                                  onChange={handleChange}
                                  className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                                />

                                <div className="flex item-center w-full gap-4 bg-green-300 px-10  mb-5">
                                  <div className="my-5 ml-32">Category</div>

                                  <Field
                                    name="category"
                                    render={({ field }: FieldProps) => (
                                      <select {...field} className="select select-warning w-full max-w-xs  mt-3">
                                        {allCategory &&
                                          allCategory.map((category) => (
                                            <option key={category._id} className="form-control" value={category._id}>
                                              {category.title}
                                            </option>
                                          ))}
                                      </select>
                                    )}
                                  />
                                </div>

                                <div className="flex flex-col justify-center w-full gap-4 bg-slate-400 px-10 mb-5 ">
                                  <div className="">Add Images</div>
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
                                              <button onClick={() => remove(index)} className="btn btn-error">
                                                Remove
                                              </button>
                                            </Box>
                                          ))}
                                          <Button onClick={() => push('')}>ADD LINK</Button>
                                        </>
                                      );
                                    }}
                                  </FieldArray>
                                </div>

                                <div className="flex-none mb-5">
                                  <div id="checkbox-group">Sizes</div>
                                  <div role="group" aria-labelledby="checkbox-group" className=" flex gap-5">
                                    <label>
                                      <Field type="checkbox" name="sizes" value="S" />
                                      small
                                    </label>
                                    <label>
                                      <Field type="checkbox" name="sizes" value="M" />
                                      medium
                                    </label>
                                    <label>
                                      <Field type="checkbox" name="sizes" value="L" />
                                      large
                                    </label>
                                  </div>
                                </div>
                              </Grid>
                              <Grid item lg={10} md={10} sm={10} xs={10}>
                                <Button
                                  type="submit"
                                  variant="contained"
                                  color="secondary"
                                  disabled={isSubmitting}
                                  sx={{ width: '26rem', height: '4rem' }}
                                >
                                  Submit
                                </Button>
                              </Grid>
                            </Form>
                          );
                        }}
                      </Formik>
                    </div>
                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
      <ul className="divide-y divide-gray-300">
        {_DATA.currentData().map((item: ProductType) => {
          return (
            <li key={item._id} className="flex justify-between gap-x-6 py-5">
              <div className="flex w-1/2 gap-x-4">
                <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={item.images[0]} alt="" />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">{item.name}</p>
                  <p className="mt-1 truncate text-xs leading-5 text-red-500">{item.category.title}</p>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col ">
                <button
                  className="btn btn-active btn-error"
                  onClick={() => {
                    alert(`Do you want to delete ${item.name}`);
                    deleteItem(item._id);
                  }}
                >
                  Delete
                </button>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <button
                  className="btn btn-active btn-accent"
                  onClick={() => navigate(`/admin/update-product/${item._id}`)}
                >
                  Update
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <Pagination
        count={totalPages}
        size="large"
        page={page}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
      />
    </div>
  );
};
