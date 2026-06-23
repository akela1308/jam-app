import goldCoin from '../assets/coins/gold-coin.svg';
import silverCoins from '../assets/coins/silver-coins.svg';
import bronzeCoin from '../assets/coins/bronze-coin.svg';
import './PointsLevels.css';

type Tier = 'bronze' | 'silver' | 'gold';

const TIERS: { id: Tier; label: string; icon: string; min: number; max: number; color: string; bg: string }[] = [
  { id: 'bronze', label: 'Бронза',  icon: bronzeCoin,  min: 0,    max: 999,  color: '#CD7F32', bg: '#FFF3E0' },
  { id: 'silver', label: 'Серебро', icon: silverCoins, min: 1000, max: 2999, color: '#9E9E9E', bg: '#F5F5F5' },
  { id: 'gold',   label: 'Золото',  icon: goldCoin,    min: 3000, max: 9999, color: '#F5A623', bg: '#FFFDE7' },
];

const EARN_WAYS = [
  { icon: '✍️', action: 'Написать отзыв',         points: '+50',  desc: 'За каждый опубликованный отзыв' },
  { icon: '❤️', action: 'Получить лайк',           points: '+5',   desc: 'За каждый лайк на твоём отзыве' },
  { icon: '👤', action: 'Новый подписчик',         points: '+10',  desc: 'Когда кто-то подписывается на тебя' },
  { icon: '🎁', action: 'Участие в розыгрыше',     points: '+20',  desc: 'За каждое участие в эвенте' },
  { icon: '📅', action: 'Ежедневный вход',         points: '+2',   desc: 'Заходи каждый день' },
  { icon: '🔗', action: 'Пригласить друга',        points: '+100', desc: 'За каждого нового пользователя по твоей ссылке' },
];

const HISTORY = [
  { id: '1', icon: '✍️', text: 'Отзыв на Vitamin C Serum',    points: +50,  date: '15 дек' },
  { id: '2', icon: '❤️', text: '12 лайков на отзыв',           points: +60,  date: '14 дек' },
  { id: '3', icon: '🎁', text: 'Участие в розыгрыше blush',    points: +20,  date: '12 дек' },
  { id: '4', icon: '✍️', text: 'Отзыв на AHA Toner',           points: +50,  date: '10 дек' },
  { id: '5', icon: '📅', text: 'Серия входов 7 дней подряд',   points: +50,  date: '10 дек' },
  { id: '6', icon: '👤', text: '3 новых подписчика',           points: +30,  date: '8 дек' },
  { id: '7', icon: '✍️', text: 'Отзыв на Hydro Cream',         points: +50,  date: '5 дек' },
  { id: '8', icon: '🔗', text: 'Приглашён 1 друг',             points: +100, date: '1 дек' },
];

interface PointsLevelsProps {
  onBack?: () => void;
  currentPoints?: number;
  currentTier?: Tier;
}

export function PointsLevels({ onBack, currentPoints = 1240, currentTier = 'silver' }: PointsLevelsProps) {
  const tier = TIERS.find((t) => t.id === currentTier) ?? TIERS[1];
  const nextTier = TIERS[TIERS.indexOf(tier) + 1];

  const progressPct = nextTier
    ? Math.round(((currentPoints - tier.min) / (nextTier.min - tier.min)) * 100)
    : 100;

  const pointsToNext = nextTier ? nextTier.min - currentPoints : 0;

  return (
    <div className="screen-content">
      {/* Header */}
      <div className="pl__header">
        {onBack && (
          <button className="pl__back" onClick={onBack}>←</button>
        )}
        <h1 className="pl__title">Баллы и уровни</h1>
      </div>

      {/* Current status card */}
      <div className="pl__status-card" style={{ background: tier.bg }}>
        <div className="pl__status-left">
          <img src={tier.icon} alt={tier.label} className="pl__tier-icon" />
          <div>
            <span className="pl__tier-label" style={{ color: tier.color }}>{tier.label}</span>
            <span className="pl__points-big">{currentPoints.toLocaleString('ru')} баллов</span>
          </div>
        </div>
        {nextTier && (
          <div className="pl__status-right">
            <span className="pl__next-label">до {nextTier.label}</span>
            <span className="pl__next-pts" style={{ color: nextTier.color }}>−{pointsToNext}</span>
          </div>
        )}
        {!nextTier && (
          <div className="pl__status-right">
            <span className="pl__max-label">Макс. уровень 🏆</span>
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div className="pl__progress-wrap">
        <div className="pl__progress-labels">
          <span>{tier.min.toLocaleString('ru')}</span>
          <span style={{ color: tier.color }}>{progressPct}%</span>
          <span>{nextTier ? nextTier.min.toLocaleString('ru') : '∞'}</span>
        </div>
        <div className="pl__progress-track">
          <div
            className="pl__progress-fill"
            style={{ width: `${progressPct}%`, background: tier.color }}
          />
        </div>
      </div>

      {/* Tier ladder */}
      <div className="pl__section">
        <span className="pl__section-title">Уровни</span>
        <div className="pl__tiers">
          {TIERS.map((t, i) => {
            const isActive = t.id === currentTier;
            const isDone = TIERS.indexOf(tier) > i;
            return (
              <div
                key={t.id}
                className={`pl__tier-row${isActive ? ' pl__tier-row--active' : ''}${isDone ? ' pl__tier-row--done' : ''}`}
              >
                <img src={t.icon} alt={t.label} className="pl__tier-row-icon" />
                <div className="pl__tier-row-info">
                  <span className="pl__tier-row-name" style={isActive ? { color: t.color } : {}}>{t.label}</span>
                  <span className="pl__tier-row-range">{t.min.toLocaleString('ru')} – {t.max.toLocaleString('ru')} баллов</span>
                </div>
                {isActive && <span className="pl__tier-row-badge" style={{ background: t.color }}>Текущий</span>}
                {isDone && <span className="pl__tier-row-done">✓</span>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Earn ways */}
      <div className="pl__section">
        <span className="pl__section-title">Как заработать баллы</span>
        <div className="pl__earn-list">
          {EARN_WAYS.map((w) => (
            <div key={w.action} className="pl__earn-row">
              <span className="pl__earn-icon">{w.icon}</span>
              <div className="pl__earn-info">
                <span className="pl__earn-action">{w.action}</span>
                <span className="pl__earn-desc">{w.desc}</span>
              </div>
              <span className="pl__earn-pts">{w.points}</span>
            </div>
          ))}
        </div>
      </div>

      {/* History */}
      <div className="pl__section">
        <span className="pl__section-title">История начислений</span>
        <div className="pl__history">
          {HISTORY.map((h) => (
            <div key={h.id} className="pl__history-row">
              <span className="pl__history-icon">{h.icon}</span>
              <div className="pl__history-info">
                <span className="pl__history-text">{h.text}</span>
                <span className="pl__history-date">{h.date}</span>
              </div>
              <span className={`pl__history-pts${h.points > 0 ? ' pl__history-pts--pos' : ''}`}>
                +{h.points}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
