import React, { ChangeEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';

import { useGetSingleProductQuery, useUpdateProductMutation } from '../redux/products/product.api';
import { ProductType } from '../redux/products/product';

const UpdateProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const productId = id as string;
  const { data: product } = useGetSingleProductQuery(productId);
  const [updateProduct] = useUpdateProductMutation();
  const navigate = useNavigate();

  const [updatedProductData, setUpdatedProductData] = useState<ProductType>({
    _id: productId,
    name: '',
    price: 0,
    description: '',
    sizes: [],
    images: [],
    category: {
      _id: '',
      title: '',
      image: '',
      _v: 0,
    },
    createdAt: '',
    _v: 0,
  });

  useEffect(() => {
    if (product) {
      setUpdatedProductData(product);
    }
  }, [product]);

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUpdatedProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const sizeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.currentTarget.value;
    setUpdatedProductData({ ...updatedProductData, sizes: [newValue] });
  };

  const submitHandler = async (e: React.ChangeEvent<HTMLFormElement>) => {
    navigate('/admin');
    await updateProduct(updatedProductData);
  };

  console.log('update name', updatedProductData);

  return (
    <div>
      <div className="max-container py-[50px] animate-fade">
        <div className="max-w-[870px] mx-auto px-[20px] md:px-[90px] p-8 md:p-16 bg-palette-ebony border border-palette-accent rounded-xl">
          <h1 className="mb-5 text-2xl md:text-3xl font-medium capitalize text-color-primary border-b pb-4">
            Update Product Information
          </h1>

          <form className="pb-7 " onSubmit={submitHandler}>
            <div className="mb-6">
              <label htmlFor="title" className="block mb-2 font-medium text-color-primary">
                Name
              </label>
              <input
                className="form-input"
                type="text"
                id="name"
                name="name"
                value={updatedProductData.name}
                onChange={inputChangeHandler}
              />
            </div>
            <div className="mb-6">
              <label htmlFor="price" className="block mb-2 font-medium text-color-primary">
                Price
              </label>
              <input
                className="form-input"
                type="number"
                id="price"
                name="price"
                value={updatedProductData?.price}
                onChange={inputChangeHandler}
              />
            </div>

            <div className="flex-none   w-full ">
              <div className="my-5 ">Size</div>
              <div className="divider"></div>
              <select className="select select-warning w-full max-w-xs mb-10" onChange={sizeHandler}>
                <option disabled selected value="Pick Size">
                  Pick a size
                </option>
                <option value="S">Small</option>
                <option value="M">Medium</option>
                <option value="L">Large</option>
              </select>
            </div>
            <div className="mb-6">
              <label htmlFor="description" className="block mb-2 font-medium text-color-primary">
                Description
              </label>
              <textarea
                className="form-input min-h-[150px] max-h-[300px] w-full"
                required
                id="description"
                name="description"
                minLength={20}
                maxLength={550}
                value={updatedProductData?.description}
                onChange={inputChangeHandler}
              />
            </div>
            <button className="btn btn-warning" type="submit">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProductPage;
