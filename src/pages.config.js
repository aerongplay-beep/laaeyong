import Layout from './Layout.jsx';
import Home from './pages/Home.jsx';
import Services from './pages/Services.jsx';
import Founder from './pages/Founder.jsx';
import Reservation from './pages/Reservation.jsx';
import AdminLayout from './pages/admin/AdminLayout.jsx';
import Dashboard from './pages/admin/Dashboard.jsx';
import ReservationList from './pages/admin/reservation/List.jsx';
import ReservationDetail from './pages/admin/reservation/Detail.jsx';
import AIFlowSettings from './pages/admin/AIFlowSettings.jsx';
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