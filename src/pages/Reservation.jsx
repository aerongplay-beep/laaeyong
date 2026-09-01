import { Calendar, Phone, MapPin, Clock } from 'lucide-react';
import FadeIn from '@/components/FadeIn';
import ReservationForm from '@/components/ReservationForm';
const GUIDE = [
  { icon: Phone, title: '예약 접수', text: '입력하신 연락처로 방문 일정을 확인해 안내드립니다.' },
  { icon: MapPin, title: '방문 지역', text: '수도권 및 인근 지역을 중심으로 방문 일정을 조율합니다.' },
  { icon: Clock, title: '준비 사항', text: '특별히 정리해 두실 필요가 없습니다. 평소 모습 그대로 보여주세요.' },
];
export default function Reservation() {
  return (
    <div>
      <section className="w-full bg-[#F4F5EC] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 md:pt-16 pb-12 md:pb-16 text-center">
          <FadeIn>
            <span className="inline-flex items-center gap-2 bg-[#F5C518] text-[#3E4A20] px-4 py-1.5 rounded-full text-sm font-bold">
              <Calendar className="w-4 h-4" /> 가정 방문 예약
            </span>
            <h1 className="mt-5 text-3xl md:text-5xl font-extrabold text-[#3E4A20] leading-tight">
              지금 가정 방문을 예약하고<br className="hidden sm:block" /> 상담받아보세요
            </h1>
            <p className="mt-5 text-lg text-[#3E4A20]/75 leading-relaxed max-w-2xl mx-auto">
              첫 방문에서 아이방과 놀잇감을 함께 살펴보는 것부터 시작합니다.
            </p>
          </FadeIn>
        </div>
      </section>
      <section className="w-full bg-[#FDFBF0] overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 grid grid-cols-1 lg:grid-cols-5 gap-8">
          <FadeIn className="lg:col-span-2">
            <div className="space-y-4">
              {GUIDE.map((g, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 border border-[#556B2F]/10 shadow-sm flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-[#556B2F] flex items-center justify-center flex-shrink-0">
                    <g.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#3E4A20]">{g.title}</h3>
                    <p className="mt-1 text-sm text-[#3E4A20]/70 leading-relaxed">{g.text}</p>
                  </div>
                </div>
              ))}
              <div className="bg-[#F5C518] rounded-2xl p-5 text-[#3E4A20]">
                <p className="font-bold">예약 폼 입력 항목</p>
                <p className="mt-1 text-sm text-[#3E4A20]/75 leading-relaxed">
                  보호자 이름 · 연락처 · 아이 나이 · 방문 희망 지역 · 방문 희망 날짜·시간대 · 문의사항(선택)
                </p>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.1} className="lg:col-span-3">
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#556B2F]/10 shadow-lg">
              <h2 className="text-xl font-extrabold text-[#3E4A20] mb-5">방문 예약 신청</h2>
              <ReservationForm />
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}