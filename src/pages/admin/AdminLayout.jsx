import { useEffect, useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { BarChart, Calendar, Settings, LogOut } from 'lucide-react';
import { vibex } from '@/api/vibexClient';
const NAV = [
  { to: '/admin', label: '대시보드', icon: BarChart, exact: true },
  { to: '/admin/reservations', label: '예약 관리', icon: Calendar },
  { to: '/admin/ai-settings', label: 'AI 상담 설정', icon: Settings },
];
export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/admin/login', { replace: true });
      return;
    }
    (async () => {
      try {
        const res = await vibex.auth.me();
        const me = res?.data;
        const isAdminAccount = me?.type === 'admin' || (me?.type == null && me?.role === 'admin');
        if (!isAdminAccount) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('user');
          navigate('/admin/login', { replace: true });
          return;
        }
        setUser(me);
        setIsAuthenticated(true);
      } catch {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        navigate('/admin/login', { replace: true });
      } finally {
        setLoading(false);
      }
    })();
  }, [navigate]);
  const handleLogout = () => {
    try {
      vibex.auth.logout();
    } catch {
      /* noop */
    }
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    navigate('/admin/login', { replace: true });
  };
  if (loading || !isAuthenticated) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#FDFBF0]">
        <div className="w-8 h-8 border-4 border-[#556B2F]/20 border-t-[#556B2F] rounded-full animate-spin" />
      </div>
    );
  }
  const isActive = (item) =>
    item.exact ? location.pathname === '/admin' : location.pathname.startsWith(item.to);
  return (
    <div className="flex h-screen bg-[#F4F5EC]">
      <aside className="w-64 border-r border-[#556B2F]/10 bg-white flex flex-col flex-shrink-0">
        <div className="h-16 flex items-center px-5 border-b border-[#556B2F]/10">
          <img
            src="https://cdn.vibe-x.app/apps/566ba164a6283b2c82b4d9db/assets/original/logo-0-104469.png"
            alt="Play Reset"
            className="h-8 w-auto object-contain"
          />
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                isActive(item)
                  ? 'bg-[#556B2F] text-white'
                  : 'text-[#3E4A20]/80 hover:bg-[#556B2F]/10'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-[#556B2F]/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-[#3E4A20]/80 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut className="w-5 h-5" /> 로그아웃
          </button>
        </div>
      </aside>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-[#556B2F]/10 bg-white flex items-center justify-between px-6 flex-shrink-0">
          <h1 className="font-bold text-[#3E4A20]">Play Reset 관리자</h1>
          <div className="flex items-center gap-3">
            {user?.avatar && (
              <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full bg-[#556B2F]/10" />
            )}
            <span className="text-sm text-[#3E4A20]/80">{user?.name || '관리자'} 님</span>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-5 md:p-7">
          <Outlet />
        </main>
      </div>
    </div>
  );
}