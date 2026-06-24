import { Button } from '../components/Button';
import goldCoin from '../assets/coins/gold-coin.svg';
import silverCoins from '../assets/coins/silver-coins.svg';
import bronzeCoin from '../assets/coins/bronze-coin.svg';
import avatar1 from '../assets/avatars/avatar-1.png';
import type { TelegramUser } from '../hooks/useTelegramUser';
import { useLanguage } from '../i18n/LanguageContext';
import './Profile.css';

type Tier = 'bronze' | 'silver' | 'gold';

const TIER_ICONS: Record<Tier, string> = {
  bronze: bronzeCoin,
  silver: silverCoins,
  gold: goldCoin,
};



const MY_REVIEWS = [
  { id: '1', product: 'Vitamin C Serum', brand: 'Skinfood', rating: 5, date: '15 дек', text: 'Отличная сыворотка — кожа стала заметно ровнее через 3 недели.' },
  { id: '2', product: 'Hydro Cream', brand: 'blush', rating: 4, date: '2 дек', text: 'Очень увлажняет, но немного жирный для комбинированной кожи.' },
  { id: '3', product: 'AHA Toner', brand: 'med_b', rating: 5, date: '20 ноя', text: 'Лучший тонер с кислотами! Поры стали меньше, кожа ровнее.' },
];

interface ProfileProps {
  tgUser?: TelegramUser | null;
  displayName?: string;
  onEdit?: () => void;
  onSettings?: () => void;
  onPoints?: () => void;
}

export function Profile({ tgUser, displayName, onEdit, onSettings, onPoints }: ProfileProps) {
  const { t } = useLanguage();
  const p = t.profile;
  const tier: Tier = 'silver';
  const points = 1240;

  const avatarSrc = tgUser?.photo_url ?? null;
  const nameLabel = displayName ?? '@anna_skin';

  return (
    <div className="screen-content">
      {/* Header background */}
      <div className="profile__hero">
        <button className="profile__settings-btn" onClick={onSettings} aria-label="Настройки">
          <GearIcon />
        </button>
        <div className="profile__avatar-wrap">
          {avatarSrc
            ? <img src={avatarSrc} alt="Аватар" className="profile__avatar" referrerPolicy="no-referrer" />
            : <img src={avatar1} alt="Мой профиль" className="profile__avatar" />
          }
        </div>
      </div>

      {/* User info */}
      <div className="profile__info">
        <h1 className="profile__name">{nameLabel}</h1>
        <p className="profile__bio">Люблю корейский уход 🌿 Делюсь честными отзывами</p>

        {/* Tier badge — tappable → Points screen */}
        <button className="profile__tier" onClick={onPoints}>
          <img src={TIER_ICONS[tier]} alt={tier} className="profile__tier-icon" />
          <span className="profile__tier-label">{p.tierLabels[tier]}</span>
          <span className="profile__tier-points">{points.toLocaleString('ru')} {p.points}</span>
          <span className="profile__tier-arrow">›</span>
        </button>

        {/* Action buttons */}
        <div className="profile__actions">
          <Button variant="secondary" onClick={onEdit}>{p.edit}</Button>
          <Button variant="ghost">{p.share}</Button>
        </div>
      </div>

      {/* Stats row */}
      <div className="profile__stats">
        <div className="profile__stat">
          <span className="profile__stat-num">48</span>
          <span className="profile__stat-label">{p.followers}</span>
        </div>
        <div className="profile__stat-divider" />
        <div className="profile__stat">
          <span className="profile__stat-num">12</span>
          <span className="profile__stat-label">{p.following}</span>
        </div>
        <div className="profile__stat-divider" />
        <div className="profile__stat">
          <span className="profile__stat-num">{MY_REVIEWS.length}</span>
          <span className="profile__stat-label">{p.reviews}</span>
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

function GearIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}
