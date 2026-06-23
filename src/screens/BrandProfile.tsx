import { useState } from 'react';
import { Button } from '../components/Button';
import type { Product } from './ProductDetail';
import './BrandProfile.css';

type BrandTab = 'products' | 'reviews';

const PRODUCTS: Product[] = [
  { id: '1', name: 'Vitamin C Serum',     rating: 4.8, reviews: 124, price: '2 490 ₽' },
  { id: '2', name: 'Hydro Boost Cream',   rating: 4.6, reviews: 89,  price: '1 890 ₽' },
  { id: '3', name: 'AHA/BHA Toner',       rating: 4.9, reviews: 211, price: '1 490 ₽' },
  { id: '4', name: 'Retinol Night Serum', rating: 4.7, reviews: 67,  price: '3 290 ₽' },
];

const REVIEWS = [
  { id: '1', user: '@anna_skin',   product: 'Vitamin C Serum',   rating: 5, date: '15 дек', text: 'Лучшая сыворотка с витамином С! Кожа сияет уже через неделю.' },
  { id: '2', user: '@kate_beauty', product: 'Hydro Boost Cream', rating: 4, date: '10 дек', text: 'Отличное увлажнение, но немного тяжёлый для лета.' },
  { id: '3', user: '@user01',      product: 'AHA/BHA Toner',     rating: 5, date: '5 дек',  text: 'Поры стали заметно меньше, текстура кожи выровнялась.' },
];

interface BrandProfileProps {
  onBack?: () => void;
  onGiveaway?: () => void;
  onProduct?: (p: Product) => void;
}

export function BrandProfile({ onBack, onGiveaway, onProduct }: BrandProfileProps) {
  const [activeTab, setActiveTab] = useState<BrandTab>('products');
  const [subscribed, setSubscribed] = useState(false);

  return (
    <div className="screen-content">
      {/* Hero */}
      <div className="brand-profile__hero">
        <button className="brand-profile__back" onClick={onBack}>
          ←
        </button>
        <div className="brand-profile__logo-wrap">
          <div className="brand-profile__logo">B</div>
        </div>
      </div>

      {/* Info */}
      <div className="brand-profile__info">
        <h1 className="brand-profile__name">blush</h1>
        <p className="brand-profile__bio">Корейская косметика для чувствительной кожи. Натуральные ингредиенты, дерматологически протестировано.</p>

        {/* Stats */}
        <div className="brand-profile__stats">
          <div className="brand-profile__stat">
            <span className="brand-profile__stat-num">12.4K</span>
            <span className="brand-profile__stat-label">Подписчики</span>
          </div>
          <div className="brand-profile__stat-divider" />
          <div className="brand-profile__stat">
            <span className="brand-profile__stat-num">{PRODUCTS.length}</span>
            <span className="brand-profile__stat-label">Продукты</span>
          </div>
          <div className="brand-profile__stat-divider" />
          <div className="brand-profile__stat">
            <span className="brand-profile__stat-num">491</span>
            <span className="brand-profile__stat-label">Отзывы</span>
          </div>
        </div>

        {/* Actions */}
        <div className="brand-profile__actions">
          <Button
            fullWidth
            variant={subscribed ? 'secondary' : 'primary'}
            onClick={() => setSubscribed(!subscribed)}
          >
            {subscribed ? 'Подписан ✓' : 'Подписаться'}
          </Button>
          {onGiveaway && (
            <button className="brand-profile__giveaway-btn" onClick={onGiveaway}>
              🎁 Розыгрыш
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="brand-profile__tabs">
        <button
          className={`brand-profile__tab${activeTab === 'products' ? ' brand-profile__tab--active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          Продукты
        </button>
        <button
          className={`brand-profile__tab${activeTab === 'reviews' ? ' brand-profile__tab--active' : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          Отзывы
        </button>
      </div>

      {/* Tab content */}
      {activeTab === 'products' ? (
        <div className="brand-profile__products">
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
                  <span className="brand-product-card__reviews">· {p.reviews} отзывов</span>
                </div>
                <span className="brand-product-card__price">{p.price}</span>
              </div>
              <button className="brand-product-card__arrow">›</button>
            </div>
          ))}
        </div>
      ) : (
        <div className="brand-profile__reviews">
          {REVIEWS.map((rv) => (
            <div key={rv.id} className="brand-review-card">
              <div className="brand-review-card__header">
                <span className="brand-review-card__user">{rv.user}</span>
                <div className="brand-review-card__right">
                  <span className="brand-review-card__stars">{'★'.repeat(rv.rating)}</span>
                  <span className="brand-review-card__date">{rv.date}</span>
                </div>
              </div>
              <span className="brand-review-card__product">{rv.product}</span>
              <p className="brand-review-card__text">{rv.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
