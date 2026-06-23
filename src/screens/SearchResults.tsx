import { useState } from 'react';
import type { Filters } from '../components/SearchFilters';
import { SearchFilters } from '../components/SearchFilters';
import './SearchResults.css';

export interface SearchResultsProps {
  category: string;
  categoryEmoji: string;
  filters?: Filters;
  onBack?: () => void;
  onProduct?: (id: string) => void;
  onBrand?: () => void;
}

const PRODUCTS_BY_CATEGORY: Record<string, Product[]> = {
  Сыворотка: [
    { id: '1', name: 'Vitamin C Serum',      brand: 'blush',    rating: 4.8, reviews: 124, price: '2 490 ₽', skinTypes: ['Нормальная', 'Комбинированная'] },
    { id: '2', name: 'Retinol Night Serum',  brand: 'med_b',    rating: 4.7, reviews: 67,  price: '3 290 ₽', skinTypes: ['Сухая', 'Нормальная'] },
    { id: '3', name: 'Niacinamide 10%',       brand: 'skinfood', rating: 4.9, reviews: 198, price: '1 190 ₽', skinTypes: ['Жирная', 'Комбинированная'] },
    { id: '4', name: 'HA Booster Serum',      brand: 'blush',    rating: 4.6, reviews: 83,  price: '1 890 ₽', skinTypes: ['Сухая', 'Чувствительная'] },
    { id: '5', name: 'Peptide Complex',       brand: 'med_b',    rating: 4.5, reviews: 41,  price: '2 790 ₽', skinTypes: ['Нормальная'] },
  ],
  Очищение: [
    { id: '6',  name: 'Foam Cleanser',        brand: 'blush',    rating: 4.7, reviews: 156, price: '890 ₽',   skinTypes: ['Жирная', 'Комбинированная'] },
    { id: '7',  name: 'Oil Cleansing Balm',   brand: 'skinfood', rating: 4.8, reviews: 92,  price: '1 290 ₽', skinTypes: ['Сухая', 'Нормальная'] },
    { id: '8',  name: 'Micellar Water 400ml', brand: 'med_b',    rating: 4.4, reviews: 210, price: '590 ₽',   skinTypes: ['Чувствительная'] },
  ],
  Крем: [
    { id: '9',  name: 'Hydro Boost Cream',    brand: 'blush',    rating: 4.6, reviews: 89,  price: '1 890 ₽', skinTypes: ['Сухая', 'Нормальная'] },
    { id: '10', name: 'Matte Control Gel',    brand: 'skinfood', rating: 4.5, reviews: 74,  price: '1 390 ₽', skinTypes: ['Жирная', 'Комбинированная'] },
  ],
  Тонер: [
    { id: '11', name: 'AHA/BHA Toner',        brand: 'blush',    rating: 4.9, reviews: 211, price: '1 490 ₽', skinTypes: ['Жирная', 'Комбинированная'] },
    { id: '12', name: 'Essence Toner 200ml',  brand: 'skinfood', rating: 4.6, reviews: 118, price: '990 ₽',   skinTypes: ['Сухая', 'Нормальная', 'Чувствительная'] },
  ],
  Маска: [
    { id: '13', name: 'Clay Pore Mask',       brand: 'med_b',    rating: 4.7, reviews: 143, price: '790 ₽',   skinTypes: ['Жирная', 'Комбинированная'] },
    { id: '14', name: 'Hydrogel Sheet Mask',  brand: 'skinfood', rating: 4.8, reviews: 207, price: '290 ₽',   skinTypes: ['Любой'] },
  ],
};

const DEFAULT_PRODUCTS: Product[] = [
  { id: 'x1', name: 'Best Seller Kit',      brand: 'blush',    rating: 4.7, reviews: 99,  price: '1 990 ₽', skinTypes: ['Нормальная'] },
  { id: 'x2', name: 'Starter Set',          brand: 'skinfood', rating: 4.5, reviews: 55,  price: '2 490 ₽', skinTypes: ['Чувствительная'] },
];

interface Product {
  id: string;
  name: string;
  brand: string;
  rating: number;
  reviews: number;
  price: string;
  skinTypes: string[];
}

type SortOption = 'rating' | 'reviews' | 'price_asc' | 'price_desc';

const SORT_LABELS: Record<SortOption, string> = {
  rating:     'По рейтингу',
  reviews:    'По отзывам',
  price_asc:  'Сначала дешевле',
  price_desc: 'Сначала дороже',
};

const DEFAULT_FILTERS: Filters = { skinTypes: [], minRating: 0, category: '' };

