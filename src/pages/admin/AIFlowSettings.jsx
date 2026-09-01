import { useEffect, useState } from 'react';
import { Settings, Check, AlertCircle, Loader2, MessageCircle } from 'lucide-react';
import { aiflowClients } from '@/lib/aiflow';
const formatModelLabel = (id) => {
  const s = String(id || '');
  const lower = s.toLowerCase();
  const provider = lower.startsWith('claude')
    ? 'Anthropic'
    : lower.startsWith('gpt') || lower.startsWith('o1') || lower.startsWith('o3') || lower.startsWith('o4')
    ? 'OpenAI'
    : lower.startsWith('gemini') || lower.startsWith('veo')
    ? 'Google'
    : 'AI';
  const label = s
    .replace(/(\d)-(\d)/g, '$1.$2')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/Gpt/g, 'GPT')
    .replace(/\bpreview\b/gi, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
  return `${label || id} (${provider})`;
};
export default function AIFlowSettings() {
  const [modules, setModules] = useState([]);
  const [drafts, setDrafts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(null);
  const [status, setStatus] = useState(null);
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const client = aiflowClients[0];
        client.setAdminToken(localStorage.getItem('access_token'));
        const res = await client.admin.listModules();
        const mods = res?.modules || [];
        setModules(mods);
        const d = {};
        mods.forEach((m) => {
          d[m.moduleId] = { systemPrompt: m.systemPrompt || '', model: m.defaults?.[m.feature] || '' };
        });
        setDrafts(d);
      } catch (err) {
        setError(err?.message || 'AI 설정을 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);
  const save = async (m) => {
    setSaving(m.moduleId);
    setStatus(null);
    try {
      const client = aiflowClients[0];
      client.setAdminToken(localStorage.getItem('access_token'));
      const draft = drafts[m.moduleId];
      await client.admin.updateConfig({
        moduleId: m.moduleId,
        systemPrompt: draft.systemPrompt,
        defaults: draft.model ? { [m.feature]: draft.model } : undefined,
      });
      setStatus({ id: m.moduleId, type: 'success', message: '저장되었습니다.' });
    } catch (err) {
      setStatus({ id: m.moduleId, type: 'error', message: err?.message || '저장에 실패했습니다.' });
    } finally {
      setSaving(null);
    }
  };
  return (
    <div className="w-full max-w-4xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-11 h-11 rounded-2xl bg-[#556B2F]/10 flex items-center justify-center">
          <Settings className="w-6 h-6 text-[#556B2F]" />
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-[#3E4A20]">AI 상담 설정</h2>
          <p className="text-sm text-[#3E4A20]/60">상담 도우미의 시스템 프롬프트와 기본 모델을 관리합니다.</p>
        </div>
      </div>
      {loading ? (
        <div className="flex items-center justify-center py-20 bg-white rounded-3xl border border-[#556B2F]/10">
          <Loader2 className="w-8 h-8 animate-spin text-[#556B2F]" />
        </div>
      ) : error ? (
        <div className="bg-white rounded-3xl border border-[#556B2F]/10 p-10 text-center">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
          <p className="text-[#3E4A20]/70">{error}</p>
        </div>
      ) : modules.length === 0 ? (
        <div className="bg-white rounded-3xl border border-[#556B2F]/10 p-10 text-center">
          <MessageCircle className="w-12 h-12 text-[#556B2F]/30 mx-auto mb-3" />
          <p className="text-[#3E4A20]/70">등록된 AI 모듈이 없습니다.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {modules.map((m) => {
            const draft = drafts[m.moduleId] || { systemPrompt: '', model: '' };
            const models = m.models || [];
            return (
              <div key={m.moduleId} className="bg-white rounded-3xl border border-[#556B2F]/10 shadow-sm p-6 md:p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-[#F5C518]/30 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-[#556B2F]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#3E4A20]">{m.useCaseName || m.title || m.feature}</h3>
                    <span className="text-xs font-semibold text-[#556B2F] bg-[#556B2F]/10 px-2 py-0.5 rounded-full">
                      {m.feature}
                    </span>
                  </div>
                </div>
                <label className="block text-sm font-semibold text-[#3E4A20] mb-1.5">시스템 프롬프트</label>
                <textarea
                  value={draft.systemPrompt}
                  onChange={(e) =>
                    setDrafts((p) => ({ ...p, [m.moduleId]: { ...p[m.moduleId], systemPrompt: e.target.value } }))
                  }
                  rows={8}
                  className="w-full px-4 py-3 rounded-xl border border-[#556B2F]/25 focus:border-[#556B2F] focus:ring-2 focus:ring-[#556B2F]/15 outline-none text-sm leading-relaxed resize-y"
                />
                <p className="mt-1 text-xs text-[#3E4A20]/50">{draft.systemPrompt.length}자 · 상담 도우미의 말투와 안내 기준을 정의합니다.</p>
                {models.length > 0 && (
                  <div className="mt-5">
                    <label className="block text-sm font-semibold text-[#3E4A20] mb-1.5">기본 모델</label>
                    <select
                      value={draft.model || ''}
                      onChange={(e) =>
                        setDrafts((p) => ({ ...p, [m.moduleId]: { ...p[m.moduleId], model: e.target.value } }))
                      }
                      disabled={models.length <= 1}
                      className="w-full px-4 py-3 rounded-xl border border-[#556B2F]/25 focus:border-[#556B2F] focus:ring-2 focus:ring-[#556B2F]/15 outline-none text-sm disabled:opacity-60"
                    >
                      {draft.model && !models.includes(draft.model) && (
                        <option value={draft.model}>{formatModelLabel(draft.model)}</option>
                      )}
                      <option value="">기본값 사용</option>
                      {models.map((mo) => (
                        <option key={mo} value={mo}>
                          {formatModelLabel(mo)}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <div className="mt-6 flex items-center gap-3">
                  <button
                    onClick={() => save(m)}
                    disabled={saving === m.moduleId}
                    className="bg-[#556B2F] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#47591f] transition-colors disabled:opacity-60 flex items-center gap-2"
                  >
                    {saving === m.moduleId ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                    저장
                  </button>
                  {status && status.id === m.moduleId && (
                    <span
                      className={`text-sm font-semibold flex items-center gap-1 ${
                        status.type === 'success' ? 'text-green-600' : 'text-red-500'
                      }`}
                    >
                      {status.type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                      {status.message}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}