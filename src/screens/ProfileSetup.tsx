import { useState } from 'react';
import { Button } from '../components/Button';
import social1 from '../assets/social/social-1.png';
import social2 from '../assets/social/social-2.png';
import social3 from '../assets/social/social-3.png';
import social4 from '../assets/social/social-4.png';
import social5 from '../assets/social/social-5.png';
import social6 from '../assets/social/social-6.png';
import social7 from '../assets/social/social-7.png';
import social8 from '../assets/social/social-8.png';
import { useLanguage } from '../i18n/LanguageContext';
import './ProfileSetup.css';

const SOCIALS = [
  { id: 'tg',   label: 'Telegram',  icon: social1 },
  { id: 'inst', label: 'Instagram', icon: social2 },
  { id: 'tik',  label: 'TikTok',    icon: social3 },
  { id: 'vk',   label: 'VK',        icon: social4 },
  { id: 'yt',   label: 'YouTube',   icon: social5 },
  { id: 'pin',  label: 'Pinterest', icon: social6 },
  { id: 'tw',   label: 'Twitter',   icon: social7 },
  { id: 'snap', label: 'Snapchat',  icon: social8 },
];

interface ProfileSetupProps {
  onComplete: () => void;
}

export function ProfileSetup({ onComplete }: ProfileSetupProps) {
  const { t } = useLanguage();
  const ps = t.profileSetup;
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [connected, setConnected] = useState<Set<string>>(new Set());
  const [step, setStep] = useState<'info' | 'socials'>('info');

  const toggleSocial = (id: string) => {
    setConnected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  if (step === 'socials') {
    return (
      <div className="setup-screen">
        <div className="setup-screen__progress">
          <div className="setup-screen__progress-bar" style={{ width: '100%' }} />
        </div>

        <div className="setup-screen__body">
          <h1 className="setup-screen__title">{ps.connectTitle}</h1>
          <p className="setup-screen__subtitle">
            Чтобы друзьям было проще тебя найти
          </p>

          <div className="setup-screen__socials-grid">
            {SOCIALS.map((s) => (
              <button
                key={s.id}
                className={`social-btn${connected.has(s.id) ? ' social-btn--connected' : ''}`}
                onClick={() => toggleSocial(s.id)}
              >
                <img src={s.icon} alt={s.label} className="social-btn__icon" />
                <span className="social-btn__label">{s.label}</span>
                {connected.has(s.id) && <span className="social-btn__check">✓</span>}
              </button>
            ))}
          </div>

          <div className="setup-screen__actions">
            <Button fullWidth onClick={onComplete}>
              Готово
            </Button>
            <button className="setup-screen__skip" onClick={onComplete}>
              Пропустить
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="setup-screen">
      <div className="setup-screen__progress">
        <div className="setup-screen__progress-bar" style={{ width: '50%' }} />
      </div>

      <div className="setup-screen__body">
        {/* Avatar picker */}
        <div className="setup-screen__avatar-wrap">
          <div className="setup-screen__avatar">
            {username ? username.charAt(0).toUpperCase() : '?'}
          </div>
          <button className="setup-screen__avatar-edit">{ps.addPhoto}</button>
        </div>

        <h1 className="setup-screen__title">{ps.title}</h1>

        <div className="setup-screen__fields">
          <div className="setup-screen__field">
            <label className="setup-screen__label">Username</label>
            <div className="setup-screen__input-wrap">
              <span className="setup-screen__at">@</span>
              <input
                className="setup-screen__input setup-screen__input--with-prefix"
                placeholder={ps.usernamePlaceholder}
                value={username}
                onChange={(e) => setUsername(e.target.value.replace(/\s/g, '_').toLowerCase())}
                maxLength={30}
              />
            </div>
          </div>

          <div className="setup-screen__field">
            <label className="setup-screen__label">{ps.bio}</label>
            <textarea
              className="setup-screen__textarea"
              placeholder={ps.bioPlaceholder}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              maxLength={150}
            />
            <span className="setup-screen__char-count">{bio.length}/150</span>
          </div>
        </div>

        <div className="setup-screen__actions">
          <Button fullWidth disabled={!username} onClick={() => setStep('socials')}>
            Далее
          </Button>
          <button className="setup-screen__skip" onClick={onComplete}>
            Пропустить
          </button>
        </div>
      </div>
    </div>
  );
}
