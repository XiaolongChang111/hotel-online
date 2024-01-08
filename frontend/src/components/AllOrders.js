import React, { useState, useEffect } from 'react';
import http from '../http'; 
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await http.get(`/api/orders`);
        setOrders(response.data);
      } catch (error) {
        toast.error('Error fetching orders');
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container my-5">
      <h2>Your Orders</h2>
      {orders.length > 0 ? (
        <ul>
          {orders.map((order, index) => (
            <li key={index}>
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Room ID:</strong> {order.room.roomId}</p>
              <p>
                <button className="btn btn-primary" onClick={() => navigate(`/customer/order/${order._id}`)}>
                    View Order Details
                </button>
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default AllOrders;
