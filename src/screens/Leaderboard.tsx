import { useState } from 'react';
import avatar1 from '../assets/avatars/avatar-1.png';
import avatar2 from '../assets/avatars/avatar-2.png';
import avatar3 from '../assets/avatars/avatar-3.png';
import { useLanguage } from '../i18n/LanguageContext';
import './Leaderboard.css';

type Period = 'week' | 'month' | 'all';

interface LeaderEntry {
  rank: number;
  name: string;
  username: string;
  avatarUrl?: string;
  reviewCount: number;
  avgRating: number;
  likes: number;
  isMe?: boolean;
}

const DATA: Record<Period, LeaderEntry[]> = {
  week: [
    { rank: 1, name: 'Анна',    username: '@anna_skin',   avatarUrl: avatar1, reviewCount: 14, avgRating: 4.9, likes: 312, isMe: false },
    { rank: 2, name: 'Марина',  username: '@marina_glow', avatarUrl: avatar2, reviewCount: 11, avgRating: 4.8, likes: 247 },
    { rank: 3, name: 'Катя',    username: '@kate_care',   avatarUrl: avatar3, reviewCount: 9,  avgRating: 4.7, likes: 198 },
    { rank: 4, name: 'Ольга',   username: '@olga_b',      reviewCount: 8,  avgRating: 4.6, likes: 164, isMe: true },
    { rank: 5, name: 'Дарья',   username: '@dasha_skin',  reviewCount: 7,  avgRating: 4.8, likes: 143 },
    { rank: 6, name: 'Настя',   username: '@nastya_ru',   reviewCount: 6,  avgRating: 4.5, likes: 121 },
    { rank: 7, name: 'Лера',    username: '@lera_glow',   reviewCount: 5,  avgRating: 4.9, likes: 112 },
    { rank: 8, name: 'Света',   username: '@sveta_care',  reviewCount: 5,  avgRating: 4.7, likes: 98 },
    { rank: 9, name: 'Вика',    username: '@vika_beauty', reviewCount: 4,  avgRating: 4.6, likes: 87 },
    { rank: 10, name: 'Женя',   username: '@zhenya_sk',   reviewCount: 4,  avgRating: 4.4, likes: 73 },
  ],
  month: [
    { rank: 1, name: 'Марина',  username: '@marina_glow', avatarUrl: avatar2, reviewCount: 42, avgRating: 4.9, likes: 1240 },
    { rank: 2, name: 'Анна',    username: '@anna_skin',   avatarUrl: avatar1, reviewCount: 38, avgRating: 4.8, likes: 1050, isMe: false },
    { rank: 3, name: 'Дарья',   username: '@dasha_skin',  avatarUrl: avatar3, reviewCount: 31, avgRating: 4.7, likes: 876 },
    { rank: 4, name: 'Ольга',   username: '@olga_b',      reviewCount: 28, avgRating: 4.6, likes: 712, isMe: true },
    { rank: 5, name: 'Катя',    username: '@kate_care',   reviewCount: 25, avgRating: 4.8, likes: 634 },
    { rank: 6, name: 'Настя',   username: '@nastya_ru',   reviewCount: 22, avgRating: 4.7, likes: 591 },
    { rank: 7, name: 'Лера',    username: '@lera_glow',   reviewCount: 19, avgRating: 4.9, likes: 548 },
    { rank: 8, name: 'Света',   username: '@sveta_care',  reviewCount: 17, avgRating: 4.5, likes: 412 },
    { rank: 9, name: 'Вика',    username: '@vika_beauty', reviewCount: 14, avgRating: 4.7, likes: 387 },
    { rank: 10, name: 'Женя',   username: '@zhenya_sk',   reviewCount: 12, avgRating: 4.4, likes: 298 },
  ],
  all: [
    { rank: 1, name: 'Марина',  username: '@marina_glow', avatarUrl: avatar2, reviewCount: 187, avgRating: 4.9, likes: 5814 },
    { rank: 2, name: 'Дарья',   username: '@dasha_skin',  avatarUrl: avatar3, reviewCount: 164, avgRating: 4.8, likes: 4923 },
    { rank: 3, name: 'Лера',    username: '@lera_glow',   avatarUrl: avatar1, reviewCount: 142, avgRating: 4.9, likes: 4401 },
    { rank: 4, name: 'Анна',    username: '@anna_skin',   reviewCount: 128, avgRating: 4.7, likes: 3872, isMe: false },
    { rank: 5, name: 'Катя',    username: '@kate_care',   reviewCount: 119, avgRating: 4.8, likes: 3441 },
    { rank: 6, name: 'Ольга',   username: '@olga_b',      reviewCount: 98,  avgRating: 4.6, likes: 2891, isMe: true },
    { rank: 7, name: 'Настя',   username: '@nastya_ru',   reviewCount: 87,  avgRating: 4.7, likes: 2340 },
    { rank: 8, name: 'Света',   username: '@sveta_care',  reviewCount: 76,  avgRating: 4.5, likes: 1987 },
    { rank: 9, name: 'Вика',    username: '@vika_beauty', reviewCount: 64,  avgRating: 4.7, likes: 1754 },
    { rank: 10, name: 'Женя',   username: '@zhenya_sk',   reviewCount: 53,  avgRating: 4.4, likes: 1290 },
  ],
};

