import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Check, Phone, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Reservation } from '@/api/entities';
const STATUS_LABEL = { pending: '대기', contacted: '연락완료', completed: '완료' };
const STATUS_STYLE = {
  pending: 'bg-[#F5C518]/30 text-[#3E4A20]',
  contacted: 'bg-[#556B2F]/15 text-[#556B2F]',
  completed: 'bg-green-100 text-green-700',
};
export default function Dashboard() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [pending, setPending] = useState(0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await Reservation.paging({ page: 1, limit: 5, sort: '-created_at' });
        setData(res.data.data || []);
        setTotal(res.data.total || 0);
        const p = await Reservation.paging({ page: 1, limit: 1, filter: { status: 'pending' } });
        setPending(p.data.total || 0);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);
  const fmt = (ts) => {
    const v = ts?.created_at ?? ts?.createdAt;
    return v ? format(new Date(v), 'M월 d일 HH:mm', { locale: ko }) : '-';
  };
  return (
    <div>
      <h2 className="text-2xl font-extrabold text-[#3E4A20] mb-6">대시보드</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-6 border border-[#556B2F]/10 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-[#556B2F] flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-[#3E4A20]/60">전체 예약 신청</p>
              <p className="text-2xl font-extrabold text-[#3E4A20]">{total}건</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-[#556B2F]/10 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-[#F5C518] flex items-center justify-center">
              <Clock className="w-5 h-5 text-[#3E4A20]" />
            </div>
            <div>
              <p className="text-sm text-[#3E4A20]/60">대기 중</p>
              <p className="text-2xl font-extrabold text-[#3E4A20]">{pending}건</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-[#556B2F]/10 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-green-500 flex items-center justify-center">
              <Check className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-[#3E4A20]/60">처리 완료</p>
              <p className="text-2xl font-extrabold text-[#3E4A20]">{total - pending}건</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-[#556B2F]/10 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#556B2F]/10">
          <h3 className="font-bold text-[#3E4A20]">최근 예약 신청</h3>
          <Link to="/admin/reservations" className="text-sm font-semibold text-[#556B2F] hover:underline flex items-center gap-1">
            전체 보기 <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        {loading ? (
          <div className="p-6 space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse h-12 bg-[#F4F5EC] rounded-xl" />
            ))}
          </div>
        ) : data.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-[#556B2F]/30 mx-auto mb-3" />
            <p className="text-[#3E4A20]/60">아직 예약 신청이 없습니다.</p>
          </div>
        ) : (
          <div className="divide-y divide-[#556B2F]/10">
            {data.map((r) => (
              <Link
                key={r.id}
                to={`/admin/reservations/${r.id}`}
                className="flex items-center justify-between px-6 py-4 hover:bg-[#F4F5EC] transition-colors"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div>
                    <p className="font-semibold text-[#3E4A20]">{r.guardianName}</p>
                    <p className="text-sm text-[#3E4A20]/60 flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5" /> {r.contact}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-[#3E4A20]/50 hidden sm:inline">{fmt(r)}</span>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${STATUS_STYLE[r.status] || STATUS_STYLE.pending}`}>
                    {STATUS_LABEL[r.status] || '대기'}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}