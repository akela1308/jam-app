import { useState, useRef } from 'react';
import './Onboarding.css';

const SLIDES = [
  {
    id: 'reviews',
    emoji: '⭐',
    title: 'Честные отзывы\nот живых людей',
    subtitle: 'Читай реальные отзывы на уходовую косметику. Никакой рекламы — только честный опыт.',
    accent: '#DF1760',
    bg: 'linear-gradient(160deg, #fff0f6 0%, #ffe4ef 100%)',
    illustration: <ReviewsIllustration />,
  },
  {
    id: 'coupons',
    emoji: '🎟️',
    title: 'Купоны и\nэксклюзивные скидки',
    subtitle: 'Получай персональные скидки от брендов за активность в сообществе.',
    accent: '#7C3AED',
    bg: 'linear-gradient(160deg, #f3f0ff 0%, #e8e4ff 100%)',
    illustration: <CouponsIllustration />,
  },
  {
    id: 'community',
    emoji: '💛',
    title: 'Сообщество\nlюбителей ухода',
    subtitle: 'Общайся с теми, кто так же серьёзно относится к коже. Делись находками и открытиями.',
    accent: '#F59E0B',
    bg: 'linear-gradient(160deg, #fffbeb 0%, #fef3c7 100%)',
    illustration: <CommunityIllustration />,
  },
];

interface OnboardingProps {
  onDone: () => void;
}

