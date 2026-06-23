import { useState } from 'react';
import avatar2 from '../assets/avatars/avatar-2.png';
import './UserProfile.css';

const USER_REVIEWS = [
  { id: '1', product: 'AHA/BHA Toner', brand: 'med_b', rating: 5, date: '12 дек', text: 'Кожа стала ровнее уже через неделю! Поры заметно сузились.' },
  { id: '2', product: 'Hydro Boost Cream', brand: 'blush', rating: 4, date: '28 ноя', text: 'Хорошо увлажняет, приятная текстура. Немного жирноват для лета.' },
  { id: '3', product: 'Vitamin C Serum', brand: 'Skinfood', rating: 5, date: '14 ноя', text: 'Витамин С работает — кожа заметно светлее и ровнее.' },
];

interface UserProfileProps {
  onBack?: () => void;
  onMessage?: () => void;
}

export function UserProfile({ onBack, onMessage }: UserProfileProps) {
  const [subscribed, setSubscribed] = useState(false);

  return (
    <div className="screen-content">
      {/* Hero */}
      <div className="user-profile__hero">
        <button className="user-profile__back" onClick={onBack}>←</button>
        <div className="user-profile__avatar-wrap">
          <img src={avatar2} alt="@kate_beauty" className="user-profile__avatar" />
        </div>
      </div>

      {/* Info */}
      <div className="user-profile__info">
        <h1 className="user-profile__name">@kate_beauty</h1>
        <p className="user-profile__bio">Обожаю корейскую косметику и натуральные ингредиенты 🌿 Кожа комбинированная</p>

        {/* Tier */}
        <div className="user-profile__tier">
          <span className="user-profile__tier-icon">🥉</span>
          <span className="user-profile__tier-label">Бронза</span>
          <span className="user-profile__tier-points">320 баллов</span>
        </div>

        {/* Actions */}
        <div className="user-profile__actions">
          <button
            className={`user-profile__subscribe-btn${subscribed ? ' user-profile__subscribe-btn--active' : ''}`}
            onClick={() => setSubscribed(!subscribed)}
          >
            {subscribed ? 'Подписан ✓' : 'Подписаться'}
          </button>
          <button className="user-profile__message-btn" onClick={onMessage}>
            Написать
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="user-profile__stats">
        <div className="user-profile__stat">
          <span className="user-profile__stat-num">127</span>
          <span className="user-profile__stat-label">Подписчики</span>
        </div>
        <div className="user-profile__stat-divider" />
        <div className="user-profile__stat">
          <span className="user-profile__stat-num">54</span>
          <span className="user-profile__stat-label">Подписки</span>
        </div>
        <div className="user-profile__stat-divider" />
        <div className="user-profile__stat">
          <span className="user-profile__stat-num">{USER_REVIEWS.length}</span>
          <span className="user-profile__stat-label">Отзывы</span>
        </div>
      </div>

      {/* Reviews */}
      <div className="user-profile__reviews">
        <div className="section-header">
          <span className="section-title">Отзывы</span>
        </div>
        {USER_REVIEWS.map((rv) => (
          <div key={rv.id} className="user-review-card">
            <div className="user-review-card__header">
              <div>
                <span className="user-review-card__product">{rv.product}</span>
                <span className="user-review-card__brand">@{rv.brand}</span>
              </div>
              <div className="user-review-card__right">
                <span className="user-review-card__stars">{'★'.repeat(rv.rating)}</span>
                <span className="user-review-card__date">{rv.date}</span>
              </div>
            </div>
            <p className="user-review-card__text">{rv.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
