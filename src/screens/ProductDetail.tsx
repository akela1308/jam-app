import { useState } from 'react';
import { Button } from '../components/Button';
import avatar2 from '../assets/avatars/avatar-2.png';
import avatar3 from '../assets/avatars/avatar-3.png';
import avatar4 from '../assets/avatars/avatar-4.png';
import './ProductDetail.css';

export interface Product {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  price: string;
}

const INGREDIENTS = 'Aqua, Ascorbic Acid 15%, Niacinamide 5%, Hyaluronic Acid, Glycerin, Panthenol, Tocopherol, Allantoin, Centella Asiatica Extract';

const PRODUCT_REVIEWS = [
  {
    id: '1',
    user: '@anna_skin',
    avatar: avatar2,
    rating: 5,
    date: '15 дек',
    text: 'Пользуюсь уже месяц — кожа стала заметно ровнее. Витамин С работает отлично, пигментация светлеет.',
    skinType: 'Нормальная',
    helpful: 34,
  },
  {
    id: '2',
    user: '@kate_beauty',
    avatar: avatar3,
    rating: 4,
    date: '10 дек',
    text: 'Хорошая сыворотка, но нужно время чтобы привыкнуть. Лёгкий запах — для меня ок.',
    skinType: 'Комбинированная',
    helpful: 18,
  },
  {
    id: '3',
    user: '@user_masha',
    avatar: avatar4,
    rating: 5,
    date: '2 дек',
    text: 'Идеально для утреннего ухода под санскрин. Кожа выглядит сияющей весь день.',
    skinType: 'Сухая',
    helpful: 27,
  },
];

const RATING_DIST = [
  { stars: 5, pct: 72 },
  { stars: 4, pct: 18 },
  { stars: 3, pct: 6 },
  { stars: 2, pct: 2 },
  { stars: 1, pct: 2 },
];

interface ProductDetailProps {
  product?: Product;
  onBack?: () => void;
  onWriteReview?: () => void;
}

export function ProductDetail({ product, onBack, onWriteReview }: ProductDetailProps) {
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  const name = product?.name ?? 'Vitamin C Serum';
  const rating = product?.rating ?? 4.8;
  const reviewCount = product?.reviews ?? 124;
  const price = product?.price ?? '2 490 ₽';

  function toggleLike(id: string) {
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <div className="screen-content">
      {/* Back */}
      <div className="pd__top-bar">
        <button className="pd__back" onClick={onBack}>←</button>
        <span className="pd__top-title">Продукт</span>
        <div style={{ width: 32 }} />
      </div>

      {/* Product hero */}
      <div className="pd__hero">
        <div className="pd__img-placeholder">
          <span className="pd__img-emoji">🧴</span>
        </div>
      </div>

      {/* Info block */}
      <div className="pd__info">
        <div className="pd__brand-tag">blush</div>
        <h1 className="pd__name">{name}</h1>
        <div className="pd__price">{price}</div>

        {/* Rating summary */}
        <div className="pd__rating-block">
          <div className="pd__rating-big">
            <span className="pd__rating-num">{rating}</span>
            <span className="pd__rating-star">★</span>
          </div>
          <div className="pd__rating-bars">
            {RATING_DIST.map((d) => (
              <div key={d.stars} className="pd__rating-row">
                <span className="pd__rating-label">{d.stars}</span>
                <div className="pd__bar-track">
                  <div className="pd__bar-fill" style={{ width: `${d.pct}%` }} />
                </div>
                <span className="pd__rating-pct">{d.pct}%</span>
              </div>
            ))}
          </div>
        </div>
        <div className="pd__review-count">{reviewCount} отзывов</div>
      </div>

      {/* Ingredients */}
      <div className="pd__section">
        <span className="pd__section-title">Состав</span>
        <p className="pd__ingredients">{INGREDIENTS}</p>
      </div>

      {/* Reviews */}
      <div className="pd__section">
        <div className="section-header">
          <span className="section-title">Отзывы</span>
          <button className="see-all-link" onClick={onWriteReview}>+ Написать</button>
        </div>

        <div className="pd__reviews">
          {PRODUCT_REVIEWS.map((rv) => (
            <div key={rv.id} className="pd-review">
              <div className="pd-review__header">
                <img src={rv.avatar} alt={rv.user} className="pd-review__avatar" />
                <div className="pd-review__meta">
                  <span className="pd-review__user">{rv.user}</span>
                  <span className="pd-review__skin">Тип: {rv.skinType}</span>
                </div>
                <div className="pd-review__right">
                  <span className="pd-review__stars">{'★'.repeat(rv.rating)}</span>
                  <span className="pd-review__date">{rv.date}</span>
                </div>
              </div>
              <p className="pd-review__text">{rv.text}</p>
              <button
                className={`pd-review__like${liked[rv.id] ? ' pd-review__like--active' : ''}`}
                onClick={() => toggleLike(rv.id)}
              >
                {liked[rv.id] ? '♥' : '♡'} {rv.helpful + (liked[rv.id] ? 1 : 0)}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="pd__cta">
        <Button fullWidth onClick={onWriteReview}>
          Написать отзыв
        </Button>
      </div>
    </div>
  );
}
