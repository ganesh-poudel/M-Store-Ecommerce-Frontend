import { ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { debounce } from 'lodash';

import {
  useFilterByTitleQuery,
  useGetAllProductsQuery,
  useLazyGetProductByFilterQuery,
} from '../redux/products/product.api';
import { AppState } from '../redux/store';
import { useGetAllCategoryQuery } from '../redux/category/categoryApi';
import ProductCard from '../components/card/ProductCard';
import { Filter, Size } from '../redux/products/product';

const ProductsPage = () => {
  const [inputError, setInputError] = useState('');
  console.log('input error', inputError);
  const [requestData, setRequestData] = useState<Partial<Filter>>({
    category: '',
    min_price: 0,
    max_price: Infinity,
    size: '',
  });

  const searchProduct = useSelector((state: AppState) => state.productReducer.searchString);
  let { data: products } = useGetAllProductsQuery();
  const { data: allCategory } = useGetAllCategoryQuery();

  const { data: searchProductbyName } = useFilterByTitleQuery(searchProduct);
  const [getFilteredData, { data: filteredProduct }] = useLazyGetProductByFilterQuery();
  console.log('filtered data ...', filteredProduct);

  if (searchProduct !== '') {
    products = searchProductbyName;
  }
  if (filteredProduct !== undefined) {
    products = filteredProduct;
  }

  const categoryHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.currentTarget.value;
    setRequestData({ ...requestData, category: newValue });
  };

  const sizeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const newValue: Size = event.currentTarget.value as Size;
    setRequestData({ ...requestData, size: newValue });
  };

  const priceHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRequestData((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  const resetHandler = async () => {
    console.log('reset');
    setRequestData({
      category: '',
      min_price: 0,
      max_price: Infinity,
      size: '',
    });

    await getFilteredData(requestData);
  };

  const debouncePriceHandler = debounce(priceHandler, 500);

  const searchHandler = async () => {
    console.log('abc', requestData);
    await getFilteredData(requestData)
      .unwrap()
      .then((data) => {})
      .catch((err) => {
        alert('Product not found');
        setInputError(err.data.message);
      });
  };

  console.log('data...', products);

  return (
    <div className="flex flex-col  lg:flex-row w-full min-h-full ">
      <div className=" place-items-center w-96 fixed shadow-inner ">
        <div className="flex flex-col ">
          <div className="flex-none   w-full  bg-green-300 px-10">
            <div className="my-5 ml-32">Category</div>
            <div className="divider"></div>
            <select className="select select-warning w-full max-w-xs mb-10" onChange={categoryHandler}>
              <option disabled selected>
                Pick a category
              </option>
              {allCategory?.map((category) => {
                return (
                  <option className="form-control" key={category._id} value={category._id}>
                    {category.title}
                  </option>
                );
              })}
              <option></option>
            </select>
          </div>

          <div className="flex-none my-1  w-full  bg-red-200 px-10 pb-10">
            <div className="my-5 ml-32">Price</div>
            <div className="divider"></div>
            <div className="mb-2">
              <div className="flex gap-32 ml-1 mb-4">
                <div>Min price</div>
                <div>Max price</div>
              </div>
              <div className="flex gap-20">
                <input
                  type="number"
                  id="min_price"
                  placeholder=" min price"
                  className="input input-bordered w-1/2 max-w-xs"
                  onChange={debouncePriceHandler}
                />
                <input
                  type="number"
                  id="max_price"
                  placeholder="max price"
                  className="input input-bordered w-1/2 max-w-xs"
                  onChange={debouncePriceHandler}
                />
              </div>
            </div>
          </div>
          <div className="flex-none   w-full  bg-yellow-100 px-10">
            <div className="my-5 ml-32">Size</div>
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
          <div className=" flex gap-4 justify-center w-full  bg-red-100 px-10">
            <button className="btn btn-success" onClick={searchHandler}>
              Search
            </button>
            <button className="btn btn-warning" onClick={resetHandler}>
              Reset
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-grow w-full h-full bg-slate-300 box place-items-center justify-end">
        <div>
          <div className="grid sm:grid-cols-1 gap-10 md:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-3">
            {products?.products?.map((product) => {
              return <ProductCard product={product} key={product._id} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
