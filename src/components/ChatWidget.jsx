import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { aiflow1976, aiflow1976ConfigPromise } from '@/lib/aiflow';
export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        '안녕하세요, 놀이연구소 상담 도우미예요. 우리 아이 놀이환경이나 서비스가 우리 집 상황에 맞을지 궁금한 점을 편하게 물어봐 주세요.',
    },
  ]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const scrollRef = useRef(null);
  const abortRef = useRef(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);
  const send = async () => {
    const text = input.trim();
    if (!text || sending) return;
    setInput('');
    const next = [...messages, { role: 'user', content: text }];
    setMessages([...next, { role: 'assistant', content: '' }]);
    setSending(true);
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    try {
      const config = await aiflow1976ConfigPromise;
      const systemPrompt = config?.systemPrompt || '';
      const stream = aiflow1976.chatStream({
        system: systemPrompt,
        messages: next.map((m) => ({ role: m.role, content: m.content })),
        signal: ctrl.signal,
      });
      let acc = '';
      for await (const chunk of stream) {
        if (chunk.delta) {
          acc += chunk.delta;
          setMessages((prev) => {
            const copy = [...prev];
            copy[copy.length - 1] = { role: 'assistant', content: acc };
            return copy;
          });
        }
        if (chunk.done) break;
      }
      if (!acc) {
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = {
            role: 'assistant',
            content: '죄송해요, 지금은 답변을 준비하지 못했어요. 잠시 후 다시 시도해 주세요.',
          };
          return copy;
        });
      }
    } catch (err) {
      const msg =
        err?.status === 402
          ? '지금은 상담 도우미 이용이 어려워요. 잠시 후 다시 시도하거나 예약 폼으로 문의해 주세요.'
          : `죄송해요, 오류가 발생했어요. ${err?.message || ''}`;
      setMessages((prev) => {
        const copy = [...prev];
        copy[copy.length - 1] = { role: 'assistant', content: msg };
        return copy;
      });
    } finally {
      setSending(false);
    }
  };
  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-[#556B2F] text-white shadow-xl flex items-center justify-center hover:bg-[#47591f] active:scale-95 transition-all"
        aria-label="상담 도우미 열기"
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-24 right-5 z-50 w-[calc(100vw-2.5rem)] sm:w-[380px] h-[540px] max-h-[70vh] bg-white rounded-3xl shadow-2xl border border-[#556B2F]/15 flex flex-col overflow-hidden"
          >
            <div className="bg-[#556B2F] text-white px-5 py-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#F5C518] flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-[#3E4A20]" />
              </div>
              <div>
                <p className="font-bold text-sm leading-tight">놀이연구소 상담 도우미</p>
                <p className="text-xs text-white/70">서비스 적합 여부를 안내해 드려요</p>
              </div>
            </div>
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[#FDFBF0]">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                      m.role === 'user'
                        ? 'bg-[#556B2F] text-white rounded-br-md'
                        : 'bg-white text-[#3E4A20] border border-[#556B2F]/10 rounded-bl-md'
                    }`}
                  >
                    {m.content || (sending && i === messages.length - 1 ? (
                      <Loader2 className="w-4 h-4 animate-spin text-[#556B2F]" />
                    ) : (
                      ''
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-[#556B2F]/10 bg-white">
              <div className="flex items-end gap-2" role="form" aria-label="상담 메시지 입력">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
                      e.preventDefault();
                      send();
                    }
                  }}
                  rows={1}
                  placeholder="궁금한 점을 입력해 주세요"
                  className="flex-1 resize-none max-h-24 px-4 py-2.5 rounded-2xl border border-[#556B2F]/20 focus:border-[#556B2F] focus:ring-2 focus:ring-[#556B2F]/15 outline-none text-sm"
                />
                <button
                  onClick={send}
                  disabled={sending || !input.trim()}
                  className="w-10 h-10 rounded-full bg-[#556B2F] text-white flex items-center justify-center hover:bg-[#47591f] disabled:opacity-40 transition-colors flex-shrink-0"
                  aria-label="보내기"
                >
                  {sending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}