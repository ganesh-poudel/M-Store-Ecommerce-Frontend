import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { ProductType } from '../../redux/products/product';
import CartIcon from '../icons/CartIcon';
import HeartIcon from '../icons/HeartIcon';
import { addToCart } from '../../redux/cart/cartSlice';

const ProductCard = ({ product }: { product: ProductType }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addToCartHandler = (item: ProductType, quantity: number) => {
    console.log('item', item);
    dispatch(addToCart({ product, quantity }));
  };
  return (
    <div className="card w-80 bg-base-100 shadow-xl min-w-72 mt-10 mb-10 mr-10">
      <figure>
        <img src={product.images[0]} alt="Shoes" />
      </figure>

      <div className="card-body">
        <h2 className="card-title color font-mono text-green-800 ">{product.name}</h2>
        <p>{product.description}</p>
        <p className="text-orange-800  font-medium"> €{product.price}</p>
        <div className="flex gap-2">
          {product.sizes.map((size) => {
            return <div className="badge badge-accent badge-lg">{size}</div>;
          })}
        </div>
        <div className="card-actions justify-end">
          <button className="btn btn-error">
            <HeartIcon />
          </button>
          <button
            className="btn btn-accent"
            onClick={() => {
              addToCartHandler(product, 1);
            }}
          >
            <CartIcon />
          </button>
          <button className=" btn btn-warning" onClick={() => navigate(`/products/${product._id}`)}>
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
