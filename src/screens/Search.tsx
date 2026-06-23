import { useState } from 'react';
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

interface SearchProps {
  onCategorySelect?: (id: string) => void;
}

export function Search({ onCategorySelect }: SearchProps) {
  const [query, setQuery] = useState('');

  const filtered = CATEGORIES.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="screen-content">
      <div className="search-screen__header">
        <h1 className="search-screen__title">Категории</h1>
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
      </div>

      <div className="search-screen__grid">
        {filtered.map((cat) => (
          <button
            key={cat.id}
            className="category-card"
            style={{ '--cat-color': cat.color } as React.CSSProperties}
            onClick={() => onCategorySelect?.(cat.id)}
          >
            <div className="category-card__top">
              <span className="category-card__emoji">{cat.emoji}</span>
              {/* Tear-off perforation */}
              <div className="category-card__perf" />
            </div>
            <span className="category-card__label">{cat.label}</span>
          </button>
        ))}
      </div>
    </div>
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
