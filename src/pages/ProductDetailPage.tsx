import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useGetSingleProductQuery } from '../redux/products/product.api';
import CartIcon from '../components/icons/CartIcon';
import { ProductType } from '../redux/products/product';
import { addToCart } from '../redux/cart/cartSlice';

const ProductDetailPage = () => {
  const [value, setValue] = useState(1);
  const dispatch = useDispatch();

  const { id } = useParams();

  if (id !== undefined) {
  }
  const { data } = useGetSingleProductQuery(id as string);

  const decrement = () => {
    if (value > 1) {
      setValue(value - 1);
    }
  };

  const increment = () => {
    setValue(value + 1);
  };

  const addToCartHandler = (item: ProductType, quantity: number) => {
    console.log('item', item);
    dispatch(addToCart({ product: item, quantity }));
  };

  return (
    <div className=" flex-grow h-96 card rounded-box place-items-center mt-24 w-2/3 mx-auto bg-zinc-400">
      <div className="flex flex-col w-full lg:flex-row">
        <div className="grid flex-grow h-96 card  rounded-box  w-1/2 place-items-center ml-10 mt-3">
          <div className="carousel w-full">
            {data?.images.map((image, index) => {
              let id = `item${index + 1}`;
              return (
                <div id={id} className="carousel-item w-full h-72  ">
                  <img src={image} alt={data.name} />
                </div>
              );
            })}
          </div>
          <div className="flex justify-center w-full py-2 gap-2">
            {data?.images.map((image, index) => {
              let id = `#item${index + 1}`;
              return (
                <a href={id} className="btn btn-xs">
                  {index + 1}
                </a>
              );
            })}
          </div>
        </div>
        <div className="grid flex-grow h-96 card w-1/2 rounded-box place-items-top-center ">
          <div className="sm:flex-1 p-3 md:p-5 text-color-primary sm:self-start">
            <h1 className="text-xl md:text-2xl font-medium pb-4 mb-5 border-b ">{data?.name}</h1>
            <span className="text-xl font-bold block mb-5">
              <span className="text-sm">As low as</span> € {data?.price}
            </span>
            <p className="tracking-wider mb-8">{data?.description}</p>
            <button>Add to cart</button>
            <div className="custom-number-input h-10 w-32">
              <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                <button
                  data-action="decrement"
                  className="bg-red-500 text-gray-600 hover:text-gray-700 hover:bg-lime-600 h-full w-20 rounded-l cursor-pointer outline-none"
                  onClick={decrement}
                >
                  <span className="m-auto text-2xl font-thin">−</span>
                </button>
                <input
                  type="number"
                  className=" focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
                  name="custom-input-number"
                  value={value}
                ></input>
                <button
                  data-action="increment"
                  className="bg-red-500 text-gray-600 hover:text-gray-700 hover:bg-lime-600 h-full w-20 rounded-r cursor-pointer"
                  onClick={increment}
                >
                  <span className="m-auto text-2xl font-thin">+</span>
                </button>
              </div>
              <div className="mt-3 round bg-red">
                <button
                  className="btn btn-active btn-accent hover:bg-violet-600"
                  onClick={() => {
                    addToCartHandler(data as ProductType, value);
                  }}
                >
                  <CartIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
