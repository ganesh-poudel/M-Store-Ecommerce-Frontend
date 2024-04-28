import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Moment from 'react-moment';
import axios from 'axios';

import { Order } from '../redux/order/Order';
import { AppState } from '../redux/store';

const OrderPage = () => {
  const token = useSelector((state: AppState) => state.authReducer.accessToken);
  const [orderData, setOrderData] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/orders', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrderData(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, [token]);

  if (orderData.length === 0) {
    return <div className="ml-96 mt-20 text-4xl text-orange-800">You Dont Have Any Orders</div>;
  }

  return (
    <div className="card w-1/2 bg-base-100 shadow-xl ml-96 flex flex-col gap-3 mt-10">
      {orderData.map((order, index) => {
        return (
          <div className="card-body bg-slate-200 rounded">
            <h2 className="card-title">{`Order Number ${index + 1}`}</h2>
            <h2 className="card-title">
              Order Date <Moment>{order.createdAt}</Moment>
            </h2>
            {order.items.map((i) => {
              return (
                <div className="flex">
                  <p>{i.product.name}</p>
                  <p>{i.quantity}</p>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default OrderPage;
