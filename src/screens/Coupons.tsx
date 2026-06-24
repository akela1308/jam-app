import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import './Coupons.css';

interface Coupon {
  id: string;
  brand: string;
  title: string;
  discount: string;
  expiresAt: string;
  code: string;
  color: string;
  used?: boolean;
  category: string;
}

const ALL_COUPONS: Coupon[] = [
  { id: '1', brand: 'blush',    title: 'Holiday Cards by blush',    discount: '-20%', expiresAt: '31 дек', code: 'BLUSH20',  color: 'linear-gradient(135deg, #DF1760 0%, #9B3864 100%)',   category: 'Сыворотка' },
  { id: '2', brand: 'med_b',    title: 'Осенняя коллекция',         discount: '-15%', expiresAt: '15 янв', code: 'MEDB15',   color: 'linear-gradient(135deg, #6c63ff 0%, #3f3d8b 100%)',   category: 'Крем' },
  { id: '3', brand: 'skinfood', title: 'Зимний уход для лица',      discount: '-30%', expiresAt: '1 фев',  code: 'SKIN30',   color: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',   category: 'Маска' },
  { id: '4', brand: 'blush',    title: 'Новогодний набор',          discount: '-25%', expiresAt: '10 янв', code: 'BLUSHNY',  color: 'linear-gradient(135deg, #DF1760 0%, #FF6B9D 100%)',   category: 'Набор' },
  { id: '5', brand: 'med_b',    title: 'Тонер со скидкой',          discount: '-10%', expiresAt: '28 янв', code: 'TONER10',  color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',   category: 'Тонер' },
  { id: '6', brand: 'skinfood', title: 'Маска-плёнка',             discount: '-40%', expiresAt: '5 янв',  code: 'MASK40',   color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',   category: 'Маска' },
  { id: '7', brand: 'blush',    title: 'Сыворотка с ретинолом',    discount: '-12%', expiresAt: '20 фев', code: 'RETIN12',  color: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',   category: 'Сыворотка', used: true },
  { id: '8', brand: 'skinfood', title: 'Очищающий гель',           discount: '-18%', expiresAt: '15 фев', code: 'CLEAN18',  color: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',   category: 'Очищение' },
];

const BRANDS = ['all', 'blush', 'med_b', 'skinfood'];

interface CouponsProps {
  onBack?: () => void;
  onBrand?: () => void;
}

export function Coupons({ onBack, onBrand }: CouponsProps) {
  const { t } = useLanguage();
  const cp = t.coupons;
  const [query, setQuery] = useState('');
  const [brand, setBrand] = useState('all');
  const [activated, setActivated] = useState<Set<string>>(new Set());
  const [copied, setCopied] = useState<string | null>(null);

  const filtered = ALL_COUPONS.filter((c) => {
    const matchBrand = brand === 'all' || c.brand === brand;
    const matchQuery = query === '' ||
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.brand.toLowerCase().includes(query.toLowerCase()) ||
      c.discount.includes(query);
    return matchBrand && matchQuery;
  });

  const active = filtered.filter((c) => !c.used);
  const used   = filtered.filter((c) => c.used);

  function activate(id: string, code: string) {
    setActivated((prev) => new Set(prev).add(id));
    setCopied(id);
    // Simulate clipboard copy
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <div className="screen-content">
      {/* Header */}
      <div className="coupons__header">
        {onBack && (
          <button className="coupons__back" onClick={onBack}>←</button>
        )}
        <h1 className="coupons__title">{cp.title}</h1>
        <span className="coupons__count">{active.length} активных</span>
      </div>

      {/* Search */}
      <div className="coupons__search-wrap">
        <SearchIcon />
        <input
          className="coupons__search"
          placeholder={cp.search}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button className="coupons__search-clear" onClick={() => setQuery('')}>✕</button>
        )}
      </div>

      {/* Brand filter */}
      <div className="coupons__brand-scroll">
        {BRANDS.map((b) => (
          <button
            key={b}
            className={`coupons__brand-chip${brand === b ? ' coupons__brand-chip--active' : ''}`}
            onClick={() => setBrand(b)}
          >
            {b}
          </button>
        ))}
      </div>

      {/* Active coupons */}
      {active.length > 0 && (
        <div className="coupons__section">
          <div className="coupons__list">
            {active.map((c) => (
              <CouponCard
                key={c.id}
                coupon={c}
                isActivated={activated.has(c.id)}
                isCopied={copied === c.id}
                onActivate={() => activate(c.id, c.code)}
                onBrand={onBrand}
              />
            ))}
          </div>
        </div>
      )}

      {/* Used coupons */}
      {used.length > 0 && (
        <div className="coupons__section">
          <span className="coupons__section-label">{cp.used}</span>
          <div className="coupons__list">
            {used.map((c) => (
              <CouponCard
                key={c.id}
                coupon={c}
                isActivated={true}
                isCopied={false}
                onActivate={() => {}}
                onBrand={onBrand}
                disabled
              />
            ))}
          </div>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="coupons__empty">
          <span className="coupons__empty-icon">🎟️</span>
          <p>Купоны не найдены</p>
        </div>
      )}
    </div>
  );
}

interface CouponCardProps {
  coupon: Coupon;
  isActivated: boolean;
  isCopied: boolean;
  onActivate: () => void;
  onBrand?: () => void;
  disabled?: boolean;
}

function CouponCard({ coupon, isActivated, isCopied, onActivate, onBrand, disabled }: CouponCardProps) {
  return (
    <div className={`coupon-full${disabled ? ' coupon-full--used' : ''}`}>
      {/* Left colored band */}
      <div className="coupon-full__band" style={{ background: coupon.color }} />

      {/* Content */}
      <div className="coupon-full__body">
        <div className="coupon-full__top">
          <button className="coupon-full__brand" onClick={onBrand}>@{coupon.brand}</button>
          <span className="coupon-full__discount">{coupon.discount}</span>
        </div>
        <p className="coupon-full__title">{coupon.title}</p>
        <span className="coupon-full__expires">до {coupon.expiresAt}</span>
      </div>

      {/* Right: code + button */}
      <div className="coupon-full__right">
        {/* Perforation */}
        <div className="coupon-full__perf" />

        <div className="coupon-full__action-area">
          <div className="coupon-full__code-wrap">
            <span className="coupon-full__code-label">Промокод</span>
            <span className="coupon-full__code">{coupon.code}</span>
          </div>
          {!disabled && (
            <button
              className={`coupon-full__btn${isActivated ? ' coupon-full__btn--done' : ''}`}
              onClick={onActivate}
            >
              {isCopied ? '✓ Скопировано' : isActivated ? '✓ Активирован' : 'Активировать'}
            </button>
          )}
          {disabled && <span className="coupon-full__used-tag">Использован</span>}
        </div>
      </div>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="coupons__search-icon">
      <circle cx="11" cy="11" r="7" stroke="#b0b0b0" strokeWidth="1.8" />
      <path d="M16.5 16.5L21 21" stroke="#b0b0b0" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
