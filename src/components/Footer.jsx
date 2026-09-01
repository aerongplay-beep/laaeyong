import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import Logo from '@/components/Logo';
export default function Footer() {
  return (
    <footer className="w-full bg-[#3E4A20] text-white/85">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="flex flex-col md:flex-row md:justify-between gap-8">
          <div className="max-w-sm">
            <Logo iconClassName="text-[#FDFBF0]" textClassName="text-lg text-white" />
            <p className="mt-4 text-sm leading-relaxed text-white/70 md:block hidden">
              가정방문 영유아 놀이환경 진단 및 맞춤형 놀이양육코칭 서비스. 지금 집에 있는 놀잇감을 우리 아이 발달에 맞게 다시 살려드립니다.
            </p>
            <p className="mt-3 text-sm text-white/70 md:hidden">
              가정방문 영유아 놀이양육코칭 서비스
            </p>
          </div>
          <div className="hidden md:flex gap-12">
            <div>
              <h4 className="text-white font-bold text-sm mb-3">바로가기</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="hover:text-white transition-colors">홈</Link></li>
                <li><Link to="/Services" className="hover:text-white transition-colors">서비스 소개</Link></li>
                <li><Link to="/Founder" className="hover:text-white transition-colors">대표자 소개</Link></li>
                <li><Link to="/Reservation" className="hover:text-white transition-colors">가정 방문 예약</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-sm mb-3">문의</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> 예약 폼으로 접수</li>
                <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> hello@noriyeonguso.kr</li>
                <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> 수도권 및 인근 지역 방문</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/60">© 2026 놀이연구소. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-white/50 hidden sm:inline">문의: 예약 폼 · hello@noriyeonguso.kr</span>
            <Link to="/admin/login" className="text-xs text-white/40 hover:text-white/70 transition-colors">관리자</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}