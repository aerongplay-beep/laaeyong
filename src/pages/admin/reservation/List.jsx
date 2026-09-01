import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Phone, MapPin, Search } from 'lucide-react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Reservation } from '@/api/entities';
const STATUS_LABEL = { pending: '대기', contacted: '연락완료', completed: '완료' };
const STATUS_STYLE = {
  pending: 'bg-[#F5C518]/30 text-[#3E4A20]',
  contacted: 'bg-[#556B2F]/15 text-[#556B2F]',
  completed: 'bg-green-100 text-green-700',
};
export default function List() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState('');
  const fetchData = async (pageNum) => {
    setLoading(true);
    try {
      const filter = {};
      if (statusFilter) filter.status = statusFilter;
      const res = await Reservation.paging({ page: pageNum, limit: 10, filter, sort: '-created_at' });
      setData(res.data.data || []);
      setTotal(res.data.total || 0);
      setTotalPages(res.data.totalPages || 1);
      setPage(pageNum);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData(1);
  }, [statusFilter]);
  const fmtDate = (d) => (d ? format(new Date(d), 'yyyy.MM.dd', { locale: ko }) : '-');
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-extrabold text-[#3E4A20]">예약 관리</h2>
        <div className="flex gap-2 flex-wrap">
          {[
            { v: '', l: '전체' },
            { v: 'pending', l: '대기' },
            { v: 'contacted', l: '연락완료' },
            { v: 'completed', l: '완료' },
          ].map((s) => (
            <button
              key={s.v}
              onClick={() => setStatusFilter(s.v)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                statusFilter === s.v ? 'bg-[#556B2F] text-white' : 'bg-white text-[#3E4A20] border border-[#556B2F]/20 hover:bg-[#556B2F]/10'
              }`}
            >
              {s.l}
            </button>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-[#556B2F]/10 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse h-14 bg-[#F4F5EC] rounded-xl" />
            ))}
          </div>
        ) : data.length === 0 ? (
          <div className="text-center py-16">
            <Calendar className="w-12 h-12 text-[#556B2F]/30 mx-auto mb-3" />
            <p className="text-[#3E4A20]/60">예약 신청이 없습니다.</p>
          </div>
        ) : (
          <>
            <div className="hidden md:grid grid-cols-12 gap-3 px-6 py-3 bg-[#F4F5EC] text-xs font-bold text-[#3E4A20]/60">
              <span className="col-span-2">보호자</span>
              <span className="col-span-2">연락처</span>
              <span className="col-span-2">아이 나이</span>
              <span className="col-span-2">희망 지역</span>
              <span className="col-span-2">희망 방문일</span>
              <span className="col-span-2 text-right">상태</span>
            </div>
            <div className="divide-y divide-[#556B2F]/10">
              {data.map((r) => (
                <Link
                  key={r.id}
                  to={`/admin/reservations/${r.id}`}
                  className="grid grid-cols-2 md:grid-cols-12 gap-2 md:gap-3 px-6 py-4 hover:bg-[#F4F5EC] transition-colors items-center"
                >
                  <span className="col-span-2 md:col-span-2 font-semibold text-[#3E4A20]">{r.guardianName}</span>
                  <span className="md:col-span-2 text-sm text-[#3E4A20]/70 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 md:hidden" />{r.contact}
                  </span>
                  <span className="md:col-span-2 text-sm text-[#3E4A20]/70">{r.childAge}</span>
                  <span className="md:col-span-2 text-sm text-[#3E4A20]/70 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 md:hidden" />{r.region}
                  </span>
                  <span className="md:col-span-2 text-sm text-[#3E4A20]/70">
                    {fmtDate(r.preferredDate)} · {r.timeSlot}
                  </span>
                  <span className="col-span-2 md:col-span-2 md:text-right">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${STATUS_STYLE[r.status] || STATUS_STYLE.pending}`}>
                      {STATUS_LABEL[r.status] || '대기'}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <button
            onClick={() => fetchData(page - 1)}
            disabled={page <= 1 || loading}
            className="px-3 py-2 rounded-lg bg-white border border-[#556B2F]/20 text-sm font-semibold text-[#3E4A20] disabled:opacity-40"
          >
            이전
          </button>
          <span className="text-sm text-[#3E4A20]/70">
            {page} / {totalPages}
          </span>
          <button
            onClick={() => fetchData(page + 1)}
            disabled={page >= totalPages || loading}
            className="px-3 py-2 rounded-lg bg-white border border-[#556B2F]/20 text-sm font-semibold text-[#3E4A20] disabled:opacity-40"
          >
            다음
          </button>
        </div>
      )}
      <p className="mt-4 text-center text-sm text-[#3E4A20]/50">전체 {total}건</p>
    </div>
  );
}