import { useState } from 'react';
import { Button } from '../components/Button';
import avatar1 from '../assets/avatars/avatar-1.png';
import social1 from '../assets/social/social-1.png';
import social2 from '../assets/social/social-2.png';
import social3 from '../assets/social/social-3.png';
import social4 from '../assets/social/social-4.png';
import social5 from '../assets/social/social-5.png';
import social6 from '../assets/social/social-6.png';
import social7 from '../assets/social/social-7.png';
import social8 from '../assets/social/social-8.png';
import type { TelegramUser } from '../hooks/useTelegramUser';
import { useLanguage } from '../i18n/LanguageContext';
import './EditProfile.css';

const SKIN_TYPES = ['Сухая', 'Жирная', 'Комбинированная', 'Нормальная', 'Чувствительная'];

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

interface EditProfileProps {
  tgUser?: TelegramUser | null;
  onBack?: () => void;
  onSave?: () => void;
}

export function EditProfile({ tgUser, onBack, onSave }: EditProfileProps) {
  const initialName = tgUser?.username
    ? `@${tgUser.username}`
    : tgUser?.first_name ?? 'anna_skin';

  const [username, setUsername] = useState(
    tgUser?.username ?? 'anna_skin'
  );
  const [displayName, setDisplayName] = useState(
    tgUser?.first_name ?? 'Анна'
  );
  const [bio, setBio] = useState('Люблю корейский уход 🌿 Делюсь честными отзывами');
  const [skinType, setSkinType] = useState('Нормальная');
  const [connected, setConnected] = useState<Set<string>>(new Set(['tg']));
  const [saved, setSaved] = useState(false);

  void initialName;

  function toggleSocial(id: string) {
    setConnected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => {
      onSave?.();
    }, 600);
  }

  const avatarSrc = tgUser?.photo_url ?? null;

  return (
    <div className="screen-content">
      {/* Header */}
      <div className="ep__header">
        <button className="ep__back" onClick={onBack}>✕</button>
        <span className="ep__title">Редактировать</span>
        <button
          className={`ep__save-btn${saved ? ' ep__save-btn--saved' : ''}`}
          onClick={handleSave}
        >
          {saved ? '✓' : 'Сохранить'}
        </button>
      </div>

      {/* Avatar */}
      <div className="ep__avatar-section">
        <div className="ep__avatar-wrap">
          {avatarSrc
            ? <img src={avatarSrc} alt="Аватар" className="ep__avatar" referrerPolicy="no-referrer" />
            : <img src={avatar1} alt="Аватар" className="ep__avatar" />
          }
          <button className="ep__avatar-overlay">
            <CameraIcon />
          </button>
        </div>
        <span className="ep__avatar-hint">{ep.changePhoto}</span>
      </div>

      {/* Fields */}
      <div className="ep__fields">
        {/* Display name */}
        <div className="ep__field">
          <label className="ep__label">Имя</label>
          <input
            className="ep__input"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            maxLength={50}
            placeholder="Твоё имя"
          />
        </div>

        {/* Username */}
        <div className="ep__field">
          <label className="ep__label">Username</label>
          <div className="ep__input-prefix-wrap">
            <span className="ep__prefix">@</span>
            <input
              className="ep__input ep__input--with-prefix"
              value={username}
              onChange={(e) => setUsername(e.target.value.replace(/\s/g, '_').toLowerCase())}
              maxLength={30}
              placeholder="твой_никнейм"
            />
          </div>
          {tgUser && (
            <span className="ep__field-hint">Синхронизировано с Telegram</span>
          )}
        </div>

        {/* Bio */}
        <div className="ep__field">
          <label className="ep__label">О себе</label>
          <textarea
            className="ep__textarea"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            maxLength={150}
            placeholder="Пару слов об уходе..."
          />
          <span className="ep__char-count">{bio.length}/150</span>
        </div>

        {/* Skin type */}
        <div className="ep__field">
          <label className="ep__label">Тип кожи</label>
          <div className="ep__skin-chips">
            {SKIN_TYPES.map((type) => (
              <button
                key={type}
                className={`ep__skin-chip${skinType === type ? ' ep__skin-chip--active' : ''}`}
                onClick={() => setSkinType(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="ep__divider" />

      {/* Social networks */}
      <div className="ep__section">
        <span className="ep__section-title">Социальные сети</span>
        <div className="ep__socials-grid">
          {SOCIALS.map((s) => (
            <button
              key={s.id}
              className={`ep__social-btn${connected.has(s.id) ? ' ep__social-btn--connected' : ''}`}
              onClick={() => toggleSocial(s.id)}
            >
              <img src={s.icon} alt={s.label} className="ep__social-icon" />
              <span className="ep__social-label">{s.label}</span>
              {connected.has(s.id) && <span className="ep__social-check">✓</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom save button */}
      <div className="ep__footer">
        <Button fullWidth onClick={handleSave}>
          {saved ? 'Сохранено ✓' : 'Сохранить изменения'}
        </Button>
      </div>
    </div>
  );
}

function CameraIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="13" r="4" stroke="white" strokeWidth="1.8" />
    </svg>
  );
}
