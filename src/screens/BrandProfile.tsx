import { useState } from 'react';
import type { Product } from './ProductDetail';
import { useLanguage } from '../i18n/LanguageContext';
import './BrandProfile.css';

type BrandTab = 'reviews' | 'products';

const PRODUCTS: Product[] = [
  { id: '1', name: 'Vitamin C Serum',     rating: 4.8, reviews: 124, price: '2 490 ₽' },
  { id: '2', name: 'Hydro Boost Cream',   rating: 4.6, reviews: 89,  price: '1 890 ₽' },
  { id: '3', name: 'AHA/BHA Toner',       rating: 4.9, reviews: 211, price: '1 490 ₽' },
  { id: '4', name: 'Retinol Night Serum', rating: 4.7, reviews: 67,  price: '3 290 ₽' },
];

const REVIEWS = [
  {
    id: '1', user: '@anna_skin', avatar: 'https://i.pravatar.cc/48?img=1',
    product: 'Vitamin C Serum',
    photo: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200&q=80',
    rating: 5, date: '15 дек',
    text: 'Лучшая сыворотка с витамином С! Кожа сияет уже через неделю использования.',
  },
  {
    id: '2', user: '@kate_beauty', avatar: 'https://i.pravatar.cc/48?img=5',
    product: 'Hydro Boost Cream',
    photo: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=200&q=80',
    rating: 4, date: '10 дек',
    text: 'Отличное увлажнение, но немного тяжёлый для лета. Зимой — идеально.',
  },
  {
    id: '3', user: '@user01', avatar: 'https://i.pravatar.cc/48?img=3',
    product: 'AHA/BHA Toner',
    photo: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=200&q=80',
    rating: 5, date: '5 дек',
    text: 'Поры стали заметно меньше, текстура кожи выровнялась за 2 недели.',
  },
];

// Social icons (VK + Telegram matching Figma)
const SOCIAL = [
  { id: 'vk',  label: 'VK',       color: '#0077FF', bg: '#E8F1FF', letter: 'V' },
  { id: 'tg',  label: 'Telegram', color: '#26A5E4', bg: '#E3F4FC', letter: 'T' },
];

interface BrandProfileProps {
  onBack?: () => void;
  onGiveaway?: () => void;
  onProduct?: (p: Product) => void;
}

export function BrandProfile({ onBack, onGiveaway, onProduct }: BrandProfileProps) {
  const [activeTab, setActiveTab] = useState<BrandTab>('reviews');
  const [subscribed, setSubscribed] = useState(false);

  return (
    <div className="screen-content">
      {/* Top bar */}
      <div className="bp__topbar">
        <button className="bp__back" onClick={onBack}>✕</button>
      </div>

      {/* Hero — avatar left, info right (matching Figma layout) */}
      <div className="bp__hero">
        <div className="bp__avatar-wrap">
          <img
            src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&q=80"
            alt="blush brand"
            className="bp__avatar"
          />
          <div className="bp__rating-badge">
            <span className="bp__rating-star">★</span>
            <span className="bp__rating-num">4.8</span>
          </div>
        </div>

        <div className="bp__hero-info">
          <h1 className="bp__brand-name">@blush</h1>
          <div className="bp__stats-list">
            <span className="bp__stat-row"><strong>12.4K</strong> {bp.followers}</span>
            <span className="bp__stat-row"><strong>{PRODUCTS.length}</strong> {bp.productsCount}</span>
            <span className="bp__stat-row"><strong>491</strong> {bp.reviewsCount}</span>
          </div>
          {/* Social icons */}
          <div className="bp__social">
            {SOCIAL.map((s) => (
              <div key={s.id} className="bp__social-icon" style={{ background: s.bg, color: s.color }}>
                <span className="bp__social-letter">{s.letter}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action buttons — green like Figma */}
      <div className="bp__actions">
        <button
          className={`bp__btn bp__btn--subscribe${subscribed ? ' bp__btn--subscribed' : ''}`}
          onClick={() => setSubscribed(!subscribed)}
        >
          {subscribed ? 'Подписан ✓' : 'Подписаться'}
        </button>
        <button className="bp__btn bp__btn--message" onClick={onGiveaway}>
          Сообщение
        </button>
      </div>

      {/* Tabs — Reviews first (Figma order) */}
      <div className="bp__tabs">
        <button
          className={`bp__tab${activeTab === 'reviews' ? ' bp__tab--active' : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          Отзывы
        </button>
        <button
          className={`bp__tab${activeTab === 'products' ? ' bp__tab--active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          Продукты
        </button>
      </div>

      {/* Tab content */}
      {activeTab === 'reviews' ? (
        <div className="bp__review-list">
          {REVIEWS.map((rv) => (
            <div key={rv.id} className="bp__review-card">
              {/* Left: product photo with reviewer avatar overlapping corner */}
              <div className="bp__review-photo-wrap">
                <img src={rv.photo} alt={rv.product} className="bp__review-photo" />
                <img src={rv.avatar} alt={rv.user} className="bp__review-avatar" />
              </div>
              {/* Right: info */}
              <div className="bp__review-body">
                <span className="bp__review-product">{rv.product}</span>
                <span className="bp__review-user">{rv.user}</span>
                <p className="bp__review-text">{rv.text}</p>
                <div className="bp__review-meta">
                  <span className="bp__review-stars">{'★'.repeat(rv.rating)}</span>
                  <span className="bp__review-date">{rv.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bp__product-list">
          {PRODUCTS.map((p) => (
            <div
              key={p.id}
              className="brand-product-card brand-product-card--clickable"
              onClick={() => onProduct?.(p)}
            >
              <div className="brand-product-card__thumb" />
              <div className="brand-product-card__body">
                <span className="brand-product-card__name">{p.name}</span>
                <div className="brand-product-card__meta">
                  <span className="brand-product-card__rating">★ {p.rating}</span>
                  <span className="brand-product-card__reviews">· {p.reviews} {bp.reviewsCount}</span>
                </div>
                <span className="brand-product-card__price">{p.price}</span>
              </div>
              <button className="brand-product-card__arrow">›</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
