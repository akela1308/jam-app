import { useState } from 'react';
import './SearchFilters.css';

export interface Filters {
  skinTypes: string[];
  minRating: number;
  category: string;
}

const SKIN_TYPES = ['Сухая', 'Жирная', 'Комбинированная', 'Нормальная', 'Чувствительная'];
const RATINGS = [
  { value: 5, label: '5 ★' },
  { value: 4, label: '4★+' },
  { value: 3, label: '3★+' },
  { value: 0, label: 'Любой' },
];
const CATEGORIES = ['Очищение', 'Тонер', 'Сыворотка', 'Крем', 'Маска', 'Солнцезащита'];

interface SearchFiltersProps {
  initialFilters: Filters;
  onApply: (f: Filters) => void;
  onClose: () => void;
}

export function SearchFilters({ initialFilters, onApply, onClose }: SearchFiltersProps) {
  const [skinTypes, setSkinTypes] = useState<string[]>(initialFilters.skinTypes);
  const [minRating, setMinRating] = useState<number>(initialFilters.minRating);
  const [category, setCategory] = useState<string>(initialFilters.category);

  function toggleSkinType(type: string) {
    setSkinTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  }

  function reset() {
    setSkinTypes([]);
    setMinRating(0);
    setCategory('');
  }

  const hasFilters = skinTypes.length > 0 || minRating > 0 || category !== '';

  return (
    <>
      {/* Backdrop */}
      <div className="sf-backdrop" onClick={onClose} />

      {/* Sheet */}
      <div className="sf-sheet">
        <div className="sf-sheet__handle" />

        <div className="sf-sheet__header">
          <span className="sf-sheet__title">Фильтры</span>
          <button className="sf-sheet__close" onClick={onClose}>✕</button>
        </div>

        <div className="sf-sheet__body">
          {/* Skin type */}
          <div className="sf-section">
            <span className="sf-section__label">Тип кожи</span>
            <div className="sf-chips">
              {SKIN_TYPES.map((type) => (
                <button
                  key={type}
                  className={`sf-chip${skinTypes.includes(type) ? ' sf-chip--active' : ''}`}
                  onClick={() => toggleSkinType(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div className="sf-section">
            <span className="sf-section__label">Рейтинг</span>
            <div className="sf-chips">
              {RATINGS.map((r) => (
                <button
                  key={r.value}
                  className={`sf-chip${minRating === r.value ? ' sf-chip--active' : ''}`}
                  onClick={() => setMinRating(r.value)}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category */}
          <div className="sf-section">
            <span className="sf-section__label">Категория</span>
            <div className="sf-chips">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={`sf-chip${category === cat ? ' sf-chip--active' : ''}`}
                  onClick={() => setCategory(category === cat ? '' : cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="sf-sheet__footer">
          <button
            className="sf-btn sf-btn--reset"
            onClick={reset}
            disabled={!hasFilters}
          >
            Сбросить
          </button>
          <button
            className="sf-btn sf-btn--apply"
            onClick={() => onApply({ skinTypes, minRating, category })}
          >
            Применить
          </button>
        </div>
      </div>
    </>
  );
}
