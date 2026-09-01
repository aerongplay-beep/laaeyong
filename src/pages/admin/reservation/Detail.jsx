import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, Check, Trash2, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Reservation } from '@/api/entities';
const STATUS_OPTIONS = [
  { v: 'pending', l: '대기' },
  { v: 'contacted', l: '연락완료' },
  { v: 'completed', l: '완료' },
];
export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState(null);
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await Reservation.get(id);
        setItem(res.data);
      } catch (e) {
        setNotice({ type: 'error', message: e?.message || '불러오지 못했습니다.' });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);
  const updateStatus = async (status) => {
    if (saving) return;
    setSaving(true);
    setNotice(null);
    try {
      await Reservation.update(id, { status });
      setItem((p) => ({ ...p, status }));
      setNotice({ type: 'success', message: '상태가 변경되었습니다.' });
    } catch (e) {
      setNotice({ type: 'error', message: e?.message || '변경에 실패했습니다.' });
    } finally {
      setSaving(false);
    }
  };
  const remove = async () => {
    if (saving) return;
    if (!window.confirm('이 예약 신청을 삭제하시겠습니까?')) return;
    setSaving(true);
    try {
      await Reservation.delete(id);
      navigate('/admin/reservations', { replace: true });
    } catch (e) {
      setNotice({ type: 'error', message: e?.message || '삭제에 실패했습니다.' });
      setSaving(false);
    }
  };
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-[#556B2F]" />
      </div>
    );
  }
  if (!item) {
    return (
      <div className="text-center py-16">
        <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
        <p className="text-[#3E4A20]/70">예약 정보를 찾을 수 없습니다.</p>
        <button onClick={() => navigate('/admin/reservations')} className="mt-4 text-[#556B2F] font-semibold hover:underline">
          목록으로
        </button>
      </div>
    );
  }
  const fmtDate = (d) => (d ? format(new Date(d), 'yyyy년 M월 d일 (EEE)', { locale: ko }) : '-');
  const createdVal = item.created_at ?? item.createdAt;
  const rows = [
    ['보호자 이름', item.guardianName],
    ['연락처', item.contact],
    ['아이 나이', item.childAge],
    ['방문 희망 지역', item.region],
    ['방문 희망 날짜', fmtDate(item.preferredDate)],
    ['희망 시간대', item.timeSlot],
    ['접수 일시', createdVal ? format(new Date(createdVal), 'yyyy.MM.dd HH:mm', { locale: ko }) : '-'],
  ];
  return (
    <div className="max-w-3xl">
      <button
        onClick={() => navigate('/admin/reservations')}
        className="flex items-center gap-2 text-[#3E4A20]/70 hover:text-[#556B2F] mb-5 font-semibold"
      >
        <ArrowLeft className="w-5 h-5" /> 목록으로
      </button>
      <div className="bg-white rounded-3xl border border-[#556B2F]/10 shadow-sm p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-extrabold text-[#3E4A20]">예약 상세</h2>
          <button
            onClick={remove}
            disabled={saving}
            className="flex items-center gap-2 text-sm font-semibold text-red-500 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors disabled:opacity-50"
          >
            <Trash2 className="w-4 h-4" /> 삭제
          </button>
        </div>
        <dl className="divide-y divide-[#556B2F]/10">
          {rows.map(([k, v]) => (
            <div key={k} className="grid grid-cols-3 gap-3 py-3.5">
              <dt className="text-sm font-semibold text-[#3E4A20]/60">{k}</dt>
              <dd className="col-span-2 text-[#3E4A20] font-medium">{v || '-'}</dd>
            </div>
          ))}
          <div className="grid grid-cols-3 gap-3 py-3.5">
            <dt className="text-sm font-semibold text-[#3E4A20]/60">문의사항</dt>
            <dd className="col-span-2 text-[#3E4A20] leading-relaxed whitespace-pre-wrap">
              {item.inquiry || '(없음)'}
            </dd>
          </div>
        </dl>
        <div className="mt-6 pt-6 border-t border-[#556B2F]/10">
          <p className="text-sm font-semibold text-[#3E4A20] mb-3">처리 상태</p>
          <div className="flex gap-2 flex-wrap">
            {STATUS_OPTIONS.map((s) => (
              <button
                key={s.v}
                onClick={() => updateStatus(s.v)}
                disabled={saving}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-colors flex items-center gap-2 ${
                  item.status === s.v
                    ? 'bg-[#556B2F] text-white'
                    : 'bg-[#F4F5EC] text-[#3E4A20] hover:bg-[#556B2F]/10'
                } disabled:opacity-50`}
              >
                {item.status === s.v && <Check className="w-4 h-4" />}
                {s.l}
              </button>
            ))}
          </div>
        </div>
        {notice && (
          <div
            className={`mt-4 p-3 rounded-xl text-sm flex items-center gap-2 ${
              notice.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            }`}
          >
            {notice.type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            {notice.message}
          </div>
        )}
      </div>
    </div>
  );
}