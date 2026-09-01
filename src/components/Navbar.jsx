import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from '@/components/Logo';
const LINKS = [
  { to: '/', label: '홈' },
  { to: '/Services', label: '서비스' },
  { to: '/Founder', label: '대표자' },
  { to: '/Reservation', label: '예약' },
];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);
  const isActive = (to) => (to === '/' ? location.pathname === '/' : location.pathname === to);
  return (
    <header
      className={`sticky top-0 z-40 w-full bg-[#FDFBF0]/90 backdrop-blur-md border-b transition-all ${
        scrolled ? 'border-[#556B2F]/15 shadow-sm py-1' : 'border-transparent py-2'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
        <Link to="/" className="flex items-center">
          <Logo iconClassName="text-[#556B2F]" textClassName="text-lg text-[#3E4A20]" />
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                isActive(l.to)
                  ? 'bg-[#556B2F]/10 text-[#556B2F]'
                  : 'text-[#3E4A20]/80 hover:text-[#556B2F] hover:bg-[#556B2F]/5'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <button
            onClick={() => navigate('/Reservation')}
            className="ml-2 bg-[#556B2F] text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-[#47591f] active:scale-95 transition-all shadow-sm"
          >
            가정 방문 예약하기
          </button>
        </nav>
        <button
          className="md:hidden p-2 text-[#3E4A20]"
          onClick={() => setOpen((v) => !v)}
          aria-label="메뉴 열기"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-[#556B2F]/10 bg-[#FDFBF0]">
          <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
            {LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`px-4 py-3 rounded-xl text-base font-semibold ${
                  isActive(l.to) ? 'bg-[#556B2F]/10 text-[#556B2F]' : 'text-[#3E4A20]'
                }`}
              >
                {l.label}
              </Link>
            ))}
            <button
              onClick={() => navigate('/Reservation')}
              className="mt-2 bg-[#556B2F] text-white px-5 py-3 rounded-xl text-base font-bold hover:bg-[#47591f] transition-colors"
            >
              가정 방문 예약하기
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}