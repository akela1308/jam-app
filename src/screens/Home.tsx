import { CouponCard, type Coupon } from '../components/CouponCard';
import './Home.css';

interface HomeProps {
  userName?: string;
  onBrand?: () => void;
  onGiveaway?: () => void;
  onReview?: () => void;
}

const COUPONS: Coupon[] = [
  { id: '1', brand: 'blush', title: 'Holiday Cards\nby blush', discount: '-20%', expiresAt: '31 дек', color: 'linear-gradient(135deg, #DF1760 0%, #9B3864 100%)' },
  { id: '2', brand: 'med_b', title: 'Осенняя\nколлекция', discount: '-15%', expiresAt: '15 янв', color: 'linear-gradient(135deg, #6c63ff 0%, #3f3d8b 100%)' },
  { id: '3', brand: 'skinfood', title: 'Зимний уход\nдля лица', discount: '-30%', expiresAt: '1 фев', color: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' },
];

const EVENTS = [
  { id: '1', brand: 'blush', title: 'Розыгрыш наборов\nпо уходу за кожей', date: '1–15 янв', participants: 234 },
  { id: '2', brand: 'med_b', title: 'Марафон красоты\nс подарками', date: '10–20 янв', participants: 189 },
];

const TOP_REVIEW = {
  user: '@anna_skin',
  product: 'Vitamin C Serum',
  brand: 'Skinfood',
  rating: 5,
  text: 'Пользуюсь уже месяц — кожа стала заметно ровнее и светлее. Витамин С в этой сыворотке работает отлично!',
};

export function Home({ userName, onBrand, onGiveaway, onReview }: HomeProps) {
  return (
    <div className="screen-content">
      {/* Header */}
      <div className="home__header">
        <span className="home__logo">ДЖЕМ</span>
        {userName && (
          <span className="home__greeting-name">Привет, {userName} 👋</span>
        )}
      </div>

      {/* Coupons section */}
      <section className="home__section">
        <div className="section-header">
          <span className="section-title">Купоны</span>
          <button className="see-all-link">Все купоны</button>
        </div>
        <div className="home__coupons-scroll">
          <div className="home__coupons-track">
            {COUPONS.map((c) => (
              <CouponCard key={c.id} coupon={c} />
            ))}
          </div>
        </div>
      </section>

      {/* Events section */}
      <section className="home__section">
        <div className="section-header">
          <span className="section-title">Эвенты</span>
          <button className="see-all-link">Все</button>
        </div>
        <div className="home__events">
          {EVENTS.map((ev) => (
            <div key={ev.id} className="event-card">
              <div className="event-card__left">
                <span className="event-card__brand">@{ev.brand}</span>
                <span className="event-card__title">{ev.title}</span>
                <span className="event-card__date">{ev.date}</span>
              </div>
              <div className="event-card__right">
                <span className="event-card__participants">{ev.participants} участников</span>
                <button className="event-card__join-btn" onClick={onGiveaway}>Участвовать</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Top review */}
      <section className="home__section">
        <div className="section-header">
          <span className="section-title">Отзыв дня</span>
        </div>
        <div className="top-review" onClick={onReview} style={{cursor:'pointer'}}>
          <div className="top-review__header">
            <div className="top-review__user-info">
              <div className="top-review__avatar">
                {TOP_REVIEW.user.charAt(1).toUpperCase()}
              </div>
              <div>
                <span className="top-review__username">{TOP_REVIEW.user}</span>
                <span className="top-review__product">{TOP_REVIEW.brand} — {TOP_REVIEW.product}</span>
              </div>
            </div>
            <div className="top-review__stars">
              {'★'.repeat(TOP_REVIEW.rating)}
            </div>
          </div>
          <p className="top-review__text">{TOP_REVIEW.text}</p>
        </div>
      </section>
    </div>
  );
}
