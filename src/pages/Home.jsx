import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Heart,
  Package,
  Clock,
  Star,
  Check,
  ChevronDown,
  Home as HomeIcon,
  Search,
  BookOpen,
  Users,
  Award,
  GraduationCap,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';
import FadeIn from '@/components/FadeIn';
import ReservationForm from '@/components/ReservationForm';
const PROBLEMS = [
  { icon: Package, text: '장난감은 계속 쌓이는데, 아이는 늘 새 장난감만 찾아요' },
  { icon: HomeIcon, text: '정리해도 금방 다시 어질러지고, 어떻게 정리해야 할지 모르겠어요' },
  { icon: Search, text: '지금 우리 아이 나이에 어떤 놀이가 필요한지 잘 모르겠어요' },
  { icon: Clock, text: '일하면서 아이와 놀아줄 시간을 따로 내기가 쉽지 않아요' },
];
const STEPS = [
  {
    no: '01',
    img: 'https://cdn.vibe-x.app/apps/566ba164a6283b2c82b4d9db/assets/original/service-1-104469.png',
    title: '가정 방문',
    desc: '방문을 예약하시면, 약속한 날짜에 선생님이 직접 댁으로 찾아갑니다.',
  },
  {
    no: '02',
    img: 'https://cdn.vibe-x.app/apps/566ba164a6283b2c82b4d9db/assets/original/service-2-104469.png',
    title: '놀이환경 진단',
    desc: '아이가 실제로 놀고 생활하는 방을 함께 둘러보며, 잘 가지고 노는 것과 손이 안 가는 것을 함께 확인합니다.',
  },
  {
    no: '03',
    img: null,
    title: '발달 맞춤 정리',
    desc: '아이의 발달 단계에 맞게 놀잇감을 분류하고, 꺼내기 쉽고 다시 정리하기도 쉬운 방식으로 공간을 정리합니다.',
  },
  {
    no: '04',
    img: null,
    title: '놀이 코칭',
    desc: '정리된 놀잇감을 활용해 집에서 바로 실천할 수 있는 놀이 방법을 부모님께 직접 코칭해드립니다.',
  },
];
const SUB_SERVICES = [
  {
    img: 'https://cdn.vibe-x.app/apps/566ba164a6283b2c82b4d9db/assets/original/service-3-104469.png',
    title: '아동발달상담',
    desc: '놀이코칭을 받다 보면 "우리 아이가 또래보다 말이 늦은 것 같아요" 같은 궁금증이 생길 수 있습니다. 이럴 때는 아동발달상담으로 이어서, 연령별 발달 특성에 맞는 놀이와 놀잇감을 더 자세히 안내받을 수 있습니다.',
  },
  {
    img: 'https://cdn.vibe-x.app/apps/566ba164a6283b2c82b4d9db/assets/original/service-4-104469.png',
    title: '부모양육코칭',
    desc: '놀이 방법뿐 아니라 "아이와 대화가 잘 안 통해요" 같은 양육 고민이 있다면, 부모양육코칭을 통해 부모-자녀 상호작용과 양육 방법을 함께 살펴볼 수 있습니다.',
  },
];
const RECOMMEND = [
  '아이 방에 놀잇감은 많은데 어떻게 활용해야 할지 모르는 부모',
  '아이 발달에 맞는 놀이 방법을 찾고 있는 부모',
  '일과 육아를 병행하며 아이와 놀아줄 시간을 따로 내기 어려운 부모',
  '새 놀잇감 구매보다 지금 있는 것을 더 잘 활용하고 싶은 부모',
  '영유아부터 초등 저학년 자녀를 둔 가정',
];
const EXCEPTIONS = [
  {
    text: '아이의 발달 지연이 의심되어 전문적인 발달검사나 의료적 진단이 먼저 필요한 경우',
    guide: '전문 의료기관·발달센터 이용 권장',
  },
  {
    text: '정서·행동 문제로 심리치료나 전문 상담이 필요한 경우',
    guide: '전문 상담기관 이용 권장',
  },
  {
    text: '아이 놀이와 무관하게 공간 인테리어나 일반 수납 정리만 필요한 경우',
    guide: '일반 정리수납 서비스가 더 적합할 수 있음',
  },
];
const STATS = [
  { num: '45.5%', label: '장난감·도서 대여 서비스 이용 경험', link: '놀잇감 관련 서비스 실제 수요', hi: false },
  { num: '44.2%', label: '놀이체험프로그램 이용 경험', link: '메인 서비스(놀이코칭)와 연결', hi: false },
  { num: '31.9%', label: '영유아 발달검사·상담 이용 경험', link: '서브 서비스(아동발달상담)와 연결', hi: false },
  { num: '4.0점↑', label: '관련 육아지원서비스 평균 도움 정도 (5점 만점)', link: '만족도 지표', hi: true },
  { num: '64.2%', label: '영유아 가정 어머니 취업률', link: '문제 제기 섹션과 연결', hi: false },
];
const TIMELINE = [
  { year: '1996', text: '교구회사 부모교육·교사교육·놀이교수법 개발' },
  { year: '2002', text: '시니어 미술놀이치료 활동으로 시장상 수상' },
  { year: '2020', text: '육아종합지원센터 근무' },
  { year: '2022', text: '국공립어린이집 근무' },
  { year: '2025', text: '병원 직장어린이집 근무' },
];
const DEGREES = ['유아교육 학부', '아동상담코칭 석사', '상담코칭 박사과정'];
const FAQS = [
  {
    q: '어떤 서비스인가요?',
    a: '전문가가 가정을 방문해 아이의 연령과 발달 특성, 현재 가지고 있는 놀잇감과 놀이환경을 살펴보고, 놀잇감을 정리·분류한 뒤 우리 아이에게 맞는 활용법과 놀이방법을 부모에게 코칭하는 서비스입니다.',
  },
  {
    q: '단순히 아이방을 정리해주는 서비스인가요?',
    a: '아닙니다. 깔끔하게 정리하는 것보다 아이가 잘 놀 수 있는 환경을 만드는 것에 초점을 둡니다. 현재 가지고 있는 놀잇감을 점검하고 아이의 발달과 흥미에 맞게 재구성하며, 부모가 이후에도 활용할 수 있도록 놀이방법을 함께 안내합니다.',
  },
  {
    q: '새로운 놀잇감이나 교구를 구입해야 하나요?',
    a: '꼭 그렇지 않습니다. 새로운 제품을 구매하기보다 현재 가지고 있는 놀잇감을 충분히 활용하는 것을 우선합니다. 필요한 경우에만 아이의 발달과 놀이 특성을 고려해 추가 놀잇감을 제안합니다.',
    kw: '유아교구, 유아장난감추천',
  },
  {
    q: '우리 아이 나이에 맞는 놀이·놀잇감인지 어떻게 확인할 수 있나요?',
    a: '방문 시 아이의 연령과 발달 특성을 기준으로 지금 가지고 있는 놀잇감이 적합한지 함께 살펴보고, 활용법을 바꾸면 좋은 것과 새로 필요한 것을 구분해드립니다.',
    kw: '3세·4세·5세·돌아기 등 연령별 장난감',
  },
  {
    q: '어떤 연령의 아이가 이용할 수 있나요?',
    a: '영유아부터 초등 저학년까지 이용할 수 있으며, 아이의 연령과 발달단계에 따라 놀이환경과 코칭 방법을 다르게 구성합니다.',
  },
  {
    q: '아동발달센터나 아동심리상담센터와는 무엇이 다른가요?',
    a: '저희는 아이의 발달을 진단·검사하는 기관이 아니라, 가정을 방문해 지금 있는 놀잇감과 놀이환경을 발달 단계에 맞게 점검·정리하고 부모님께 놀이방법을 코칭해드리는 서비스입니다. 전문적인 발달검사나 의료적 평가가 필요한 경우에는 적절한 전문기관 이용을 안내해드립니다.',
    kw: '아동발달센터, 아동심리상담센터, 아동상담',
  },
  {
    q: '오감놀이나 미술놀이 같은 구체적인 놀이 방법도 알려주시나요?',
    a: '네. 아이의 관심사와 발달 특성에 맞으면 오감놀이, 미술놀이 등 다양한 놀이 방법 중 집에 있는 놀잇감으로 실천할 수 있는 방법을 안내합니다.',
    kw: '오감놀이, 미술놀이, 유아미술놀이',
  },
  {
    q: '놀이코칭 외에 감정코칭이나 양육 상담도 받을 수 있나요?',
    a: '네. 기본 서비스에서 발견된 고민에 따라 부모-자녀 상호작용, 감정코칭, 양육 고민 상담 등 부모양육코칭으로 이어서 받으실 수 있습니다.',
    kw: '감정코칭, 부모상담, 양육코칭',
  },
  {
    q: '방문 전 무엇을 준비해야 하나요?',
    a: '특별히 정리해 두실 필요가 없습니다. 평소 아이가 사용하는 놀이공간과 놀잇감을 그대로 보여주시는 것이 오히려 현재의 놀이환경을 파악하는 데 도움이 됩니다.',
  },
  {
    q: '다른 정리수납 서비스와 무엇이 다른가요?',
    a: '일반적인 수납이나 공간정리가 목적이 아니라 아이의 발달과 놀이를 중심으로 공간과 놀잇감을 바라본다는 점이 가장 큰 차이입니다. 정리에서 끝나지 않고 놀잇감 활용법과 부모의 놀이방법까지 연결합니다.',
  },
];
export default function Home() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(0);
  const scrollToReserve = () => {
    const el = document.getElementById('reserve');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <div>
      {/* HERO — split-half */}
      <section className="w-full bg-[#FDFBF0] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12 pb-14 md:pb-20 flex flex-col md:flex-row items-center gap-10 md:gap-14">
          <div className="w-full md:w-1/2 text-center md:text-left">
            <FadeIn>
              <span className="inline-flex items-center gap-2 bg-[#F5C518] text-[#3E4A20] px-4 py-1.5 rounded-full text-sm font-bold">
                <Heart className="w-4 h-4" /> Play Reset · 플레이리셋
              </span>
            </FadeIn>
            <FadeIn delay={0.05}>
              <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-[#3E4A20]">
                집에 있는 놀잇감,<br />
                <span className="text-[#556B2F]">우리 아이 발달에 맞게</span><br />
                다시 정리해드립니다
              </h1>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mt-6 text-lg leading-relaxed text-[#3E4A20]/75 max-w-xl mx-auto md:mx-0">
                가정방문 영유아 놀이환경 진단 및 맞춤형 놀이양육코칭 서비스입니다.
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="mt-8 flex flex-col sm:flex-row items-center md:items-start gap-3">
                <button
                  onClick={() => navigate('/Reservation')}
                  className="bg-[#556B2F] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#47591f] active:scale-95 transition-all shadow-md w-full sm:w-auto"
                >
                  가정 방문 예약하기
                </button>
                <button
                  onClick={() => navigate('/Services')}
                  className="bg-transparent text-[#556B2F] px-8 py-4 rounded-xl font-bold text-lg border-2 border-[#556B2F] hover:bg-[#556B2F] hover:text-white transition-colors w-full sm:w-auto"
                >
                  서비스 알아보기
                </button>
              </div>
            </FadeIn>
          </div>
          <div className="w-full md:w-1/2">
            <FadeIn delay={0.1} y={30}>
              <div className="relative">
                <div className="absolute -top-6 -right-4 w-28 h-28 bg-[#F5C518]/40 rounded-full blur-2xl" />
                <img
                  src="https://cdn.vibe-x.app/apps/566ba164a6283b2c82b4d9db/assets/original/hero-1-104469.png"
                  alt="따뜻한 가정 놀이환경"
                  className="relative w-full rounded-3xl shadow-xl object-cover aspect-[4/3] border border-[#556B2F]/10"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
      {/* PROBLEM */}
      <section className="w-full bg-[#F4F5EC] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <FadeIn className="text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#3E4A20]">이런 고민, 있으신가요?</h2>
            <p className="mt-3 text-[#3E4A20]/60">많은 부모님이 비슷한 마음으로 저희를 찾아오세요.</p>
          </FadeIn>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {PROBLEMS.map((p, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="bg-white rounded-3xl p-6 md:p-7 border border-[#556B2F]/10 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all flex items-start gap-4 h-full">
                  <div className="w-12 h-12 rounded-full bg-[#F5C518] flex items-center justify-center flex-shrink-0">
                    <p.icon className="w-6 h-6 text-[#3E4A20]" />
                  </div>
                  <p className="text-lg font-medium text-[#3E4A20] leading-relaxed pt-1.5">{p.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.1}>
            <div className="mt-8 bg-[#F5C518] rounded-3xl p-7 md:p-9 text-center">
              <p className="text-[#3E4A20]/80 font-medium">영유아 가정 어머니 취업률</p>
              <p className="mt-1 text-4xl md:text-5xl font-extrabold text-[#3E4A20]">64.2%</p>
              <p className="mt-2 text-sm text-[#3E4A20]/70">
                (2021년 54.1% → 2024년) · 교육부, 2024년 전국보육실태조사
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
      {/* SERVICES */}
      <section className="w-full bg-[#FDFBF0] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <FadeIn className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#3E4A20]">Play Reset이 도와드립니다</h2>
            <p className="mt-5 text-lg leading-relaxed text-[#3E4A20]/75">
              놀잇감을 새로 사드리지 않습니다. 지금 집에 있는 놀잇감을 우리 아이 발달에 맞게 다시 살려드립니다.
            </p>
          </FadeIn>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {STEPS.map((s, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="bg-white rounded-3xl overflow-hidden border border-[#556B2F]/10 shadow-sm hover:shadow-lg transition-shadow h-full">
                  {s.img && (
                    <div className="overflow-hidden aspect-[16/9]">
                      <img src={s.img} alt={s.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                  <div className="p-6 md:p-7">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-extrabold text-[#F5C518]">{s.no}</span>
                      <h3 className="text-xl font-bold text-[#3E4A20]">{s.title}</h3>
                    </div>
                    <p className="mt-3 text-[#3E4A20]/75 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn className="mt-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-full bg-[#556B2F] flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl font-extrabold text-[#3E4A20]">이어서 받을 수 있는 서브 서비스</h3>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SUB_SERVICES.map((s, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="bg-[#F4F5EC] rounded-3xl overflow-hidden border border-[#556B2F]/10 h-full">
                  <div className="overflow-hidden aspect-[16/9]">
                    <img src={s.img} alt={s.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6 md:p-7">
                    <h4 className="text-lg font-bold text-[#556B2F]">{s.title}</h4>
                    <p className="mt-3 text-[#3E4A20]/75 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
      {/* RECOMMENDATION / EXCEPTION */}
      <section className="w-full bg-[#F4F5EC] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <FadeIn>
            <div className="bg-white rounded-3xl p-7 md:p-9 border border-[#556B2F]/10 shadow-sm h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-full bg-[#F5C518] flex items-center justify-center">
                  <Check className="w-6 h-6 text-[#3E4A20]" />
                </div>
                <h3 className="text-xl md:text-2xl font-extrabold text-[#3E4A20]">이런 분께 추천합니다</h3>
              </div>
              <ul className="space-y-3">
                {RECOMMEND.map((r, i) => (
                  <li key={i} className="flex items-start gap-3 text-[#3E4A20]/85">
                    <Check className="w-5 h-5 text-[#556B2F] flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="bg-[#3E4A20] text-white rounded-3xl p-7 md:p-9 shadow-sm h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-full bg-[#F5C518] flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-[#3E4A20]" />
                </div>
                <h3 className="text-xl md:text-2xl font-extrabold">다른 도움이 먼저 필요할 수 있어요</h3>
              </div>
              <ul className="space-y-5">
                {EXCEPTIONS.map((e, i) => (
                  <li key={i} className="border-b border-white/10 pb-4 last:border-0 last:pb-0">
                    <p className="text-white/90 leading-relaxed">{e.text}</p>
                    <p className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-[#F5C518]">
                      <ArrowRight className="w-4 h-4" /> {e.guide}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </section>
      {/* EVIDENCE */}
      <section className="w-full bg-[#FDFBF0] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <FadeIn className="text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#3E4A20]">왜 필요한가요?</h2>
            <p className="mt-3 text-[#3E4A20]/60">모든 통계는 출처와 발표일을 함께 표기합니다.</p>
          </FadeIn>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {STATS.map((s, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div
                  className={`rounded-3xl p-7 border h-full ${
                    s.hi
                      ? 'bg-[#F5C518] border-[#F5C518]'
                      : 'bg-white border-[#556B2F]/10 shadow-sm'
                  }`}
                >
                  <p className={`text-4xl font-extrabold ${s.hi ? 'text-[#3E4A20]' : 'text-[#556B2F]'}`}>{s.num}</p>
                  <p className="mt-3 font-semibold text-[#3E4A20] leading-snug">{s.label}</p>
                  <p className={`mt-3 text-sm ${s.hi ? 'text-[#3E4A20]/70' : 'text-[#3E4A20]/55'}`}>{s.link}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.1}>
            <div className="mt-8 bg-[#F4F5EC] rounded-3xl p-6 md:p-8 border border-[#556B2F]/10 space-y-3">
              <p className="text-sm text-[#3E4A20]/80 leading-relaxed">
                <strong className="text-[#556B2F]">출처</strong> — 보건복지부·교육부·육아정책연구소, 「2024년 전국보육실태조사」(2,494가구 대상). 국가승인통계이며 3년 주기로 실시되어 2024년판이 현재 최신판이고 다음 조사는 2027년 예정입니다.
              </p>
              <p className="text-sm text-[#3E4A20]/70 leading-relaxed">
                ※ 45.5%·44.2%·31.9%·4.0점은 육아종합지원센터 서비스를 인지한 부모 대상 이용경험이며, 전체 영유아 부모 비율이 아닙니다.
              </p>
              <p className="text-sm text-[#3E4A20]/70 leading-relaxed border-t border-[#556B2F]/10 pt-3">
                <strong>참고 지표(더 자주 갱신되는 통계)</strong> — 통계청 「2025년 상반기 지역별고용조사 – 기혼여성의 고용 현황」(2025.11.20 발표) 기준, 18세 미만 자녀 동거 기혼여성 고용률 64.3%(전년 대비 1.9%p 상승). 단 이는 영유아 가정이 아닌 18세 미만 자녀 동거 기혼여성 전체 대상으로 위 64.2%와 모집단이 다릅니다.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
      {/* FOUNDER */}
      <section className="w-full bg-[#F4F5EC] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <FadeIn className="text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#3E4A20]">Play Reset을 만든 사람</h2>
          </FadeIn>
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
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
              <div className="bg-[#556B2F] text-white rounded-3xl p-7 md:p-9">
                <p className="text-2xl md:text-3xl font-extrabold leading-snug">
                  “엄마가 행복해야<br />아이도 행복하다”
                </p>
                <p className="mt-5 text-white/85 leading-relaxed">
                  1996년부터 놀이를 통해 아이와 부모를 만나온 현장 경험과, 유아교육·아동상담코칭에서 쌓아온 이론이 함께 담긴 서비스입니다. 놀잇감을 새로 사는 것이 아니라 지금 있는 것을 아이 발달에 맞게 다시 살리는 데 오랜 시간 마음을 쏟아왔습니다.
                </p>
              </div>
              <div className="mt-6 bg-white rounded-3xl p-7 md:p-8 border border-[#556B2F]/10 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <Award className="w-5 h-5 text-[#556B2F]" />
                  <h3 className="font-bold text-[#3E4A20]">경력 타임라인</h3>
                </div>
                <ul className="space-y-5">
                  {TIMELINE.map((t, i) => (
                    <li key={i} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <span className="w-3 h-3 rounded-full bg-[#F5C518] ring-4 ring-[#F5C518]/30" />
                        {i < TIMELINE.length - 1 && <span className="flex-1 w-0.5 bg-[#556B2F]/15 mt-1" />}
                      </div>
                      <div className="pb-1">
                        <span className="text-lg font-extrabold text-[#556B2F]">{t.year}</span>
                        <p className="text-[#3E4A20]/80 leading-relaxed">{t.text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
      {/* FAQ */}
      <section className="w-full bg-[#FDFBF0] overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <FadeIn className="text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#3E4A20]">자주 묻는 질문</h2>
            <p className="mt-3 text-[#3E4A20]/60">궁금한 점을 눌러서 확인해 보세요.</p>
          </FadeIn>
          <div className="mt-10 space-y-3">
            {FAQS.map((f, i) => (
              <FadeIn key={i} delay={i * 0.03}>
                <div className="bg-white rounded-2xl border border-[#556B2F]/10 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                    className="w-full flex items-center justify-between gap-4 px-5 md:px-6 py-5 text-left"
                  >
                    <span className="flex items-start gap-3">
                      <span className="text-[#F5C518] font-extrabold text-lg leading-none mt-0.5">Q</span>
                      <span className="font-bold text-[#3E4A20]">{f.q}</span>
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#556B2F] flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 md:px-6 pb-5 pt-0">
                          <p className="text-[#3E4A20]/80 leading-relaxed pl-7">{f.a}</p>
                          {f.kw && (
                            <p className="mt-3 pl-7 text-xs text-[#556B2F]/70">참고 키워드 · {f.kw}</p>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
      {/* FINAL CTA + FORM */}
      <section id="reserve" className="relative w-full overflow-hidden">
        <img
          src="https://cdn.vibe-x.app/apps/566ba164a6283b2c82b4d9db/assets/original/background-1-104469.png"
          alt="따뜻한 가정 놀이 환경"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#3E4A20]/75" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <FadeIn>
              <div className="text-center lg:text-left max-w-xl mx-auto lg:mx-0">
                <h2 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] leading-tight">
                  지금 가정 방문을 예약하고<br />상담받아보세요
                </h2>
                <p className="mt-5 text-lg text-white/90 leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                  첫 방문에서 아이방과 놀잇감을 함께 살펴보는 것부터 시작합니다.
                </p>
                <div className="mt-6 inline-flex items-center gap-2 bg-[#F5C518] text-[#3E4A20] px-4 py-2 rounded-full text-sm font-bold">
                  <Star className="w-4 h-4" /> 온라인 예약 폼으로 간편하게 신청하세요
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.1} y={30}>
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-[#556B2F]/10">
                <h3 className="text-xl font-extrabold text-[#3E4A20] mb-5">가정 방문 예약</h3>
                <ReservationForm />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}