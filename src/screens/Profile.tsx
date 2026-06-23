import { Button } from '../components/Button';
import goldCoin from '../assets/coins/gold-coin.svg';
import silverCoins from '../assets/coins/silver-coins.svg';
import bronzeCoin from '../assets/coins/bronze-coin.svg';
import avatar1 from '../assets/avatars/avatar-1.png';
import './Profile.css';

type Tier = 'bronze' | 'silver' | 'gold';

const TIER_ICONS: Record<Tier, string> = {
  bronze: bronzeCoin,
  silver: silverCoins,
  gold: goldCoin,
};

const TIER_LABELS: Record<Tier, string> = {
  bronze: 'Бронза',
  silver: 'Серебро',
  gold: 'Золото',
};

const MY_REVIEWS = [
  { id: '1', product: 'Vitamin C Serum', brand: 'Skinfood', rating: 5, date: '15 дек', text: 'Отличная сыворотка — кожа стала заметно ровнее через 3 недели.' },
  { id: '2', product: 'Hydro Cream', brand: 'blush', rating: 4, date: '2 дек', text: 'Очень увлажняет, но немного жирный для комбинированной кожи.' },
  { id: '3', product: 'AHA Toner', brand: 'med_b', rating: 5, date: '20 ноя', text: 'Лучший тонер с кислотами! Поры стали меньше, кожа ровнее.' },
];

export function Profile() {
  const tier: Tier = 'silver';
  const points = 1240;

  return (
    <div className="screen-content">
      {/* Header background */}
      <div className="profile__hero">
        <div className="profile__avatar-wrap">
          <img src={avatar1} alt="Мой профиль" className="profile__avatar" />
        </div>
      </div>

      {/* User info */}
      <div className="profile__info">
        <h1 className="profile__name">@anna_skin</h1>
        <p className="profile__bio">Люблю корейский уход 🌿 Делюсь честными отзывами</p>

        {/* Tier badge */}
        <div className="profile__tier">
          <img src={TIER_ICONS[tier]} alt={TIER_LABELS[tier]} className="profile__tier-icon" />
          <span className="profile__tier-label">{TIER_LABELS[tier]}</span>
          <span className="profile__tier-points">{points.toLocaleString('ru')} баллов</span>
        </div>

        {/* Action buttons */}
        <div className="profile__actions">
          <Button variant="secondary">Редактировать</Button>
          <Button variant="ghost">Поделиться</Button>
        </div>
      </div>

      {/* Stats row */}
      <div className="profile__stats">
        <div className="profile__stat">
          <span className="profile__stat-num">48</span>
          <span className="profile__stat-label">Подписчики</span>
        </div>
        <div className="profile__stat-divider" />
        <div className="profile__stat">
          <span className="profile__stat-num">12</span>
          <span className="profile__stat-label">Подписки</span>
        </div>
        <div className="profile__stat-divider" />
        <div className="profile__stat">
          <span className="profile__stat-num">{MY_REVIEWS.length}</span>
          <span className="profile__stat-label">Отзывы</span>
        </div>
      </div>

      {/* Reviews list */}
      <div className="profile__reviews">
        <div className="section-header">
          <span className="section-title">Мои отзывы</span>
        </div>

        {MY_REVIEWS.map((rv) => (
          <div key={rv.id} className="profile-review-card">
            <div className="profile-review-card__header">
              <div>
                <span className="profile-review-card__product">{rv.product}</span>
                <span className="profile-review-card__brand">@{rv.brand}</span>
              </div>
              <div className="profile-review-card__right">
                <span className="profile-review-card__stars">{'★'.repeat(rv.rating)}</span>
                <span className="profile-review-card__date">{rv.date}</span>
              </div>
            </div>
            <p className="profile-review-card__text">{rv.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
