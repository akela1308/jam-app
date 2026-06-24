import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import './Events.css';

type EventStatus = 'active' | 'soon' | 'ended';
type EventFilter = 'all' | EventStatus;

interface AppEvent {
  id: string;
  brand: string;
  title: string;
  subtitle: string;
  dateStart: string;
  dateEnd: string;
  participants: number;
  maxPrizes: number;
  status: EventStatus;
  gradient: string;
  joined?: boolean;
}

const ALL_EVENTS: AppEvent[] = [
  {
    id: '1',
    brand: 'blush',
    title: 'Розыгрыш наборов\nпо уходу за кожей',
    subtitle: '3 победителя получат полный набор зимнего ухода',
    dateStart: '1 янв',
    dateEnd: '15 янв',
    participants: 234,
    maxPrizes: 3,
    status: 'active',
    gradient: 'linear-gradient(135deg, #DF1760 0%, #9B3864 100%)',
    joined: true,
  },
  {
    id: '2',
    brand: 'med_b',
    title: 'Марафон красоты\nс подарками',
    subtitle: 'Делись отзывами каждый день и выигрывай призы',
    dateStart: '10 янв',
    dateEnd: '20 янв',
    participants: 189,
    maxPrizes: 5,
    status: 'active',
    gradient: 'linear-gradient(135deg, #6c63ff 0%, #3f3d8b 100%)',
  },
  {
    id: '3',
    brand: 'skinfood',
    title: 'Зимний челлендж',
    subtitle: 'Сфотографируй свой утренний уход и выложи с хэштегом',
    dateStart: '20 янв',
    dateEnd: '5 фев',
    participants: 0,
    maxPrizes: 10,
    status: 'soon',
    gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
  },
  {
    id: '4',
    brand: 'blush',
    title: 'Новогодний розыгрыш',
    subtitle: 'Праздничный набор для победителей',
    dateStart: '25 дек',
    dateEnd: '1 янв',
    participants: 512,
    maxPrizes: 2,
    status: 'ended',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  },
  {
    id: '5',
    brand: 'skinfood',
    title: 'Февральский уход',
    subtitle: 'Специальный марафон для новых участников сообщества',
    dateStart: '1 фев',
    dateEnd: '14 фев',
    participants: 0,
    maxPrizes: 7,
    status: 'soon',
    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
  },
];




interface EventsProps {
  onBack?: () => void;
  onEvent?: (id: string) => void;
  onBrand?: () => void;
}

export function Events({ onBack, onEvent, onBrand }: EventsProps) {
  const { t } = useLanguage();
  const evT = t.events;
  const FILTERS: { id: EventFilter; label: string }[] = [
    { id: 'all',    label: evT.all },
    { id: 'active', label: evT.active },
    { id: 'soon',   label: evT.soon },
    { id: 'ended',  label: evT.ended },
  ];
  const [filter, setFilter] = useState<EventFilter>('all');
  const [joined, setJoined] = useState<Set<string>>(
    new Set(ALL_EVENTS.filter((e) => e.joined).map((e) => e.id))
  );

  const filtered = filter === 'all'
    ? ALL_EVENTS
    : ALL_EVENTS.filter((e) => e.status === filter);

  function toggleJoin(id: string) {
    setJoined((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  return (
    <div className="screen-content">
      {/* Header */}
      <div className="events__header">
        {onBack && (
          <button className="events__back" onClick={onBack}>←</button>
        )}
        <h1 className="events__title">{evT.title}</h1>
      </div>

      {/* Filter tabs */}
      <div className="events__filter-scroll">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            className={`events__filter-chip${filter === f.id ? ' events__filter-chip--active' : ''}`}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="events__list">
        {filtered.map((ev) => {
          const isJoined = joined.has(ev.id);
          const canJoin = ev.status === 'active';

          return (
            <div
              key={ev.id}
              className={`event-big-card${ev.status === 'ended' ? ' event-big-card--ended' : ''}`}
              onClick={() => onEvent?.(ev.id)}
            >
              {/* Gradient header */}
              <div className="event-big-card__hero" style={{ background: ev.gradient }}>
                <div className="event-big-card__status-badge">
                  <span className={`event-big-card__status-dot event-big-card__status-dot--${ev.status}`} />
                  {(ev.status === 'active' ? evT.active : ev.status === 'soon' ? evT.soon : evT.ended)}
                </div>
                <div className="event-big-card__prize-badge">
                  🎁 {ev.maxPrizes} {prizesLabel(ev.maxPrizes)}
                </div>
                <h2 className="event-big-card__title">{ev.title}</h2>
              </div>

              {/* Body */}
              <div className="event-big-card__body">
                <button
                  className="event-big-card__brand"
                  onClick={(e) => { e.stopPropagation(); onBrand?.(); }}
                >
                  @{ev.brand}
                </button>
                <p className="event-big-card__subtitle">{ev.subtitle}</p>

                <div className="event-big-card__meta">
                  <div className="event-big-card__dates">
                    <CalendarIcon />
                    <span>{ev.dateStart} — {ev.dateEnd}</span>
                  </div>
                  {ev.participants > 0 && (
                    <div className="event-big-card__participants">
                      <PeopleIcon />
                      <span>{ev.participants.toLocaleString('ru')} участников</span>
                    </div>
                  )}
                </div>

                {canJoin && (
                  <button
                    className={`event-big-card__join-btn${isJoined ? ' event-big-card__join-btn--joined' : ''}`}
                    onClick={(e) => { e.stopPropagation(); toggleJoin(ev.id); }}
                  >
                    {isJoined ? '✓ Участвую' : 'Участвовать'}
                  </button>
                )}
                {ev.status === 'soon' && (
                  <button
                    className={`event-big-card__join-btn event-big-card__join-btn--soon${isJoined ? ' event-big-card__join-btn--joined' : ''}`}
                    onClick={(e) => { e.stopPropagation(); toggleJoin(ev.id); }}
                  >
                    {isJoined ? '✓ Напомнить' : '🔔 Напомнить'}
                  </button>
                )}
                {ev.status === 'ended' && (
                  <span className="event-big-card__ended-label">Розыгрыш завершён</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function prizesLabel(n: number) {
  if (n === 1) return 'приз';
  if (n >= 2 && n <= 4) return 'приза';
  return 'призов';
}

function CalendarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M16 2v4M8 2v4M3 9h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75M21 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