export function Onboarding({ onDone }: OnboardingProps) {
  const [current, setCurrent] = useState(0);
  const startXRef = useRef<number>(0);
  const slide = SLIDES[current];

  function next() {
    if (current < SLIDES.length - 1) {
      setCurrent(current + 1);
    } else {
      onDone();
    }
  }

  function skip() {
    onDone();
  }

  function handleTouchStart(e: React.TouchEvent) {
    startXRef.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    const dx = e.changedTouches[0].clientX - startXRef.current;
    if (dx < -50 && current < SLIDES.length - 1) setCurrent(current + 1);
    if (dx > 50 && current > 0) setCurrent(current - 1);
  }

  const isLast = current === SLIDES.length - 1;

  return (
    <div
      className="onboarding"
      style={{ background: slide.bg }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Skip */}
      {!isLast && (
        <button className="onboarding__skip" onClick={skip}>
          Пропустить
        </button>
      )}

      {/* Slides */}
      <div className="onboarding__slides-track">
        {SLIDES.map((s, i) => (
          <div
            key={s.id}
            className="onboarding__slide"
            style={{
              transform: `translateX(${(i - current) * 100}%)`,
              transition: 'transform 0.38s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            {/* Illustration */}
            <div className="onboarding__illustration">
              {s.illustration}
            </div>

            {/* Text */}
            <div className="onboarding__text">
              <div className="onboarding__emoji">{s.emoji}</div>
              <h2
                className="onboarding__title"
                style={{ color: s.accent }}
              >
                {s.title}
              </h2>
              <p className="onboarding__subtitle">{s.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom controls */}
      <div className="onboarding__bottom">
        {/* Dots */}
        <div className="onboarding__dots">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              className="onboarding__dot-btn"
              onClick={() => setCurrent(i)}
              aria-label={`Слайд ${i + 1}`}
            >
              <span
                className="onboarding__dot"
                style={{
                  width: i === current ? 24 : 8,
                  background: i === current ? slide.accent : '#d1d5db',
                }}
              />
            </button>
          ))}
        </div>

        {/* Next / Done button */}
        <button
          className="onboarding__next-btn"
          style={{ background: slide.accent }}
          onClick={next}
        >
          {isLast ? 'Начать 🚀' : 'Далее'}
        </button>
      </div>
    </div>
  );
}

/* ── Illustrations ─────────────────────────────────────── */

function ReviewsIllustration() {
  return (
    <svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="onboarding__svg">
      {/* Card 1 */}
      <rect x="20" y="30" width="200" height="70" rx="14" fill="white" filter="url(#shadow)" />
      <circle cx="52" cy="65" r="18" fill="#FFD6E7" />
      <text x="52" y="70" textAnchor="middle" fontSize="14">😊</text>
      <rect x="80" y="48" width="90" height="8" rx="4" fill="#F3F4F6" />
      <rect x="80" y="62" width="120" height="6" rx="3" fill="#F3F4F6" />
      <rect x="80" y="74" width="80" height="6" rx="3" fill="#F3F4F6" />
      {/* Stars */}
      <text x="80" y="90" fontSize="12" fill="#DF1760">★★★★★</text>

      {/* Card 2 (offset) */}
      <rect x="50" y="115" width="200" height="65" rx="14" fill="white" filter="url(#shadow)" />
      <circle cx="82" cy="147" r="18" fill="#E0F2FE" />
      <text x="82" y="152" textAnchor="middle" fontSize="14">🌿</text>
      <rect x="110" y="133" width="80" height="8" rx="4" fill="#F3F4F6" />
      <rect x="110" y="147" width="110" height="6" rx="3" fill="#F3F4F6" />
      <text x="110" y="172" fontSize="12" fill="#DF1760">★★★★</text>

      <defs>
        <filter id="shadow" x="-5%" y="-10%" width="110%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.08" />
        </filter>
      </defs>
    </svg>
  );
}

function CouponsIllustration() {
  return (
    <svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="onboarding__svg">
      {/* Coupon 1 */}
      <rect x="20" y="40" width="220" height="70" rx="14" fill="url(#coup1)" />
      <circle cx="215" cy="75" r="16" fill="white" fillOpacity="0.15" />
      <circle cx="215" cy="75" r="8" fill="white" fillOpacity="0.25" />
      <text x="44" y="65" fontSize="11" fill="rgba(255,255,255,0.8)" fontWeight="600">blush</text>
      <text x="44" y="84" fontSize="22" fill="white" fontWeight="800">-20%</text>
      <text x="44" y="100" fontSize="10" fill="rgba(255,255,255,0.7)">до 31 дек</text>
      {/* Perforation */}
      <line x1="180" y1="44" x2="180" y2="106" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="4 4" />

      {/* Coupon 2 */}
      <rect x="40" y="125" width="220" height="65" rx="14" fill="url(#coup2)" />
      <text x="64" y="148" fontSize="10" fill="rgba(255,255,255,0.8)" fontWeight="600">med_b</text>
      <text x="64" y="167" fontSize="22" fill="white" fontWeight="800">-15%</text>
      <line x1="200" y1="129" x2="200" y2="186" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="4 4" />

      <defs>
        <linearGradient id="coup1" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#DF1760" />
          <stop offset="100%" stopColor="#9B3864" />
        </linearGradient>
        <linearGradient id="coup2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#4C1D95" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function CommunityIllustration() {
  return (
    <svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="onboarding__svg">
      {/* Avatars cluster */}
      <circle cx="140" cy="80" r="36" fill="#FEF3C7" />
      <text x="140" y="90" textAnchor="middle" fontSize="30">👥</text>

      {/* Floating bubbles */}
      <rect x="16" y="20" width="80" height="32" rx="16" fill="white" filter="url(#sh2)" />
      <text x="56" y="41" textAnchor="middle" fontSize="12" fill="#374151">Купон!</text>

      <rect x="180" y="14" width="86" height="32" rx="16" fill="white" filter="url(#sh2)" />
      <text x="223" y="35" textAnchor="middle" fontSize="12" fill="#374151">Классно! 💛</text>

      <rect x="24" y="130" width="90" height="32" rx="16" fill="white" filter="url(#sh2)" />
      <text x="69" y="151" textAnchor="middle" fontSize="12" fill="#374151">5 ★ отзыв</text>

      <rect x="168" y="138" width="90" height="32" rx="16" fill="white" filter="url(#sh2)" />
      <text x="213" y="159" textAnchor="middle" fontSize="12" fill="#374151">Топчик 🌿</text>

      {/* Lines from center */}
      <line x1="108" y1="64" x2="90" y2="46" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3 3" />
      <line x1="172" y1="60" x2="190" y2="40" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3 3" />
      <line x1="112" y1="108" x2="90" y2="132" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3 3" />
      <line x1="168" y1="108" x2="192" y2="134" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3 3" />

      <defs>
        <filter id="sh2" x="-5%" y="-10%" width="110%" height="130%">
          <feDropShadow dx="0" dy="3" stdDeviation="5" floodOpacity="0.08" />
        </filter>
      </defs>
    </svg>
  );
}
