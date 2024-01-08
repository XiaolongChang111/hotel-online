import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import http from '../http'; 
import { toast } from 'react-toastify';

const OrderDetail = () => {
  const [order, setOrder] = useState(null);
  const { orderId } = useParams();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await http.get(`/api/orders/${orderId}`);
        setOrder(response.data);
      } catch (error) {
        toast.error('Error fetching order details');
      }
    };

    fetchOrder();
  }, [orderId]);

  if (!order) {
    return <div>Loading order details...</div>;
  }

  return (
    <div className="container my-5">
      <div className="card mb-3">
        <div className="card-header">
          <h5 className="mb-0">Order Details</h5>  
        </div>

        <div className="card-body">
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>Room ID:</strong> {order.room.roomId}</p>
          <p><strong>User Name:</strong> {order.user.username}</p>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Customers</h5>
        </div>
        
        <div className="card-body">
          {order.customers.map(customer => (
            <div key={customer.id} className="mb-3">
              <p><strong>Name:</strong> {customer.name}</p>
              <p><strong>Birthday:</strong> {new Date(customer.birthday).toLocaleDateString()}</p>
              <p><strong>Phone:</strong> {customer.phone}</p>
              <p><strong>Gender:</strong> {customer.gender}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
