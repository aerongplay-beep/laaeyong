import { lazy } from 'react';
import Layout from './Layout.jsx';
import Home from './pages/Home.jsx';
import AdminLayout from './pages/admin/AdminLayout.jsx';

const Services = lazy(() => import('./pages/Services.jsx'));
const Founder = lazy(() => import('./pages/Founder.jsx'));
const Reservation = lazy(() => import('./pages/Reservation.jsx'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard.jsx'));
const ReservationList = lazy(() => import('./pages/admin/reservation/List.jsx'));
const ReservationDetail = lazy(() => import('./pages/admin/reservation/Detail.jsx'));
const AIFlowSettings = lazy(() => import('./pages/admin/AIFlowSettings.jsx'));

export const PAGES = {
  Home,
  Services,
  Founder,
  Reservation,
};
export const ADMINS = {
  Dashboard,
  'reservations': ReservationList,
  'reservations/:id': ReservationDetail,
  'ai-settings': AIFlowSettings,
};
export const PRIVATE_PAGES = {};
export const pagesConfig = {
  privatePages: PRIVATE_PAGES,
  mainPage: 'Home',
  Pages: PAGES,
  Layout: Layout,
  Admins: ADMINS,
  adminMainPage: 'Dashboard',
  AdminLayout: AdminLayout,
};