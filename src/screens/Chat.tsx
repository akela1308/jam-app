import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import './Chat.css';

export interface ChatContact {
  id: string;
  name: string;
  avatarUrl?: string;
  isBrand?: boolean;
}

interface ChatMessage {
  id: string;
  text: string;
  fromMe: boolean;
  time: string;
  status?: 'sent' | 'delivered' | 'read';
}

const INITIAL_MESSAGES: ChatMessage[] = [
  { id: '1', text: 'Привет! Видела твой отзыв на Vitamin C Serum 💛', fromMe: false, time: '11:10' },
  { id: '2', text: 'Да, пользуюсь уже месяц — кожа реально изменилась!', fromMe: true, time: '11:12', status: 'read' },
  { id: '3', text: 'Какой тип кожи у тебя? У меня комбинированная и не знаю подойдёт ли', fromMe: false, time: '11:13' },
  { id: '4', text: 'У меня тоже комбинированная. Наношу только на Т-зону и всё окей 😊', fromMe: true, time: '11:15', status: 'read' },
  { id: '5', text: 'О, спасибо! Буду пробовать. Где брала?', fromMe: false, time: '11:16' },
  { id: '6', text: 'В официальном магазине blush, там сейчас купон -20% если через ДЖЕМ', fromMe: true, time: '11:17', status: 'delivered' },
];

interface ChatProps {
  contact?: ChatContact;
  onBack?: () => void;
  onProfile?: () => void;
}

export function Chat({ contact, onBack, onProfile }: ChatProps) {
  const name = contact?.name ?? '@anna_skin';
  const avatarUrl = contact?.avatarUrl;
  const isBrand = contact?.isBrand ?? false;

  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  function send() {
    const text = input.trim();
    if (!text) return;
    const now = new Date();
    const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
    setMessages((prev) => [
      ...prev,
      { id: String(Date.now()), text, fromMe: true, time, status: 'sent' },
    ]);
    setInput('');
    inputRef.current?.focus();

    // Simulate reply after 1.2s
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now() + 1),
          text: getAutoReply(text),
          fromMe: false,
          time: `${now.getHours()}:${String(now.getMinutes() + 1).padStart(2, '0')}`,
        },
      ]);
    }, 1200);
  }

  function getAutoReply(msg: string): string {
    if (msg.includes('?')) return 'Хороший вопрос! Напишу чуть позже 😊';
    if (msg.length < 10) return '👍';
    return 'Спасибо! Попробую обязательно 💛';
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  // Group messages by date (simplified: all today)
  const today = new Date().toLocaleDateString('ru', { day: 'numeric', month: 'long' });

  return (
    <div className="chat">
      {/* Header */}
      <div className="chat__header">
        <button className="chat__back" onClick={onBack}>←</button>
        <button className="chat__contact" onClick={onProfile}>
          {avatarUrl
            ? <img src={avatarUrl} alt={name} className="chat__avatar" />
            : <div className="chat__avatar chat__avatar--placeholder">
                {name.replace('@', '').charAt(0).toUpperCase()}
              </div>
          }
          <div className="chat__contact-info">
            <span className="chat__contact-name">{name}</span>
            <span className="chat__contact-status">
              {isBrand ? '🏪 Бренд' : 'был(а) недавно'}
            </span>
          </div>
        </button>
        <button className="chat__more">⋯</button>
      </div>

      {/* Messages */}
      <div className="chat__body">
        <div className="chat__date-label">{today}</div>

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`chat__msg-row${msg.fromMe ? ' chat__msg-row--me' : ''}`}
          >
            {!msg.fromMe && (
              <div className="chat__msg-avatar">
                {avatarUrl
                  ? <img src={avatarUrl} alt={name} className="chat__msg-avatar-img" />
                  : <div className="chat__msg-avatar-placeholder">
                      {name.replace('@', '').charAt(0).toUpperCase()}
                    </div>
                }
              </div>
            )}
            <div className={`chat__bubble${msg.fromMe ? ' chat__bubble--me' : ' chat__bubble--them'}`}>
              <p className="chat__bubble-text">{msg.text}</p>
              <div className="chat__bubble-meta">
                <span className="chat__time">{msg.time}</span>
                {msg.fromMe && msg.status && (
                  <span className="chat__status">
                    {msg.status === 'read' ? '✓✓' : msg.status === 'delivered' ? '✓✓' : '✓'}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div className="chat__input-bar">
        <button className="chat__attach-btn">
          <PlusIcon />
        </button>
        <input
          ref={inputRef}
          className="chat__input"
          placeholder="Сообщение..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
        />
        <button
          className={`chat__send-btn${input.trim() ? ' chat__send-btn--active' : ''}`}
          onClick={send}
          disabled={!input.trim()}
        >
          <SendIcon active={!!input.trim()} />
        </button>
      </div>
    </div>
  );
}

function PlusIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function SendIcon({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
        stroke={active ? 'white' : '#b0b0b0'}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
