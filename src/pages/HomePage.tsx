import React from 'react'
import { useNavigate } from 'react-router';

const HomePage = () => {
  const navigate = useNavigate()
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Hello there !!! </h1>
          <p className="font-bold text-xl font-sans text-green-600">Welcome to M-store</p>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In
            deleniti eaque aut repudiandae et a id nisi.
          </p>
          <button
            className="btn btn-accent"
            onClick={() => {
              navigate('/products');
            }}
          >
            Shopping{' '}
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage