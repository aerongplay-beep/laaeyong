import { useState } from 'react';
import { Check, Loader2, AlertCircle } from 'lucide-react';
import { Reservation } from '@/api/entities';
import DatePicker from './DatePicker';
const AGE_OPTIONS = ['12개월 미만', '만 1세', '만 2세', '만 3세', '만 4세', '만 5세', '초등 저학년(1~3학년)', '기타'];
const TIME_SLOTS = [
  { value: '오전', label: '오전 (09~12시)' },
  { value: '오후', label: '오후 (13~17시)' },
  { value: '저녁', label: '저녁 (18~20시)' },
];
export default function ReservationForm({ compact = false }) {
  const [form, setForm] = useState({
    guardianName: '',
    contact: '',
    childAge: '',
    region: '',
    preferredDate: '',
    timeSlot: '',
    inquiry: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [notice, setNotice] = useState(null);
  const set = (k, v) => {
    setForm((p) => ({ ...p, [k]: v }));
    setErrors((p) => ({ ...p, [k]: '' }));
  };
  const validate = () => {
    const e = {};
    if (!form.guardianName.trim()) e.guardianName = '보호자 이름을 입력해 주세요.';
    if (!form.contact.trim()) e.contact = '연락처를 입력해 주세요.';
    else if (!/[0-9]{7,}/.test(form.contact.replace(/[^0-9]/g, ''))) e.contact = '연락 가능한 전화번호를 입력해 주세요.';
    if (!form.childAge) e.childAge = '아이 나이를 선택해 주세요.';
    if (!form.region.trim()) e.region = '방문 희망 지역을 입력해 주세요.';
    if (!form.preferredDate) e.preferredDate = '방문 희망 날짜를 선택해 주세요.';
    if (!form.timeSlot) e.timeSlot = '희망 시간대를 선택해 주세요.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const submit = async () => {
    if (loading) return;
    if (!validate()) return;
    setLoading(true);
    setNotice(null);
    try {
      await Reservation.create({
        guardianName: form.guardianName.trim(),
        contact: form.contact.trim(),
        childAge: form.childAge,
        region: form.region.trim(),
        preferredDate: form.preferredDate,
        timeSlot: form.timeSlot,
        inquiry: form.inquiry.trim(),
      });
      setDone(true);
    } catch (err) {
      setNotice({ type: 'error', message: err?.message || '예약 접수에 실패했습니다. 잠시 후 다시 시도해 주세요.' });
    } finally {
      setLoading(false);
    }
  };
  if (done) {
    return (
      <div className="text-center py-10 px-4">
        <div className="w-16 h-16 rounded-full bg-[#556B2F] mx-auto flex items-center justify-center">
          <Check className="w-8 h-8 text-white" />
        </div>
        <h3 className="mt-5 text-xl font-bold text-[#3E4A20]">예약 신청이 접수되었어요</h3>
        <p className="mt-2 text-[#3E4A20]/70 leading-relaxed">
          입력해 주신 연락처로 곧 방문 일정을 확인해 안내드리겠습니다.<br />
          첫 방문에서 아이방과 놀잇감을 함께 살펴보는 것부터 시작합니다.
        </p>
        <button
          onClick={() => {
            setDone(false);
            setForm({ guardianName: '', contact: '', childAge: '', region: '', preferredDate: '', timeSlot: '', inquiry: '' });
          }}
          className="mt-6 bg-[#F5C518] text-[#3E4A20] px-6 py-3 rounded-xl font-bold hover:bg-[#e0b30f] transition-colors"
        >
          다른 예약 신청하기
        </button>
      </div>
    );
  }
  const label = (t) => <label className="block text-sm font-semibold text-[#3E4A20] mb-1.5">{t}</label>;
  const inputCls = (k) =>
    `w-full px-4 py-3 rounded-xl border outline-none transition-colors ${
      errors[k]
        ? 'border-red-400 focus:ring-2 focus:ring-red-200'
        : 'border-[#556B2F]/25 focus:border-[#556B2F] focus:ring-2 focus:ring-[#556B2F]/15'
    }`;
  const err = (k) =>
    errors[k] ? (
      <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
        <AlertCircle className="w-4 h-4" /> {errors[k]}
      </p>
    ) : null;
  return (
    <div role="form" aria-label="가정 방문 예약 폼" className={compact ? '' : 'space-y-4'}>
      <div className={compact ? 'grid grid-cols-1 gap-4' : 'grid grid-cols-1 sm:grid-cols-2 gap-4'}>
        <div>
          {label('보호자 이름')}
          <input
            value={form.guardianName}
            onChange={(e) => set('guardianName', e.target.value)}
            placeholder="예) 김서연"
            className={inputCls('guardianName')}
          />
          {err('guardianName')}
        </div>
        <div>
          {label('연락처')}
          <input
            value={form.contact}
            onChange={(e) => set('contact', e.target.value)}
            placeholder="예) 010-1234-5678"
            className={inputCls('contact')}
          />
          {err('contact')}
        </div>
        <div>
          {label('아이 나이')}
          <select value={form.childAge} onChange={(e) => set('childAge', e.target.value)} className={inputCls('childAge')}>
            <option value="">나이를 선택해 주세요</option>
            {AGE_OPTIONS.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
          {err('childAge')}
        </div>
        <div>
          {label('방문 희망 지역')}
          <input
            value={form.region}
            onChange={(e) => set('region', e.target.value)}
            placeholder="예) 서울 마포구"
            className={inputCls('region')}
          />
          {err('region')}
        </div>
        <div className="sm:col-span-2">
          {label('방문 희망 날짜')}
          <DatePicker value={form.preferredDate} onChange={(v) => set('preferredDate', v)} error={!!errors.preferredDate} />
          {err('preferredDate')}
        </div>
        <div className="sm:col-span-2">
          {label('방문 희망 시간대')}
          <div className="grid grid-cols-3 gap-2">
            {TIME_SLOTS.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => set('timeSlot', t.value)}
                className={`px-2 py-3 rounded-xl text-sm font-semibold border transition-colors ${
                  form.timeSlot === t.value
                    ? 'bg-[#556B2F] text-white border-[#556B2F]'
                    : 'bg-white text-[#3E4A20] border-[#556B2F]/25 hover:bg-[#F5C518]/20'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          {err('timeSlot')}
        </div>
        <div className="sm:col-span-2">
          {label('문의사항 (선택)')}
          <textarea
            value={form.inquiry}
            onChange={(e) => set('inquiry', e.target.value)}
            rows={3}
            placeholder="궁금하신 점이나 아이 상황을 자유롭게 적어 주세요."
            className={`${inputCls('inquiry')} resize-none`}
          />
        </div>
      </div>
      {notice && (
        <div className="p-3 rounded-xl bg-red-50 text-red-700 text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4" /> {notice.message}
        </div>
      )}
      <button
        onClick={submit}
        disabled={loading}
        className="w-full mt-2 bg-[#556B2F] text-white px-6 py-4 rounded-xl font-bold text-lg hover:bg-[#47591f] active:scale-[0.99] transition-all disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
        {loading ? '접수 중...' : '가정 방문 예약하기'}
      </button>
      <p className="text-xs text-[#3E4A20]/60 text-center">
        접수 후 입력하신 연락처로 방문 일정을 확인해 안내드립니다.
      </p>
    </div>
  );
}