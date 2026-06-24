import { useState } from 'react';
import avatar1 from '../assets/avatars/avatar-1.png';
import avatar2 from '../assets/avatars/avatar-2.png';
import avatar3 from '../assets/avatars/avatar-3.png';
import avatar4 from '../assets/avatars/avatar-4.png';
import avatar5 from '../assets/avatars/avatar-5.png';
import { useLanguage } from '../i18n/LanguageContext';
import './Notifications.css';

type NotifType = 'like' | 'follow' | 'reply' | 'coupon' | 'mention' | 'giveaway';

interface Notif {
  id: string;
  type: NotifType;
  actor: string;
  actorAvatar?: string;
  text: string;
  time: string;
  isRead: boolean;
  action?: string;
}

const TODAY: Notif[] = [
  {
    id: '1',
    type: 'like',
    actor: '@kate_beauty',
    actorAvatar: avatar2,
    text: 'оценила твой отзыв на Vitamin C Serum',
    time: '12:30',
    isRead: false,
  },
  {
    id: '2',
    type: 'coupon',
    actor: 'blush',
    actorAvatar: avatar3,
    text: 'Новый купон -20% специально для тебя. Действует до 31 декабря.',
    time: '11:15',
    isRead: false,
    action: 'Получить купон',
  },
  {
    id: '3',
    type: 'follow',
    actor: '@anna_skin',
    actorAvatar: avatar1,
    text: 'подписалась на тебя',
    time: '10:02',
    isRead: false,
  },
  {
    id: '4',
    type: 'reply',
    actor: '@user01',
    actorAvatar: avatar4,
    text: 'ответила на твой комментарий: «У меня тот же вопрос! Попробовала?»',
    time: '09:44',
    isRead: true,
  },
  {
    id: '5',
    type: 'giveaway',
    actor: 'med_b',
    actorAvatar: avatar5,
    text: 'Розыгрыш стартовал! Ты участвуешь. Итоги 15 января.',
    time: '08:00',
    isRead: true,
    action: 'Подробнее',
  },
];

const YESTERDAY: Notif[] = [
  {
    id: '6',
    type: 'mention',
    actor: '@kate_beauty',
    actorAvatar: avatar2,
    text: 'упомянула тебя в отзыве: «Как посоветовала @anna_skin...»',
    time: 'Вчера, 18:30',
    isRead: true,
  },
  {
    id: '7',
    type: 'like',
    actor: '@user01',
    actorAvatar: avatar4,
    text: 'и ещё 5 человек оценили твой отзыв на AHA Toner',
    time: 'Вчера, 15:12',
    isRead: true,
  },
  {
    id: '8',
    type: 'follow',
    actor: '@masha_glow',
    actorAvatar: undefined,
    text: 'подписалась на тебя',
    time: 'Вчера, 12:05',
    isRead: true,
  },
];

const NOTIF_ICONS: Record<NotifType, string> = {
  like:     '♥',
  follow:   '👤',
  reply:    '💬',
  coupon:   '🎟️',
  mention:  '@',
  giveaway: '🎁',
};

const NOTIF_COLORS: Record<NotifType, string> = {
  like:     '#DF1760',
  follow:   '#7C3AED',
  reply:    '#2563EB',
  coupon:   '#059669',
  mention:  '#D97706',
  giveaway: '#DF1760',
};

interface NotificationsProps {
  onBack?: () => void;
}

export function Notifications({ onBack }: NotificationsProps) {
  const { t } = useLanguage();
  const n = t.notifications;
  const [notifs, setNotifs] = useState({
    today: TODAY,
    yesterday: YESTERDAY,
  });

  const unreadCount = notifs.today.filter((n) => !n.isRead).length;

  function markAllRead() {
    setNotifs((prev) => ({
      today: prev.today.map((n) => ({ ...n, isRead: true })),
      yesterday: prev.yesterday.map((n) => ({ ...n, isRead: true })),
    }));
  }

  function markRead(id: string) {
    setNotifs((prev) => ({
      today: prev.today.map((n) => n.id === id ? { ...n, isRead: true } : n),
      yesterday: prev.yesterday.map((n) => n.id === id ? { ...n, isRead: true } : n),
    }));
  }

  return (
    <div className="screen-content">
      {/* Header */}
      <div className="notifs__header">
        {onBack && (
          <button className="notifs__back" onClick={onBack}>←</button>
        )}
        <h1 className="notifs__title">{n.title}</h1>
        {unreadCount > 0 && (
          <button className="notifs__mark-all" onClick={markAllRead}>
            Прочитать все
          </button>
        )}
      </div>

      {/* Today */}
      <NotifGroup
        label="Сегодня"
        items={notifs.today}
        onRead={markRead}
      />

      {/* Yesterday */}
      <NotifGroup
        label="Вчера"
        items={notifs.yesterday}
        onRead={markRead}
      />
    </div>
  );
}

function NotifGroup({ label, items, onRead }: {
  label: string;
  items: Notif[];
  onRead: (id: string) => void;
}) {
  return (
    <div className="notifs__group">
      <span className="notifs__group-label">{label}</span>
      {items.map((n) => (
        <NotifItem key={n.id} notif={n} onRead={onRead} />
      ))}
    </div>
  );
}

function NotifItem({ notif, onRead }: { notif: Notif; onRead: (id: string) => void }) {
  const color = NOTIF_COLORS[notif.type];

  return (
    <div
      className={`notif-item${notif.isRead ? '' : ' notif-item--unread'}`}
      onClick={() => onRead(notif.id)}
    >
      {/* Avatar + type badge */}
      <div className="notif-item__avatar-wrap">
        {notif.actorAvatar
          ? <img src={notif.actorAvatar} alt={notif.actor} className="notif-item__avatar" />
          : <div className="notif-item__avatar notif-item__avatar--placeholder" style={{ background: color }}>
              {notif.actor.replace('@', '').charAt(0).toUpperCase()}
            </div>
        }
        <div className="notif-item__type-badge" style={{ background: color }}>
          <span className="notif-item__type-icon">{NOTIF_ICONS[notif.type]}</span>
        </div>
      </div>

      {/* Content */}
      <div className="notif-item__content">
        <p className="notif-item__text">
          <span className="notif-item__actor">{notif.actor}</span>
          {' '}{notif.text}
        </p>
        <span className="notif-item__time">{notif.time}</span>
        {notif.action && (
          <button className="notif-item__action">{notif.action}</button>
        )}
      </div>

      {/* Unread dot */}
      {!notif.isRead && <div className="notif-item__dot" />}
    </div>
  );
}