const PERIOD_LABELS: Record<Period, string> = {
  week: 'Неделя',
  month: 'Месяц',
  all: 'Всё время',
};

const PODIUM_COLORS = ['#F59E0B', '#94A3B8', '#CD7C2F'];

interface LeaderboardProps {
  onBack?: () => void;
}

export function Leaderboard({ onBack }: LeaderboardProps) {
  const { t } = useLanguage();
  const lb = t.leaderboard;
  const [period, setPeriod] = useState<Period>('week');
  const entries = DATA[period];
  const top3 = entries.slice(0, 3);
  const rest = entries.slice(3);
  const me = entries.find((e) => e.isMe);

  return (
    <div className="screen-content">
      {/* Header */}
      <div className="lb__header">
        {onBack && <button className="lb__back" onClick={onBack}>←</button>}
        <h1 className="lb__title">Лидерборд</h1>
      </div>

      {/* Period switcher */}
      <div className="lb__period-row">
        {(Object.keys(PERIOD_LABELS) as Period[]).map((p) => (
          <button
            key={p}
            className={`lb__period-btn${period === p ? ' lb__period-btn--active' : ''}`}
            onClick={() => setPeriod(p)}
          >
            {PERIOD_LABELS[p]}
          </button>
        ))}
      </div>

      {/* Podium — top 3 */}
      <div className="lb__podium">
        {/* 2nd — left */}
        <PodiumSlot entry={top3[1]} height={80} color={PODIUM_COLORS[1]} />
        {/* 1st — center */}
        <PodiumSlot entry={top3[0]} height={100} color={PODIUM_COLORS[0]} crown />
        {/* 3rd — right */}
        <PodiumSlot entry={top3[2]} height={60} color={PODIUM_COLORS[2]} />
      </div>

      {/* My position sticky banner (if not in top 3) */}
      {me && me.rank > 3 && (
        <div className="lb__me-banner">
          <span className="lb__me-rank">#{me.rank}</span>
          <span className="lb__me-label">{lb.myPosition}</span>
          <span className="lb__me-reviews">{me.reviewCount}} {lb.reviews}</span>
          <span className="lb__me-likes">♥ {me.likes}</span>
        </div>
      )}

      {/* Ranks 4–10 */}
      <div className="lb__list">
        {rest.map((entry) => (
          <div key={entry.rank} className={`lb__row${entry.isMe ? ' lb__row--me' : ''}`}>
            <span className="lb__row-rank">#{entry.rank}</span>

            <div className="lb__row-avatar-wrap">
              {entry.avatarUrl
                ? <img src={entry.avatarUrl} className="lb__row-avatar" alt={entry.name} />
                : <div className="lb__row-avatar lb__row-avatar--placeholder">{entry.name[0]}</div>
              }
            </div>

            <div className="lb__row-body">
              <span className="lb__row-name">{entry.name}</span>
              <span className="lb__row-username">{entry.username}</span>
            </div>

            <div className="lb__row-stats">
              <span className="lb__row-reviews">{entry.reviewCount} отз.</span>
              <span className="lb__row-rating">★ {entry.avgRating}</span>
              <span className="lb__row-likes">♥ {entry.likes}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface PodiumSlotProps {
  entry: LeaderEntry;
  height: number;
  color: string;
  crown?: boolean;
}

function PodiumSlot({ entry, height, color, crown }: PodiumSlotProps) {
  return (
    <div className="lb__podium-slot">
      {crown && <span className="lb__crown">👑</span>}
      <div className="lb__podium-avatar-wrap">
        {entry.avatarUrl
          ? <img src={entry.avatarUrl} className="lb__podium-avatar" alt={entry.name} style={{ borderColor: color }} />
          : <div className="lb__podium-avatar lb__podium-avatar--placeholder" style={{ borderColor: color, background: color + '20', color }}>{entry.name[0]}</div>
        }
        <span className="lb__podium-rank" style={{ background: color }}>#{entry.rank}</span>
      </div>
      <span className="lb__podium-name">{entry.name}</span>
      <span className="lb__podium-reviews">{entry.reviewCount} отз.</span>
      <div className="lb__podium-block" style={{ height, background: color + '20', borderTop: `3px solid ${color}` }}>
        <span className="lb__podium-block-rank" style={{ color }}>
          {entry.rank === 1 ? '1' : entry.rank === 2 ? '2' : '3'}
        </span>
      </div>
    </div>
  );
}
