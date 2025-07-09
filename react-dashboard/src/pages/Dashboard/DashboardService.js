// src/pages/Dashboard/DashboardService.js
import axios from 'axios';

const BASE_URL = '/api';

const config = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`, // set properly if needed
    'Content-Type': 'application/json',
  },
};

export const getDashboardStats = () => {
  return axios.get(`${BASE_URL}/dashboard/dashboard-statistic`, config);
};

export const getHighestPurchaseOrder = () => {
  return axios.get(`${BASE_URL}/dashboard/highest-purchase-order`, config);
};

export const getPieChartData = () => {
  return axios.post(`${BASE_URL}/order/piechart-data`, {}, config);
};

export const getOrdersReport = () => {
  return axios.post(`${BASE_URL}/order/orders-report`, {}, config);
};

export const getUsersReport = () => {
  return axios.post(`${BASE_URL}/order/users-report`, {}, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
