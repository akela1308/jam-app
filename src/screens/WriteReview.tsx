import { useState, useRef } from 'react';
import { Button } from '../components/Button';
import { useLanguage } from '../i18n/LanguageContext';
import './WriteReview.css';

/* ── Data ─────────────────────────────────────────────── */
const BRANDS = [
  { id: 'blush',    name: 'blush',     emoji: '🌸' },
  { id: 'med_b',    name: 'med_b',     emoji: '💊' },
  { id: 'skinfood', name: 'skinfood',  emoji: '🌿' },
  { id: 'some_by_mi', name: 'some by mi', emoji: '✨' },
  { id: 'cosrx',   name: 'cosrx',     emoji: '🔬' },
  { id: 'laneige', name: 'laneige',   emoji: '💎' },
];

const PRODUCTS: Record<string, { id: string; name: string }[]> = {
  blush:    [{ id: 'b1', name: 'Hydro Glow Serum' }, { id: 'b2', name: 'Rose Toner' }, { id: 'b3', name: 'SPF 50 Cream' }],
  med_b:    [{ id: 'm1', name: 'AHA Toner 7%' }, { id: 'm2', name: 'Niacinamide Serum' }, { id: 'm3', name: 'Calming Mask' }],
  skinfood: [{ id: 's1', name: 'Vitamin C Serum' }, { id: 's2', name: 'Rice Mask' }, { id: 's3', name: 'Royal Honey Cream' }],
  some_by_mi: [{ id: 'sm1', name: 'AHA BHA PHA Toner' }, { id: 'sm2', name: 'Snail Truecica Cream' }],
  cosrx:    [{ id: 'c1', name: 'Snail 96 Essence' }, { id: 'c2', name: 'BHA Blackhead Power Liquid' }],
  laneige:  [{ id: 'l1', name: 'Water Sleeping Mask' }, { id: 'l2', name: 'Lip Sleeping Mask' }],
};




/* ── Types ─────────────────────────────────────────────── */
interface WriteReviewProps {
  onPublish?: () => void;
}

interface PhotoSlot {
  id: string;
  url: string;
}

