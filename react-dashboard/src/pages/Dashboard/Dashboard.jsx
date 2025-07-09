// src/pages/Dashboard/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { getDashboardStats, getHighestPurchaseOrder, getPieChartData, getOrdersReport, getUsersReport } from './DashboardService';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';



const Dashboard = () => {
  const [stats, setStats] = useState({});
  const [highestOrder, setHighestOrder] = useState(null);
  const [pieData, setPieData] = useState([]);
  const [ordersReport, setOrdersReport] = useState([]);
  const [usersReport, setUsersReport] = useState([]);

  useEffect(() => {
    fetchAllDashboardData();
  }, []);

  const fetchAllDashboardData = async () => {
    try {
      const [statRes, highestOrderRes, pieRes, ordersRes, usersRes] = await Promise.all([
        getDashboardStats(),
        getHighestPurchaseOrder(),
        getPieChartData(),
        getOrdersReport(),
        getUsersReport(),
      ]);

      setStats(statRes?.data || {});
      setHighestOrder(highestOrderRes?.data || {});
      setPieData(pieRes?.data || []);
      setOrdersReport(ordersRes?.data || []);
      setUsersReport(usersRes?.data || []);
    } catch (err) {
      console.error('Dashboard load error:', err);
    }
  };

  return (
    <div className="p-4">
      <h2>Dashboard</h2>

      {/* Stats Section */}
      <div className="grid grid-cols-4 gap-4 my-4">
        <div className="bg-blue-100 p-4 rounded">Users: {stats.totalUsers || 0}</div>
        <div className="bg-green-100 p-4 rounded">Orders: {stats.totalOrders || 0}</div>
        <div className="bg-yellow-100 p-4 rounded">Revenue: ₹{stats.totalRevenue || 0}</div>
        <div className="bg-red-100 p-4 rounded">Products: {stats.totalProducts || 0}</div>
      </div>

      {/* Highest Purchase */}
      <div className="bg-white p-4 shadow rounded mb-4">
        <h3>Highest Purchase Order</h3>
        {highestOrder ? (
          <pre>{JSON.stringify(highestOrder, null, 2)}</pre>
        ) : (
          <p>No data available</p>
        )}
      </div>

      {/* Pie Chart */}
      <div className="bg-white p-4 shadow rounded mb-4">
        <h3>Orders by Category (Pie Chart)</h3>
        {pieData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                dataKey="count"
                data={pieData}
                nameKey="category_name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={['#8884d8', '#82ca9d', '#ffc658', '#ff8042'][index % 4]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p>No pie chart data found</p>
        )}
      </div>

      {/* Orders Report Table */}
<div className="bg-white p-4 shadow rounded mb-4">
  <h3>Orders Report</h3>
  {ordersReport.length > 0 ? (
    <div className="table-responsive">
      <table className="table table-bordered table-striped">
        <thead className="table-light">
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Total</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {ordersReport.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.user?.name || 'N/A'}</td>
              <td>₹{order.total_price}</td>
              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <p>No orders found</p>
  )}
</div>

{/* Users Report Table */}
<div className="bg-white p-4 shadow rounded mb-4">
  <h3>Users Report</h3>
  {usersReport.length > 0 ? (
    <div className="table-responsive">
      <table className="table table-bordered table-striped">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Order Count</th>
          </tr>
        </thead>
        <tbody>
          {usersReport.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone || 'N/A'}</td>
              <td>{user.orderCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <p>No users found</p>
  )}
</div>



    </div>
  );
};

export default Dashboard;
