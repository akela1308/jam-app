import { useState } from 'react';
import './Brands.css';

interface Brand {
  id: string;
  name: string;
  slug: string;
  category: string;
  tags: string[];
  followers: number;
  rating: number;
  reviewCount: number;
  color: string;
  emoji: string;
  subscribed?: boolean;
}

const ALL_BRANDS: Brand[] = [
  { id: '1', name: 'blush',    slug: '@blush',    category: 'Корейский уход', tags: ['Чувствительная', 'Увлажнение'],   followers: 12400, rating: 4.8, reviewCount: 491, color: '#DF1760', emoji: '🌸' },
  { id: '2', name: 'med_b',    slug: '@med_b',    category: 'Аптечная косметика', tags: ['Дерматология', 'Акне'],       followers: 8700,  rating: 4.7, reviewCount: 318, color: '#2563EB', emoji: '💊' },
  { id: '3', name: 'skinfood', slug: '@skinfood', category: 'Натуральная косметика', tags: ['Растительные', 'Питание'], followers: 21300, rating: 4.9, reviewCount: 724, color: '#16A34A', emoji: '🌿' },
  { id: '4', name: 'some by mi', slug: '@some_by_mi', category: 'Корейский уход', tags: ['Кислоты', 'Сияние'],          followers: 15600, rating: 4.6, reviewCount: 442, color: '#7C3AED', emoji: '✨' },
  { id: '5', name: 'innisfree', slug: '@innisfree', category: 'Натуральная косметика', tags: ['Эко', 'Поры'],          followers: 34100, rating: 4.7, reviewCount: 1023, color: '#059669', emoji: '🍃' },
  { id: '6', name: 'cosrx',    slug: '@cosrx',    category: 'Аптечная косметика', tags: ['Ниацинамид', 'Снулсинг'],    followers: 28900, rating: 4.8, reviewCount: 876, color: '#D97706', emoji: '🔬' },
  { id: '7', name: 'laneige',  slug: '@laneige',  category: 'Люкс уход', tags: ['Увлажнение', 'Ночной уход'],          followers: 19200, rating: 4.9, reviewCount: 612, color: '#0EA5E9', emoji: '💎' },
  { id: '8', name: 'etude',    slug: '@etude',    category: 'Корейский уход', tags: ['Яркость', 'Молодость'],           followers: 11400, rating: 4.5, reviewCount: 289, color: '#F43F5E', emoji: '🎀' },
];

const CATEGORIES = ['Все', 'Корейский уход', 'Аптечная косметика', 'Натуральная косметика', 'Люкс уход'];

const SORT_OPTIONS = [
  { id: 'followers', label: 'По подписчикам' },
  { id: 'rating',    label: 'По рейтингу' },
  { id: 'reviews',   label: 'По отзывам' },
] as const;

type SortId = typeof SORT_OPTIONS[number]['id'];

interface BrandsProps {
  onBack?: () => void;
  onBrand?: () => void;
}

export function Brands({ onBack, onBrand }: BrandsProps) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Все');
  const [sort, setSort] = useState<SortId>('followers');
  const [subscribed, setSubscribed] = useState<Set<string>>(new Set());

  function toggleSub(id: string, e: React.MouseEvent) {
    e.stopPropagation();
    setSubscribed((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const filtered = ALL_BRANDS
    .filter((b) => {
      const matchCat = category === 'Все' || b.category === category;
      const matchQ = query === '' ||
        b.name.toLowerCase().includes(query.toLowerCase()) ||
        b.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));
      return matchCat && matchQ;
    })
    .sort((a, b) => {
      if (sort === 'followers') return b.followers - a.followers;
      if (sort === 'rating')    return b.rating - a.rating;
      if (sort === 'reviews')   return b.reviewCount - a.reviewCount;
      return 0;
    });

  return (
    <div className="screen-content">
      {/* Header */}
      <div className="brands__header">
        {onBack && <button className="brands__back" onClick={onBack}>←</button>}
        <h1 className="brands__title">Бренды</h1>
        <span className="brands__count">{filtered.length}</span>
      </div>

      {/* Search */}
      <div className="brands__search-wrap">
        <SearchIcon />
        <input
          className="brands__search"
          placeholder="Поиск брендов..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && <button className="brands__search-clear" onClick={() => setQuery('')}>✕</button>}
      </div>

      {/* Category filter */}
      <div className="brands__chips-scroll">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`brands__chip${category === cat ? ' brands__chip--active' : ''}`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Sort row */}
      <div className="brands__sort-row">
        {SORT_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            className={`brands__sort-btn${sort === opt.id ? ' brands__sort-btn--active' : ''}`}
            onClick={() => setSort(opt.id)}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Brand cards */}
      <div className="brands__list">
        {filtered.length === 0 ? (
          <div className="brands__empty">
            <span>🔍</span>
            <p>Бренды не найдены</p>
          </div>
        ) : (
          filtered.map((brand) => {
            const isSub = subscribed.has(brand.id);
            return (
              <div key={brand.id} className="brand-card" onClick={onBrand}>
                {/* Logo */}
                <div className="brand-card__logo" style={{ background: brand.color + '18', color: brand.color }}>
                  <span className="brand-card__emoji">{brand.emoji}</span>
                </div>

                {/* Info */}
                <div className="brand-card__body">
                  <div className="brand-card__top-row">
                    <span className="brand-card__name">{brand.name}</span>
                    <span className="brand-card__rating">★ {brand.rating}</span>
                  </div>
                  <span className="brand-card__slug">{brand.slug}</span>
                  <div className="brand-card__meta">
                    <span className="brand-card__followers">{formatNum(brand.followers)} подп.</span>
                    <span className="brand-card__sep">·</span>
                    <span className="brand-card__reviews">{brand.reviewCount} отзывов</span>
                  </div>
                  <div className="brand-card__tags">
                    {brand.tags.map((tag) => (
                      <span key={tag} className="brand-card__tag">{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Subscribe */}
                <button
                  className={`brand-card__sub-btn${isSub ? ' brand-card__sub-btn--active' : ''}`}
                  onClick={(e) => toggleSub(brand.id, e)}
                >
                  {isSub ? '✓' : '+'}
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

function formatNum(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="brands__search-icon">
      <circle cx="11" cy="11" r="7" stroke="#b0b0b0" strokeWidth="1.8" />
      <path d="M16.5 16.5L21 21" stroke="#b0b0b0" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
