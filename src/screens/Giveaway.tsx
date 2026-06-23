import { useState } from 'react';
import './Giveaway.css';

interface GiveawayProps {
  onBack?: () => void;
}

const CONDITIONS = [
  'Подпишись на аккаунт @blush в ДЖЕМ',
  'Поставь лайк на любой продукт из коллекции',
  'Оставь отзыв на один из продуктов бренда',
  'Пригласи подругу — она тоже должна подписаться',
];

const PRIZES = [
  { place: '1', label: 'Набор Vitamin C Serum + Hydro Cream', value: '5 000 ₽' },
  { place: '2–3', label: 'Vitamin C Serum', value: '2 490 ₽' },
  { place: '4–10', label: 'Промокод −30% на любой продукт', value: '' },
];

export function Giveaway({ onBack }: GiveawayProps) {
  const [joined, setJoined] = useState(false);
  const [participants] = useState(234);

  return (
    <div className="screen-content">
      {/* Header */}
      <div className="giveaway__header">
        <button className="giveaway__back" onClick={onBack}>←</button>
        <span className="giveaway__header-title">Розыгрыш</span>
      </div>

      {/* Brand card */}
      <div className="giveaway__brand-card">
        <div className="giveaway__brand-logo">B</div>
        <div className="giveaway__brand-info">
          <span className="giveaway__brand-name">@blush</span>
          <span className="giveaway__brand-tag">Официальный аккаунт</span>
        </div>
      </div>

      {/* Title */}
      <div className="giveaway__body">
        <h1 className="giveaway__title">
          Розыгрыш наборов по уходу за кожей
        </h1>
        <div className="giveaway__dates-row">
          <div className="giveaway__date-item">
            <span className="giveaway__date-label">Начало</span>
            <span className="giveaway__date-value">1 января 2025</span>
          </div>
          <div className="giveaway__date-arrow">→</div>
          <div className="giveaway__date-item">
            <span className="giveaway__date-label">Конец</span>
            <span className="giveaway__date-value">15 января 2025</span>
          </div>
        </div>

        {/* Participants */}
        <div className="giveaway__participants">
          <span className="giveaway__participants-num">{participants + (joined ? 1 : 0)}</span>
          <span className="giveaway__participants-label">участников</span>
        </div>

        {/* Prizes */}
        <div className="giveaway__section">
          <h2 className="giveaway__section-title">🎁 Призы</h2>
          <div className="giveaway__prizes">
            {PRIZES.map((prize) => (
              <div key={prize.place} className="giveaway__prize-row">
                <div className="giveaway__prize-place">{prize.place}</div>
                <div className="giveaway__prize-info">
                  <span className="giveaway__prize-label">{prize.label}</span>
                  {prize.value && (
                    <span className="giveaway__prize-value">{prize.value}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conditions */}
        <div className="giveaway__section">
          <h2 className="giveaway__section-title">📋 Условия</h2>
          <ol className="giveaway__conditions">
            {CONDITIONS.map((cond, i) => (
              <li key={i} className="giveaway__condition-item">
                <span className="giveaway__condition-num">{i + 1}</span>
                <span className="giveaway__condition-text">{cond}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* CTA */}
        <div className="giveaway__cta">
          {joined ? (
            <div className="giveaway__joined-badge">
              <span className="giveaway__joined-icon">✓</span>
              Ты участвуешь в розыгрыше!
            </div>
          ) : (
            <button className="giveaway__join-btn" onClick={() => setJoined(true)}>
              Участвовать
            </button>
          )}
          <p className="giveaway__disclaimer">
            Победители определяются случайным образом 16 января 2025
          </p>
        </div>
      </div>
    </div>
  );
}
