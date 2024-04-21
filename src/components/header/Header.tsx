import { useNavigate } from 'react-router';
import { searchProduct } from '../../redux/products/productSlice';
import { debounce } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import Heart from '../icons/HeartIcon';
import CartIcon from '../icons/CartIcon';
import { AppState } from '../../redux/store';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state: AppState) => state.cartReducer.shoppingList);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('input', e.target.value);
    dispatch(searchProduct(e.target.value));
  };

  const debouncedHandleSearch = debounce(onChange, 1000);

  return (
    <div className="navbar bg-teal-400 sticky top-0 z-40 border-b-2">
      <div className="flex-1">
        <button className="btn btn-ghost text-xl" onClick={() => navigate('')}>
          M-STORE
        </button>
      </div>
      <ul className="menu menu-horizontal lg:menu-horizontal flex-1 text-xl">
        <li>
          <button onClick={() => navigate('products')}>Product</button>
        </li>
        <li>
          <a>Contact</a>
        </li>
        <li>
          <a>About</a>
        </li>
      </ul>
      <div className="flex-none">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
            onChange={debouncedHandleSearch}
          />
        </div>
        <div className="dropdown dropdown-end ml-3">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <Heart />
              <span className="badge badge-sm indicator-item">0</span>
            </div>
          </div>
          <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
            <div className="card-body">
              <span className="font-bold text-lg">8 Items</span>
              <span className="text-info">Subtotal: $999</span>
              <div className="card-actions">
                <button className="btn btn-primary btn-block">View cart</button>
              </div>
            </div>
          </div>
        </div>
        <div className="dropdown dropdown-end mx-4">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <button className="indicator" onClick={() => navigate('shoppingcart')}>
              <CartIcon />
              <span className="badge badge-sm indicator-item">{data.length}</span>
            </button>
          </div>
          {/* <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
            <div className="card-body">
              <span className="font-bold text-lg">{data.length} items </span>
              <span className="text-info">Subtotal: $999</span>
              <div className="card-actions">
                <button className="btn btn-primary btn-block" onClick={() => navigate('shoppingcart')}>
                  View cart
                </button>
              </div>
            </div>
          </div> */}
        </div>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Header;
