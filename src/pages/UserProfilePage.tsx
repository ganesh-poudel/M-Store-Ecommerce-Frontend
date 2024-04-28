import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { AppState } from '../redux/store';

const UserProfilePage = () => {
   const navigate = useNavigate();
  const currentUser = useSelector((state: AppState) => state.authReducer.user);
  return (
    <div className="flex  mt-48 justify-center">
      <div className=" card card-side bg-base-100 shadow-xl  justify-center">
        <figure>
          <img src={currentUser?.avatar} alt={currentUser?.avatar} />
        </figure>
        <div className="card-body">
          <div className="card-body items-center text-center">
            <h2 className="card-title">Hello this is {currentUser?.firstname}</h2>
            <div>{currentUser?.firstname}</div>
            <div>{currentUser?.lastname}</div>
            <div>{currentUser?.email}</div>
            <div>{currentUser?.username}</div>
            <div>{currentUser?.address}</div>
            <div>{currentUser?.role}</div>
            <div className="card-actions mt-48">
              <button className="btn btn-primary" onClick={()=>navigate("/products")}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
