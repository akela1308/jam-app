import { useState } from 'react';
import { SearchFilters, type Filters } from '../components/SearchFilters';
import './Search.css';

const CATEGORIES = [
  { id: 'cleansing',   label: 'Очищение',        photo: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&q=80' },
  { id: 'exfoliation', label: 'Пилинг',          photo: 'https://images.unsplash.com/photo-1631390930571-ec7aba5310a4?w=300&q=80' },
  { id: 'toner',       label: 'Тонер',           photo: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=300&q=80' },
  { id: 'serum',       label: 'Сыворотка',       photo: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&q=80' },
  { id: 'mask',        label: 'Маска',           photo: 'https://images.unsplash.com/photo-1600857544200-b2f468e3ef97?w=300&q=80' },
  { id: 'cream',       label: 'Крем',            photo: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=300&q=80' },
  { id: 'eye-cream',   label: 'Крем для глаз',  photo: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&q=80' },
  { id: 'lip-balm',    label: 'Бальзам для губ', photo: 'https://images.unsplash.com/photo-1586495777744-4e6232bf5e25?w=300&q=80' },
  { id: 'sunscreen',   label: 'SPF защита',      photo: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=300&q=80' },
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
                onClick={() => onCategorySelect?.(cat.id)}
              >
                <img
                  src={cat.photo}
                  alt={cat.label}
                  className="category-card__img"
                  loading="lazy"
                />
                <div className="category-card__overlay" />
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
