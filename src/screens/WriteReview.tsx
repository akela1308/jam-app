import { useState } from 'react';
import { Button } from '../components/Button';
import './WriteReview.css';

const SKIN_TYPES = ['Нормальная', 'Сухая', 'Жирная', 'Комбинированная', 'Чувствительная'];

interface WriteReviewProps {
  onPublish?: () => void;
}

export function WriteReview({ onPublish }: WriteReviewProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [skinType, setSkinType] = useState('');

  const canSubmit = rating > 0 && title.trim() && text.trim();

  return (
    <div className="screen-content">
      <div className="write-review__header">
        <h1 className="write-review__title">Написать отзыв</h1>
      </div>

      <div className="write-review__body">
        {/* Product (placeholder) */}
        <div className="write-review__product-picker">
          <span className="write-review__product-label">Продукт</span>
          <button className="write-review__product-btn">
            Выбрать продукт →
          </button>
        </div>

        {/* Star rating */}
        <div className="write-review__section">
          <span className="write-review__section-label">Оценка</span>
          <div className="write-review__stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className={`write-review__star${(hoverRating || rating) >= star ? ' write-review__star--active' : ''}`}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
                aria-label={`${star} звёзд`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        {/* Title */}
        <div className="write-review__section">
          <label className="write-review__section-label" htmlFor="rv-title">Заголовок</label>
          <input
            id="rv-title"
            className="write-review__input"
            placeholder="Кратко опиши впечатление"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={80}
          />
        </div>

        {/* Text */}
        <div className="write-review__section">
          <label className="write-review__section-label" htmlFor="rv-text">Отзыв</label>
          <textarea
            id="rv-text"
            className="write-review__textarea"
            placeholder="Расскажи подробнее — состав, текстура, результат..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={5}
          />
        </div>

        {/* Skin type chips */}
        <div className="write-review__section">
          <span className="write-review__section-label">Тип кожи</span>
          <div className="write-review__chips">
            {SKIN_TYPES.map((type) => (
              <button
                key={type}
                className={`write-review__chip${skinType === type ? ' write-review__chip--active' : ''}`}
                onClick={() => setSkinType(type === skinType ? '' : type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Photo */}
        <div className="write-review__section">
          <span className="write-review__section-label">Фото</span>
          <button className="write-review__photo-btn">
            <span className="write-review__photo-plus">＋</span>
            Добавить фото
          </button>
        </div>

        {/* Submit */}
        <div className="write-review__submit">
          <Button fullWidth disabled={!canSubmit} onClick={onPublish}>
            Опубликовать отзыв
          </Button>
        </div>
      </div>
    </div>
  );
}
