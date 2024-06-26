import { useNavigate } from 'react-router';
import { debounce } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

import { searchProduct } from '../../redux/products/productSlice';
import Heart from '../icons/HeartIcon';
import CartIcon from '../icons/CartIcon';
import { AppState } from '../../redux/store';
import LoginIcon from '../../assets/user-interface.png';
import { logout } from '../../redux/auth/authSlice';
import { resetCart } from '../../redux/cart/cartSlice';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authData = useSelector((state: AppState) => state.authReducer);
  const data = useSelector((state: AppState) => state.cartReducer.shoppingList);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(searchProduct(e.target.value));
  };

  const debouncedHandleSearch = debounce(onChange, 1000);

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(resetCart());
    navigate('/login');
  };

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
        <li></li>
        <button>Contact</button>
        <li>
          <button>About</button>
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
        </div>
        <div className="dropdown dropdown-end mx-4">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <button className="indicator" onClick={() => navigate('shoppingcart')}>
              <CartIcon />
              <span className="badge badge-sm indicator-item">{data.length}</span>
            </button>
          </div>
        </div>
        {authData.isAuthenticated ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar ">
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={authData.user?.avatar} />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <button className="btn" onClick={() => navigate('/users/profile')}>
                  profile
                </button>
              </li>
              <li>
                <button className="btn" onClick={() => navigate('/users/orders')}>
                  Orders
                </button>
              </li>

              {authData.user?.role === 'admin' && (
                <li>
                  <button className="btn" onClick={() => navigate('admin')}>
                    DashBoard
                  </button>
                </li>
              )}
              <li>
                <button className="btn" onClick={logoutHandler}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="w-9 rounded-full" onClick={() => navigate('login')}>
            <img alt="Tailwind CSS Navbar component" src={LoginIcon} />
          </div>
        )}
      </div>
    </div>
  );
};
export default Header;