/* ── Component ─────────────────────────────────────────── */
export function WriteReview({ onPublish }: WriteReviewProps) {
  const { t } = useLanguage();
  const wr = t.writeReview;
  // Product picker
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerStep, setPickerStep] = useState<'brand' | 'product'>('brand');
  const [selectedBrand, setSelectedBrand] = useState<typeof BRANDS[0] | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<{ id: string; name: string } | null>(null);

  // Form fields
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [skinTypes, setSkinTypes] = useState<string[]>([]);
  const [pros, setPros] = useState<string[]>([]);
  const [cons, setCons] = useState<string[]>([]);
  const [photos, setPhotos] = useState<PhotoSlot[]>([]);

  // Success state
  const [published, setPublished] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const canSubmit = rating > 0 && selectedProduct !== null && text.trim().length >= 20;

  /* ── Handlers ── */
  function pickBrand(brand: typeof BRANDS[0]) {
    setSelectedBrand(brand);
    setSelectedProduct(null);
    setPickerStep('product');
  }

  function pickProduct(product: { id: string; name: string }) {
    setSelectedProduct(product);
    setPickerOpen(false);
    setPickerStep('brand');
  }

  function toggleSkinType(type: string) {
    setSkinTypes((prev) => prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]);
  }

  function toggleTag(list: string[], setList: (v: string[]) => void, tag: string) {
    setList(list.includes(tag) ? list.filter((t) => t !== tag) : [...list, tag]);
  }

  function handlePhotoAdd(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []).slice(0, 5 - photos.length);
    const newSlots: PhotoSlot[] = files.map((f) => ({
      id: Math.random().toString(36).slice(2),
      url: URL.createObjectURL(f),
    }));
    setPhotos((prev) => [...prev, ...newSlots].slice(0, 5));
    e.target.value = '';
  }

  function removePhoto(id: string) {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  }

  function handlePublish() {
    setPublished(true);
    setTimeout(() => {
      onPublish?.();
    }, 2000);
  }

  /* ── Success screen ── */
  if (published) {
    return (
      <div className="wr-success">
        <div className="wr-success__icon">🎉</div>
        <h2 className="wr-success__title">Отзыв опубликован!</h2>
        <p className="wr-success__sub">
          Спасибо! Ты получила <strong>+50 баллов</strong> за отзыв.
        </p>
        <div className="wr-success__coins">🪙 +50</div>
      </div>
    );
  }

  const displayRating = hoverRating || rating;

  return (
    <div className="screen-content">
      {/* Header */}
      <div className="write-review__header">
        <h1 className="write-review__title">{wr.title}</h1>
      </div>

      <div className="write-review__body">

        {/* ── 1. Product picker ── */}
        <div className="wr-section">
          <span className="wr-label">Продукт <span className="wr-required">*</span></span>
          <button className="wr-product-btn" onClick={() => { setPickerOpen(true); setPickerStep('brand'); }}>
            {selectedProduct && selectedBrand ? (
              <div className="wr-product-selected">
                <span className="wr-product-emoji">{selectedBrand.emoji}</span>
                <div className="wr-product-info">
                  <span className="wr-product-name">{selectedProduct.name}</span>
                  <span className="wr-product-brand">{selectedBrand.name}</span>
                </div>
                <span className="wr-product-change">Изменить</span>
              </div>
            ) : (
              <span className="wr-product-placeholder">Выбрать продукт →</span>
            )}
          </button>
        </div>

        {/* ── 2. Star rating ── */}
        <div className="wr-section">
          <span className="wr-label">Оценка <span className="wr-required">*</span></span>
          <div className="wr-stars-wrap">
            <div className="wr-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  className={`wr-star${displayRating >= star ? ' wr-star--active' : ''}`}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  aria-label={`${star} звёзд`}
                >
                  ★
                </button>
              ))}
            </div>
            {displayRating > 0 && (
              <span className="wr-star-label">{wr.ratingLabels[displayRating]}</span>
            )}
          </div>
        </div>

        {/* ── 3. Title ── */}
        <div className="wr-section">
          <div className="wr-label-row">
            <label className="wr-label" htmlFor="rv-title">Заголовок</label>
            <span className="wr-counter">{title.length}/80</span>
          </div>
          <input
            id="rv-title"
            className="wr-input"
            placeholder="Кратко опиши впечатление"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={80}
          />
        </div>

        {/* ── 4. Text ── */}
        <div className="wr-section">
          <div className="wr-label-row">
            <label className="wr-label" htmlFor="rv-text">Отзыв <span className="wr-required">*</span></label>
            <span className={`wr-counter${text.length < 20 ? ' wr-counter--warn' : ''}`}>
              {text.length < 20 ? `мин. ${20 - text.length} симв.` : `${text.length} симв.`}
            </span>
          </div>
          <textarea
            id="rv-text"
            className="wr-textarea"
            placeholder="Расскажи подробнее — состав, текстура, результат, как долго используешь..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={5}
          />
        </div>

        {/* ── 5. Плюсы ── */}
        <div className="wr-section">
          <span className="wr-label">{wr.pros}</span>
          <div className="wr-tags">
            {(wr.prosTags as string[]).map((tag: string) => (
              <button
                key={tag}
                className={`wr-tag wr-tag--pro${pros.includes(tag) ? ' wr-tag--pro-active' : ''}`}
                onClick={() => toggleTag(pros, setPros, tag)}
              >
                {pros.includes(tag) ? '✓ ' : '+ '}{tag}
              </button>
            ))}
          </div>
        </div>

        {/* ── 6. Минусы ── */}
        <div className="wr-section">
          <span className="wr-label">{wr.cons}</span>
          <div className="wr-tags">
            {(wr.consTags as string[]).map((tag: string) => (
              <button
                key={tag}
                className={`wr-tag wr-tag--con${cons.includes(tag) ? ' wr-tag--con-active' : ''}`}
                onClick={() => toggleTag(cons, setCons, tag)}
              >
                {cons.includes(tag) ? '✓ ' : '− '}{tag}
              </button>
            ))}
          </div>
        </div>

        {/* ── 7. Тип кожи ── */}
        <div className="wr-section">
          <span className="wr-label">{wr.skinType}</span>
          <div className="wr-tags">
            {(wr.skinTypes as string[]).map((type: string) => (
              <button
                key={type}
                className={`wr-tag${skinTypes.includes(type) ? ' wr-tag--skin-active' : ''}`}
                onClick={() => toggleSkinType(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* ── 8. Фото ── */}
        <div className="wr-section">
          <div className="wr-label-row">
            <span className="wr-label">Фото</span>
            <span className="wr-counter">{photos.length}/5</span>
          </div>
          <div className="wr-photos">
            {photos.map((photo) => (
              <div key={photo.id} className="wr-photo-slot">
                <img src={photo.url} alt="фото" className="wr-photo-img" />
                <button className="wr-photo-remove" onClick={() => removePhoto(photo.id)}>✕</button>
              </div>
            ))}
            {photos.length < 5 && (
              <button className="wr-photo-add" onClick={() => fileInputRef.current?.click()}>
                <span className="wr-photo-plus">＋</span>
                <span className="wr-photo-add-label">Добавить{photos.length === 0 ? ' фото' : ''}</span>
              </button>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            style={{ display: 'none' }}
            onChange={handlePhotoAdd}
          />
        </div>

        {/* ── Submit ── */}
        <div className="wr-submit">
          {!canSubmit && (
            <p className="wr-hint">
              {!selectedProduct ? '↑ Выбери продукт' : rating === 0 ? '↑ Поставь оценку' : '↑ Напиши хотя бы 20 символов'}
            </p>
          )}
          <Button fullWidth disabled={!canSubmit} onClick={handlePublish}>
            Опубликовать отзыв
          </Button>
          <p className="wr-points-hint">+50 баллов за публикацию 🪙</p>
        </div>
      </div>

      {/* ── Product picker overlay ── */}
      {pickerOpen && (
        <div className="wr-overlay" onClick={() => setPickerOpen(false)}>
          <div className="wr-picker" onClick={(e) => e.stopPropagation()}>
            <div className="wr-picker__header">
              {pickerStep === 'product' && (
                <button className="wr-picker__back" onClick={() => setPickerStep('brand')}>←</button>
              )}
              <span className="wr-picker__title">
                {pickerStep === 'brand' ? 'Выбери бренд' : `${selectedBrand?.emoji} ${selectedBrand?.name}`}
              </span>
              <button className="wr-picker__close" onClick={() => setPickerOpen(false)}>✕</button>
            </div>

            <div className="wr-picker__list">
              {pickerStep === 'brand'
                ? BRANDS.map((b) => (
                    <button key={b.id} className="wr-picker__row" onClick={() => pickBrand(b)}>
                      <span className="wr-picker__row-emoji">{b.emoji}</span>
                      <span className="wr-picker__row-name">{b.name}</span>
                      <span className="wr-picker__row-arrow">›</span>
                    </button>
                  ))
                : (PRODUCTS[selectedBrand?.id ?? ''] ?? []).map((p) => (
                    <button key={p.id} className="wr-picker__row" onClick={() => pickProduct(p)}>
                      <span className="wr-picker__row-name wr-picker__row-name--product">{p.name}</span>
                      {selectedProduct?.id === p.id && <span className="wr-picker__check">✓</span>}
                    </button>
                  ))
              }
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
