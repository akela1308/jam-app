import { CouponCard, type Coupon } from '../components/CouponCard';
import { useLanguage } from '../i18n/LanguageContext';
import './Home.css';

interface HomeProps {
  userName?: string;
  onBrand?: () => void;
  onGiveaway?: () => void;
  onReview?: () => void;
  onNotifications?: () => void;
  onAllCoupons?: () => void;
  onAllEvents?: () => void;
  onBrands?: () => void;
  onLeaderboard?: () => void;
}

const COUPON_COLORS = [
  'linear-gradient(135deg, #DF1760 0%, #9B3864 100%)',
  'linear-gradient(135deg, #6c63ff 0%, #3f3d8b 100%)',
  'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
];
const COUPON_BRANDS = ['blush', 'med_b', 'skinfood'];
const COUPON_DISCOUNTS = ['-20%', '-15%', '-30%'];
const EVENT_PARTICIPANTS = [234, 189];

export function Home({ userName, onBrand, onGiveaway, onReview, onNotifications, onAllCoupons, onAllEvents, onBrands, onLeaderboard }: HomeProps) {
  const { t } = useLanguage();
  const h = t.home;
  const hd = t.homeData;

  const COUPONS: Coupon[] = (hd.coupons as Array<{title:string;expires:string}>).map((c, i) => ({
    id: String(i + 1),
    brand: COUPON_BRANDS[i],
    title: c.title,
    discount: COUPON_DISCOUNTS[i],
    expiresAt: c.expires,
    color: COUPON_COLORS[i],
  }));

  const EVENTS = (hd.events as Array<{title:string;date:string;brand:string}>).map((e, i) => ({
    id: String(i + 1),
    brand: e.brand,
    title: e.title,
    date: e.date,
    participants: EVENT_PARTICIPANTS[i],
  }));

  const TOP_REVIEW = {
    user: '@anna_skin',
    product: 'Vitamin C Serum',
    brand: 'Skinfood',
    rating: 5,
    text: hd.reviewText as string,
  };

  return (
    <div className="screen-content">
      {/* Header */}
      <div className="home__header">
        <span className="home__logo">{t.appName}</span>
        <div className="home__header-right">
          {userName && (
            <span className="home__greeting-name">{h.greeting} {userName} 👋</span>
          )}
          <button className="home__notif-btn" onClick={onNotifications} aria-label={h.notifications}>
            <BellIcon />
            <span className="home__notif-badge" />
          </button>
        </div>
      </div>

      {/* Quick nav */}
      <div className="home__quick-nav">
        <button className="home__quick-btn" onClick={onBrands}>
          <span className="home__quick-icon">🏷️</span>
          <span className="home__quick-label">{h.brands}</span>
        </button>
        <button className="home__quick-btn" onClick={onLeaderboard}>
          <span className="home__quick-icon">🏆</span>
          <span className="home__quick-label">{h.leaderboard}</span>
        </button>
        <button className="home__quick-btn" onClick={onBrand}>
          <span className="home__quick-icon">🌸</span>
          <span className="home__quick-label">{h.topBrand}</span>
        </button>
      </div>

      {/* Coupons section */}
      <section className="home__section">
        <div className="section-header">
          <span className="section-title">{h.coupons}</span>
          <button className="see-all-link" onClick={onAllCoupons}>{h.allCoupons}</button>
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
          <span className="section-title">{h.events}</span>
          <button className="see-all-link" onClick={onAllEvents}>{h.allEvents}</button>
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
                <span className="event-card__participants">{ev.participants} {h.participants}</span>
                <button className="event-card__join-btn" onClick={onGiveaway}>{h.join}</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Top review */}
      <section className="home__section">
        <div className="section-header">
          <span className="section-title">{h.reviewOfDay}</span>
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

function BellIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
