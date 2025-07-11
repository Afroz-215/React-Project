import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = 'https://e-commerce-gg46.onrender.com/api';

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = JSON.parse(localStorage.getItem('user'))?.token;

  const authHeader = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const fetchAllOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${BASE_URL}/order/listOfOrder`, {}, authHeader);
      setOrders(res?.data?.data || []);
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const viewOrderDetails = async (orderId) => {
    try {
      const res = await axios.get(`${BASE_URL}/order/viewOrder/${orderId}`, authHeader);
      setSelectedOrder(res?.data?.data || null);
    } catch (err) {
      console.error('Error viewing order:', err);
    }
  };

  const cancelOrder = async (orderId) => {
    const confirm = window.confirm('Are you sure you want to cancel this order?');
    if (!confirm) return;

    try {
      await axios.put(`${BASE_URL}/order/cancelOrder/${orderId}`, {}, authHeader);
      alert('Order cancelled successfully');
      fetchAllOrders();
    } catch (err) {
      console.error('Error cancelling order:', err);
      alert('Failed to cancel order');
    }
  };

  return (
    <div className="p-4">
      <h2>All Orders</h2>
      {loading ? (
        <p>Loading...</p>
      ) : orders.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="table-light">
              <tr>
                <th>Order ID</th>
                <th>User</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user?.name || 'N/A'}</td>
                  <td>₹{order.total_price}</td>
                  <td>{order.order_status}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-info me-2"
                      onClick={() => viewOrderDetails(order._id)}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => cancelOrder(order._id)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {selectedOrder && (
            <div className="mt-4 p-3 border bg-light">
              <h4>Order Details</h4>
              <pre>{JSON.stringify(selectedOrder, null, 2)}</pre>
            </div>
          )}
        </div>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default AllOrders;
