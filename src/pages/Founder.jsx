import { useNavigate } from 'react-router-dom';
import { GraduationCap, Award, Heart } from 'lucide-react';
import FadeIn from '@/components/FadeIn';
const TIMELINE = [
  { year: '1996', text: '교구회사 부모교육·교사교육·놀이교수법 개발' },
  { year: '2002', text: '시니어 미술놀이치료 활동으로 시장상 수상' },
  { year: '2020', text: '육아종합지원센터 근무' },
  { year: '2022', text: '국공립어린이집 근무' },
  { year: '2025', text: '병원 직장어린이집 근무' },
];
const DEGREES = ['유아교육 학부', '아동상담코칭 석사', '상담코칭 박사과정'];
export default function Founder() {
  const navigate = useNavigate();
  return (
    <div>
      <section className="w-full bg-[#FDFBF0] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 md:pt-16 pb-14 md:pb-20">
          <FadeIn className="text-center mb-10">
            <span className="inline-flex items-center gap-2 bg-[#F5C518] text-[#3E4A20] px-4 py-1.5 rounded-full text-sm font-bold">
              <Heart className="w-4 h-4" /> 대표자 소개
            </span>
            <h1 className="mt-5 text-3xl md:text-5xl font-extrabold text-[#3E4A20]">놀이연구소를 만든 사람</h1>
          </FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            <FadeIn className="lg:col-span-2">
              <div className="bg-white rounded-3xl p-6 border border-[#556B2F]/10 shadow-sm">
                <img
                  src="https://cdn.vibe-x.app/apps/566ba164a6283b2c82b4d9db/assets/original/people-1-104469.png"
                  alt="대표 · 아동발달 전문가"
                  className="w-full aspect-square object-cover rounded-2xl"
                />
                <div className="mt-5 flex flex-wrap gap-2">
                  {DEGREES.map((d) => (
                    <span key={d} className="inline-flex items-center gap-1.5 bg-[#556B2F]/10 text-[#556B2F] px-3 py-1.5 rounded-full text-sm font-semibold">
                      <GraduationCap className="w-4 h-4" /> {d}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.1} className="lg:col-span-3">
              <div className="bg-[#556B2F] text-white rounded-3xl p-7 md:p-10">
                <p className="text-2xl md:text-4xl font-extrabold leading-snug">
                  “엄마가 행복해야<br />아이도 행복하다”
                </p>
                <p className="mt-6 text-white/85 leading-relaxed text-lg">
                  1996년부터 놀이를 통해 아이와 부모를 만나온 현장 경험과, 유아교육·아동상담코칭에서 쌓아온 이론이 함께 담긴 서비스입니다.
                </p>
                <p className="mt-4 text-white/85 leading-relaxed">
                  놀잇감을 새로 사는 것이 아니라 지금 있는 것을 아이의 발달과 흥미에 맞게 다시 살리는 데 오랜 시간 마음을 쏟아왔습니다. 아이가 잘 놀 수 있는 환경을 만들고, 부모님이 그 이후에도 스스로 놀이를 이어갈 수 있도록 돕는 것을 가장 소중히 여깁니다.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
      <section className="w-full bg-[#F4F5EC] overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <FadeIn className="flex items-center gap-3 mb-8">
            <div className="w-11 h-11 rounded-full bg-[#F5C518] flex items-center justify-center">
              <Award className="w-5 h-5 text-[#3E4A20]" />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#3E4A20]">경력 타임라인</h2>
          </FadeIn>
          <div className="bg-white rounded-3xl p-7 md:p-10 border border-[#556B2F]/10 shadow-sm">
            <ul className="space-y-6">
              {TIMELINE.map((t, i) => (
                <FadeIn key={i} delay={i * 0.06}>
                  <li className="flex gap-5">
                    <div className="flex flex-col items-center">
                      <span className="w-3.5 h-3.5 rounded-full bg-[#F5C518] ring-4 ring-[#F5C518]/30" />
                      {i < TIMELINE.length - 1 && <span className="flex-1 w-0.5 bg-[#556B2F]/15 mt-1" />}
                    </div>
                    <div className="pb-2">
                      <span className="text-xl font-extrabold text-[#556B2F]">{t.year}</span>
                      <p className="mt-1 text-[#3E4A20]/85 leading-relaxed text-lg">{t.text}</p>
                    </div>
                  </li>
                </FadeIn>
              ))}
            </ul>
          </div>
          <FadeIn className="mt-10 text-center">
            <button
              onClick={() => navigate('/Reservation')}
              className="bg-[#556B2F] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#47591f] active:scale-95 transition-all shadow-md"
            >
              가정 방문 예약하기
            </button>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}