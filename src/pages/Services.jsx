import { useNavigate } from 'react-router-dom';
import { BookOpen, Users, Check, AlertCircle, ArrowRight } from 'lucide-react';
import FadeIn from '@/components/FadeIn';
const STEPS = [
  {
    no: '01',
    title: '가정 방문',
    desc: '방문을 예약하시면 약속한 날짜에 선생님이 직접 댁으로 찾아갑니다. 아이가 실제로 생활하는 공간에서 시작하기 때문에 준비하실 것은 없습니다.',
    img: 'https://cdn.vibe-x.app/apps/566ba164a6283b2c82b4d9db/assets/original/service-1-104469.png',
  },
  {
    no: '02',
    title: '놀이환경 진단',
    desc: '아이가 실제로 놀고 생활하는 방을 함께 둘러보며, 지금 가지고 있는 놀잇감 중 아이가 잘 가지고 노는 것과 손이 안 가는 것을 함께 확인합니다.',
    img: 'https://cdn.vibe-x.app/apps/566ba164a6283b2c82b4d9db/assets/original/service-2-104469.png',
  },
  {
    no: '03',
    title: '발달 맞춤 정리',
    desc: '아이의 발달 단계에 맞게 놀잇감을 분류하고, 꺼내기 쉽고 다시 정리하기도 쉬운 방식으로 공간을 정리합니다.',
    img: null,
  },
  {
    no: '04',
    title: '놀이 코칭',
    desc: '정리된 놀잇감을 활용해 집에서 바로 실천할 수 있는 놀이 방법을 부모님께 직접 코칭해드립니다.',
    img: null,
  },
];
const SUBS = [
  {
    title: '아동발달상담',
    desc: '놀이코칭을 받다 보면 "우리 아이가 또래보다 말이 늦은 것 같아요" 같은 궁금증이 생길 수 있습니다. 이럴 때는 아동발달상담으로 이어서, 연령별 발달 특성에 맞는 놀이와 놀잇감을 더 자세히 안내받을 수 있습니다.',
    img: 'https://cdn.vibe-x.app/apps/566ba164a6283b2c82b4d9db/assets/original/service-3-104469.png',
  },
  {
    title: '부모양육코칭',
    desc: '놀이 방법뿐 아니라 "아이와 대화가 잘 안 통해요" 같은 양육 고민이 있다면, 부모양육코칭을 통해 부모-자녀 상호작용과 양육 방법을 함께 살펴볼 수 있습니다.',
    img: 'https://cdn.vibe-x.app/apps/566ba164a6283b2c82b4d9db/assets/original/service-4-104469.png',
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
  { text: '아이의 발달 지연이 의심되어 전문적인 발달검사나 의료적 진단이 먼저 필요한 경우', guide: '전문 의료기관·발달센터 이용 권장' },
  { text: '정서·행동 문제로 심리치료나 전문 상담이 필요한 경우', guide: '전문 상담기관 이용 권장' },
  { text: '아이 놀이와 무관하게 공간 인테리어나 일반 수납 정리만 필요한 경우', guide: '일반 정리수납 서비스가 더 적합할 수 있음' },
];
export default function Services() {
  const navigate = useNavigate();
  return (
    <div>
      <section className="w-full bg-[#F4F5EC] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 md:pt-16 pb-14 md:pb-20 text-center">
          <FadeIn>
            <span className="inline-flex items-center gap-2 bg-[#F5C518] text-[#3E4A20] px-4 py-1.5 rounded-full text-sm font-bold">
              <BookOpen className="w-4 h-4" /> 서비스 소개
            </span>
            <h1 className="mt-5 text-3xl md:text-5xl font-extrabold text-[#3E4A20] leading-tight">놀이연구소가 도와드립니다</h1>
            <p className="mt-6 text-lg text-[#3E4A20]/75 leading-relaxed max-w-3xl mx-auto">
              놀잇감을 새로 사드리지 않습니다. 지금 집에 있는 놀잇감을 우리 아이 발달에 맞게 다시 살려드립니다.
            </p>
          </FadeIn>
        </div>
      </section>
      <section className="w-full bg-[#FDFBF0] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <FadeIn className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#3E4A20]">방문부터 코칭까지, 이렇게 진행돼요</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {STEPS.map((s, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="bg-white rounded-3xl overflow-hidden border border-[#556B2F]/10 shadow-sm h-full">
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
        </div>
      </section>
      <section className="w-full bg-[#F4F5EC] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <FadeIn className="mb-8">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#556B2F] flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#3E4A20]">이어서 받을 수 있는 서브 서비스</h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SUBS.map((s, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="bg-white rounded-3xl overflow-hidden border border-[#556B2F]/10 shadow-sm h-full">
                  <div className="overflow-hidden aspect-[16/9]">
                    <img src={s.img} alt={s.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6 md:p-7">
                    <h3 className="text-lg font-bold text-[#556B2F]">{s.title}</h3>
                    <p className="mt-3 text-[#3E4A20]/75 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
      <section className="w-full bg-[#FDFBF0] overflow-hidden">
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
            <div className="bg-[#3E4A20] text-white rounded-3xl p-7 md:p-9 h-full">
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
      <section className="w-full bg-[#F5C518] overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 text-center">
          <FadeIn>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#3E4A20]">
              지금 가정 방문을 예약하고 상담받아보세요
            </h2>
            <p className="mt-3 text-[#3E4A20]/75">첫 방문에서 아이방과 놀잇감을 함께 살펴보는 것부터 시작합니다.</p>
            <button
              onClick={() => navigate('/Reservation')}
              className="mt-7 bg-[#556B2F] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#47591f] active:scale-95 transition-all shadow-md"
            >
              가정 방문 예약하기
            </button>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}