export function SearchResults({ category, categoryEmoji, filters: initialFilters, onBack, onProduct, onBrand }: SearchResultsProps) {
  const [sort, setSort] = useState<SortOption>('rating');
  const [showSort, setShowSort] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>(initialFilters ?? DEFAULT_FILTERS);

  const rawProducts = PRODUCTS_BY_CATEGORY[category] ?? DEFAULT_PRODUCTS;

  const filtered = rawProducts.filter((p) => {
    if (filters.minRating > 0 && p.rating < filters.minRating) return false;
    if (filters.skinTypes.length > 0) {
      const hasMatch = filters.skinTypes.some(
        (st) => p.skinTypes.includes(st) || p.skinTypes.includes('Любой')
      );
      if (!hasMatch) return false;
    }
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    switch (sort) {
      case 'rating':     return b.rating - a.rating;
      case 'reviews':    return b.reviews - a.reviews;
      case 'price_asc':  return parsePrice(a.price) - parsePrice(b.price);
      case 'price_desc': return parsePrice(b.price) - parsePrice(a.price);
      default:           return 0;
    }
  });

  const activeFilterCount =
    filters.skinTypes.length + (filters.minRating > 0 ? 1 : 0);

  function parsePrice(p: string) {
    return parseInt(p.replace(/\D/g, ''), 10);
  }

  return (
    <>
      <div className="screen-content">
        {/* Header */}
        <div className="sr__header">
          <button className="sr__back" onClick={onBack}>←</button>
          <div className="sr__title-row">
            <span className="sr__emoji">{categoryEmoji}</span>
            <h1 className="sr__title">{category}</h1>
          </div>
          <div style={{ width: 32 }} />
        </div>

        {/* Controls */}
        <div className="sr__controls">
          <span className="sr__count">{sorted.length} продуктов</span>
          <div className="sr__control-btns">
            {/* Filter */}
            <button
              className={`sr__ctrl-btn${activeFilterCount > 0 ? ' sr__ctrl-btn--active' : ''}`}
              onClick={() => setShowFilters(true)}
            >
              <FilterIcon />
              {activeFilterCount > 0 && (
                <span className="sr__ctrl-badge">{activeFilterCount}</span>
              )}
            </button>
            {/* Sort */}
            <button
              className="sr__ctrl-btn"
              onClick={() => setShowSort(!showSort)}
            >
              <SortIcon />
            </button>
          </div>
        </div>

        {/* Sort dropdown */}
        {showSort && (
          <div className="sr__sort-dropdown">
            {(Object.keys(SORT_LABELS) as SortOption[]).map((opt) => (
              <button
                key={opt}
                className={`sr__sort-opt${sort === opt ? ' sr__sort-opt--active' : ''}`}
                onClick={() => { setSort(opt); setShowSort(false); }}
              >
                {SORT_LABELS[opt]}
                {sort === opt && <span className="sr__sort-check">✓</span>}
              </button>
            ))}
          </div>
        )}

        {/* Results */}
        {sorted.length === 0 ? (
          <div className="sr__empty">
            <span className="sr__empty-icon">🔍</span>
            <p>Ничего не найдено</p>
            <button className="sr__reset-link" onClick={() => setFilters(DEFAULT_FILTERS)}>
              Сбросить фильтры
            </button>
          </div>
        ) : (
          <div className="sr__list">
            {sorted.map((p) => (
              <div key={p.id} className="sr-product-card" onClick={() => onProduct?.(p.id)}>
                <div className="sr-product-card__thumb">
                  <span className="sr-product-card__emoji">🧴</span>
                </div>
                <div className="sr-product-card__body">
                  <button
                    className="sr-product-card__brand"
                    onClick={(e) => { e.stopPropagation(); onBrand?.(); }}
                  >
                    @{p.brand}
                  </button>
                  <span className="sr-product-card__name">{p.name}</span>
                  <div className="sr-product-card__meta">
                    <span className="sr-product-card__rating">★ {p.rating}</span>
                    <span className="sr-product-card__sep">·</span>
                    <span className="sr-product-card__reviews">{p.reviews} отзывов</span>
                  </div>
                  <div className="sr-product-card__skins">
                    {p.skinTypes.slice(0, 2).map((s) => (
                      <span key={s} className="sr-product-card__skin-tag">{s}</span>
                    ))}
                  </div>
                </div>
                <div className="sr-product-card__right">
                  <span className="sr-product-card__price">{p.price}</span>
                  <span className="sr-product-card__arrow">›</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showFilters && (
        <SearchFilters
          initialFilters={filters}
          onApply={(f) => { setFilters(f); setShowFilters(false); }}
          onClose={() => setShowFilters(false)}
        />
      )}
    </>
  );
}

function FilterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <line x1="4" y1="7"  x2="20" y2="7"  stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="7" y1="12" x2="17" y2="12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="10" y1="17" x2="14" y2="17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function SortIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M3 6h18M7 12h10M11 18h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
