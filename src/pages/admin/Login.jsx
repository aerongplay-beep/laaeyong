import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, AlertCircle } from 'lucide-react';
import { vibex } from '@/api/vibexClient';
import Logo from '@/components/Logo';
export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setChecking(false);
      return;
    }
    (async () => {
      try {
        const res = await vibex.auth.me();
        const me = res?.data;
        const isAdminAccount = me?.type === 'admin' || (me?.type == null && me?.role === 'admin');
        if (isAdminAccount) {
          navigate('/admin', { replace: true });
          return;
        }
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
      } catch {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
      } finally {
        setChecking(false);
      }
    })();
  }, [navigate]);
  const submit = async () => {
    if (loading) return;
    setError('');
    if (!email.trim() || !password) {
      setError('이메일과 비밀번호를 입력해 주세요.');
      return;
    }
    setLoading(true);
    try {
      const res = await vibex.auth.login({ email: email.trim(), password });
      const { token, user } = res.data.data;
      if (!(user?.type === 'admin' || (user?.type == null && user?.role === 'admin'))) {
        setError('관리자 계정이 아닙니다.');
        vibex.auth.logout();
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        setLoading(false);
        return;
      }
      localStorage.setItem('access_token', token);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err?.message || '로그인에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };
  if (checking) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#FDFBF0]">
        <div className="w-8 h-8 border-4 border-[#556B2F]/20 border-t-[#556B2F] rounded-full animate-spin" />
      </div>
    );
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F5EC] px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <Logo
            className="justify-center"
            iconClassName="h-11 w-11 text-[#556B2F]"
            textClassName="text-xl text-[#3E4A20]"
          />
          <p className="mt-3 text-[#3E4A20]/70">관리자 로그인</p>
        </div>
        <div role="form" aria-label="관리자 로그인" className="bg-white rounded-3xl shadow-lg border border-[#556B2F]/10 p-7 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[#3E4A20] mb-1.5">이메일</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.nativeEvent.isComposing && submit()}
              placeholder="이메일 주소를 입력해 주세요"
              className="w-full px-4 py-3 rounded-xl border border-[#556B2F]/25 focus:border-[#556B2F] focus:ring-2 focus:ring-[#556B2F]/15 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#3E4A20] mb-1.5">비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.nativeEvent.isComposing && submit()}
              placeholder="비밀번호를 입력해 주세요"
              className="w-full px-4 py-3 rounded-xl border border-[#556B2F]/25 focus:border-[#556B2F] focus:ring-2 focus:ring-[#556B2F]/15 outline-none"
            />
          </div>
          {error && (
            <div className="p-3 rounded-xl bg-red-50 text-red-700 text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4" /> {error}
            </div>
          )}
          <button
            onClick={submit}
            disabled={loading}
            className="w-full bg-[#556B2F] text-white px-6 py-3.5 rounded-xl font-bold hover:bg-[#47591f] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-5 h-5 animate-spin" />}
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </div>
      </div>
    </div>
  );
}