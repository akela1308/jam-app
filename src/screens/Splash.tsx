import { useEffect, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import './Splash.css';

interface SplashProps {
  onDone: () => void;
}

export function Splash({ onDone }: SplashProps) {
  const { t } = useLanguage();
  const s = t.splash;
  const [phase, setPhase] = useState<'logo' | 'tagline' | 'button'>('logo');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('tagline'), 800);
    const t2 = setTimeout(() => setPhase('button'), 1500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="splash">
      <div className="splash__blob splash__blob--1" />
      <div className="splash__blob splash__blob--2" />
      <div className="splash__blob splash__blob--3" />

      <div className="splash__content">
        <div className={`splash__logo-wrap${phase !== 'logo' ? ' splash__logo-wrap--up' : ''}`}>
          <div className="splash__logo-circle">
            <span className="splash__logo-text">{t.appName}</span>
          </div>
          <div className="splash__logo-glow" />
        </div>

        <div className={`splash__tagline${phase === 'tagline' || phase === 'button' ? ' splash__tagline--visible' : ''}`}>
          <p className="splash__tagline-main">{s.tagline}</p>
          <p className="splash__tagline-sub">{s.subtitle}</p>
        </div>

        <div className={`splash__btn-wrap${phase === 'button' ? ' splash__btn-wrap--visible' : ''}`}>
          <button className="splash__btn" onClick={onDone}>
            {s.start}
            <ArrowIcon />
          </button>
          <p className="splash__terms">{s.terms}</p>
        </div>
      </div>

      <div className="splash__bottom-dots">
        <span className="splash__dot splash__dot--active" />
        <span className="splash__dot" />
        <span className="splash__dot" />
      </div>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ marginLeft: 6 }}>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
