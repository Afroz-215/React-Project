import api from '../../services/axiosInstance';
import { StatusCodes } from 'http-status-codes';


export const DASHBOARD_STATS = '/dashboard/dashboard-statistic';
export const DASHBOARD_HIGHEST_PURCHASE = '/dashboard/highest-purchase-order';
export const ORDER_PIE_CHART = '/order/piechart-data';
export const ORDER_REPORT = '/order/orders-report';
export const USER_REPORT = '/order/users-report';


const success = (status) =>
  [StatusCodes.OK, StatusCodes.CREATED, StatusCodes.ACCEPTED].includes(status);


export const getDashboardStats = async () => {
  const res = await api.get(DASHBOARD_STATS);
  if (success(res.status)) return res.data;
  throw new Error(res.data?.message || 'Failed to load dashboard stats');
};

export const getHighestPurchaseOrder = async () => {
  const res = await api.get(DASHBOARD_HIGHEST_PURCHASE);
  if (success(res.status)) return res.data;
  throw new Error(res.data?.message || 'Failed to load highest purchase order');
};

export const getPieChartData = async () => {
  const res = await api.post(ORDER_PIE_CHART);
  if (success(res.status)) return res.data;
  throw new Error(res.data?.message || 'Failed to load pie‑chart data');
};

export const getOrdersReport = async () => {
  const res = await api.post(ORDER_REPORT);
  if (success(res.status)) return res.data;
  throw new Error(res.data?.message || 'Failed to load orders report');
};

export const getUsersReport = async () => {
  const res = await api.post(USER_REPORT);
  if (success(res.status)) return res.data;
  throw new Error(res.data?.message || 'Failed to load users report');
};
