import { useState } from 'react';
import { SearchFilters, type Filters } from '../components/SearchFilters';
import './Search.css';

const CATEGORIES = [
  { id: 'cleansing',    emoji: '🫧', label: 'Очищение',           color: '#F7E8F0' },
  { id: 'exfoliation',  emoji: '✨', label: 'Отшелушивание',      color: '#EEF0F7' },
  { id: 'toner',        emoji: '💧', label: 'Тонер',              color: '#E8F4F7' },
  { id: 'serum',        emoji: '⚗️', label: 'Сыворотка',          color: '#F0F7E8' },
  { id: 'mask',         emoji: '🎭', label: 'Маска',              color: '#F7F0E8' },
  { id: 'cream',        emoji: '🫙', label: 'Крем',               color: '#F7E8E8' },
  { id: 'eye-cream',    emoji: '👁️', label: 'Крем для глаз',      color: '#E8F7F0' },
  { id: 'lip-balm',     emoji: '💋', label: 'Бальзам для губ',    color: '#F7EBE8' },
  { id: 'sunscreen',    emoji: '☀️', label: 'Солнцезащита',       color: '#FFF8E8' },
];

const DEFAULT_FILTERS: Filters = { skinTypes: [], minRating: 0, category: '' };

interface SearchProps {
  onCategorySelect?: (id: string) => void;
}

export function Search({ onCategorySelect }: SearchProps) {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);

  const activeFilterCount =
    filters.skinTypes.length + (filters.minRating > 0 ? 1 : 0) + (filters.category ? 1 : 0);

  const filtered = CATEGORIES.filter((c) => {
    const matchesQuery = c.label.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = !filters.category || c.label === filters.category;
    return matchesQuery && matchesCategory;
  });

  function applyFilters(f: Filters) {
    setFilters(f);
    setShowFilters(false);
  }

  return (
    <>
      <div className="screen-content">
        <div className="search-screen__header">
          <div className="search-screen__top-row">
            <h1 className="search-screen__title">Категории</h1>
            <button
              className={`search-screen__filter-btn${activeFilterCount > 0 ? ' search-screen__filter-btn--active' : ''}`}
              onClick={() => setShowFilters(true)}
            >
              <FilterIcon />
              {activeFilterCount > 0 && (
                <span className="search-screen__filter-badge">{activeFilterCount}</span>
              )}
            </button>
          </div>
          <div className="search-screen__input-wrap">
            <SearchIcon />
            <input
              className="search-screen__input"
              placeholder="Поиск по категориям"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button className="search-screen__clear" onClick={() => setQuery('')}>✕</button>
            )}
          </div>

          {/* Active filter pills */}
          {activeFilterCount > 0 && (
            <div className="search-screen__active-filters">
              {filters.skinTypes.map((s) => (
                <span key={s} className="search-screen__filter-pill">{s}</span>
              ))}
              {filters.minRating > 0 && (
                <span className="search-screen__filter-pill">{filters.minRating}★+</span>
              )}
              {filters.category && (
                <span className="search-screen__filter-pill">{filters.category}</span>
              )}
              <button
                className="search-screen__filter-pill search-screen__filter-pill--clear"
                onClick={() => setFilters(DEFAULT_FILTERS)}
              >
                Сбросить ✕
              </button>
            </div>
          )}
        </div>

        <div className="search-screen__grid">
          {filtered.length === 0 ? (
            <div className="search-screen__empty">Ничего не найдено</div>
          ) : (
            filtered.map((cat) => (
              <button
                key={cat.id}
                className="category-card"
                style={{ '--cat-color': cat.color } as React.CSSProperties}
                onClick={() => onCategorySelect?.(cat.id)}
              >
                <div className="category-card__top">
                  <span className="category-card__emoji">{cat.emoji}</span>
                  <div className="category-card__perf" />
                </div>
                <span className="category-card__label">{cat.label}</span>
              </button>
            ))
          )}
        </div>
      </div>

      {showFilters && (
        <SearchFilters
          initialFilters={filters}
          onApply={applyFilters}
          onClose={() => setShowFilters(false)}
        />
      )}
    </>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="search-screen__icon">
      <circle cx="11" cy="11" r="7" stroke="#b0b0b0" strokeWidth="1.8" />
      <path d="M16.5 16.5L21 21" stroke="#b0b0b0" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <line x1="4" y1="7" x2="20" y2="7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="7" y1="12" x2="17" y2="12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="10" y1="17" x2="14" y2="17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
