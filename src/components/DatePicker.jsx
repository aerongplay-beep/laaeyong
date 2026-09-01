import { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  addMonths,
  subMonths,
  getDay,
  isBefore,
  startOfDay,
} from 'date-fns';
import { ko } from 'date-fns/locale';
const WEEK = ['일', '월', '화', '수', '목', '금', '토'];
export default function DatePicker({ value, onChange, error }) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(value ? new Date(value) : new Date());
  const ref = useRef(null);
  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);
  const today = startOfDay(new Date());
  const monthStart = startOfMonth(view);
  const monthEnd = endOfMonth(view);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const leadingBlanks = getDay(monthStart);
  const selected = value ? new Date(value) : null;
  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-left outline-none transition-colors ${
          error
            ? 'border-red-400 focus:ring-2 focus:ring-red-200'
            : 'border-[#556B2F]/25 focus:border-[#556B2F] focus:ring-2 focus:ring-[#556B2F]/15'
        } ${open ? 'ring-2 ring-[#556B2F]/15 border-[#556B2F]' : ''}`}
      >
        <span className={value ? 'text-[#3E4A20]' : 'text-slate-400'}>
          {value ? format(new Date(value), 'yyyy년 M월 d일 (EEE)', { locale: ko }) : '방문 희망 날짜를 선택해 주세요'}
        </span>
        <Calendar className="w-5 h-5 text-[#556B2F]" />
      </button>
      {open && (
        <div className="absolute z-30 mt-2 w-full sm:w-80 bg-white rounded-2xl shadow-2xl border border-[#556B2F]/15 p-4">
          <div className="flex items-center justify-between mb-3">
            <button
              type="button"
              onClick={() => setView(subMonths(view, 1))}
              className="w-8 h-8 rounded-full hover:bg-[#556B2F]/10 flex items-center justify-center text-[#556B2F]"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="font-bold text-[#3E4A20]">{format(view, 'yyyy년 M월', { locale: ko })}</span>
            <button
              type="button"
              onClick={() => setView(addMonths(view, 1))}
              className="w-8 h-8 rounded-full hover:bg-[#556B2F]/10 flex items-center justify-center text-[#556B2F]"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 mb-1">
            {WEEK.map((w, i) => (
              <div
                key={w}
                className={`text-center text-xs font-semibold py-1 ${
                  i === 0 ? 'text-red-400' : i === 6 ? 'text-[#556B2F]' : 'text-slate-400'
                }`}
              >
                {w}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: leadingBlanks }).map((_, i) => (
              <div key={`b${i}`} />
            ))}
            {days.map((d) => {
              const disabled = isBefore(d, today);
              const isSel = selected && isSameDay(d, selected);
              return (
                <button
                  key={d.toISOString()}
                  type="button"
                  disabled={disabled}
                  onClick={() => {
                    onChange(format(d, 'yyyy-MM-dd'));
                    setOpen(false);
                  }}
                  className={`aspect-square rounded-lg text-sm font-medium transition-colors ${
                    isSel
                      ? 'bg-[#556B2F] text-white'
                      : disabled
                      ? 'text-slate-300 cursor-not-allowed'
                      : 'text-[#3E4A20] hover:bg-[#F5C518]/30'
                  }`}
                >
                  {format(d, 'd')}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}