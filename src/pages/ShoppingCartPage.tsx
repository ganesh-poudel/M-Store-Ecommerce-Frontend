import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import ShoppingCart from '../components/shoppingcart/ShoppingCart';
import { AppState } from '../redux/store';

const ShoppingCartPage = () => {
  const navigate = useNavigate();
  const isLogin = useSelector((state: AppState) => state.authReducer.isAuthenticated);
  if (!isLogin) {
    return (
      <div role="alert" className="ml-96 mt-40 w-1/2  alert alert-error">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-current shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </svg>
        <span>You are not Login.</span>
        <button className="btn btn-active btn-accent" onClick={() => navigate('/login')}>
          Click to Login
        </button>
      </div>
    );
  }
  return (
    <div>
      <ShoppingCart />
    </div>
  );
};

export default ShoppingCartPage;
