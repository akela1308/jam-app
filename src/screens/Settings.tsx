import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import './Settings.css';

interface SettingsProps {
  onBack?: () => void;
  onEditProfile?: () => void;
  onPoints?: () => void;
}

const APP_VERSION = '1.0.0';

export function Settings({ onBack, onEditProfile, onPoints }: SettingsProps) {
  const { t, lang, setLang } = useLanguage();
  const s = t.settings;
  const [notifLikes, setNotifLikes] = useState(true);
  const [notifFollows, setNotifFollows] = useState(true);
  const [notifCoupons, setNotifCoupons] = useState(true);
  const [notifEvents, setNotifEvents] = useState(false);

  return (
    <div className="screen-content">
      <div className="settings__header">
        {onBack && <button className="settings__back" onClick={onBack}>←</button>}
        <h1 className="settings__title">{s.title}</h1>
      </div>

      <SettingsSection title={s.language}>
        <div className="settings__lang-row">
          <button
            className={`settings__lang-btn${lang === 'hr' ? ' settings__lang-btn--active' : ''}`}
            onClick={() => setLang('hr')}
          >🇭🇷 {s.languageHR}</button>
          <button
            className={`settings__lang-btn${lang === 'ru' ? ' settings__lang-btn--active' : ''}`}
            onClick={() => setLang('ru')}
          >🇷🇺 {s.languageRU}</button>
        </div>
      </SettingsSection>

      <SettingsSection title={s.account}>
        <SettingsRow icon="✏️" label={s.editProfile}  onTap={onEditProfile} arrow />
        <SettingsRow icon="🏆" label={s.pointsLevels} onTap={onPoints}      arrow />
        <SettingsRow icon="🔗" label={s.inviteFriend} onTap={() => {}}       arrow />
      </SettingsSection>

      <SettingsSection title={s.notifications}>
        <SettingsToggleRow icon="❤️"  label={s.notifLikes}   value={notifLikes}   onChange={setNotifLikes} />
        <SettingsToggleRow icon="👤"  label={s.notifFollows} value={notifFollows} onChange={setNotifFollows} />
        <SettingsToggleRow icon="🎟️" label={s.notifCoupons} value={notifCoupons} onChange={setNotifCoupons} />
        <SettingsToggleRow icon="🎁"  label={s.notifEvents}  value={notifEvents}  onChange={setNotifEvents} />
      </SettingsSection>

      <SettingsSection title={s.privacy}>
        <SettingsRow icon="🔒" label={s.privateProfile} onTap={() => {}} arrow />
        <SettingsRow icon="🚫" label={s.blocked}        onTap={() => {}} arrow badge="0" />
        <SettingsRow icon="📊" label={s.myData}         onTap={() => {}} arrow />
      </SettingsSection>

      <SettingsSection title={s.about}>
        <SettingsRow icon="📋" label={s.terms}         onTap={() => {}} arrow />
        <SettingsRow icon="🛡️" label={s.privacyPolicy} onTap={() => {}} arrow />
        <SettingsRow icon="💬" label={s.feedback}      onTap={() => {}} arrow />
        <SettingsRow icon="⭐" label={s.rateApp}       onTap={() => {}} arrow />
        <SettingsRow icon="ℹ️" label={s.version} onTap={() => {}}
          right={<span className="settings__version-tag">v{APP_VERSION}</span>} />
      </SettingsSection>

      <div className="settings__signout-wrap">
        <button className="settings__signout-btn">{s.signOut}</button>
      </div>
    </div>
  );
}

function SettingsSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="settings__section">
      <span className="settings__section-title">{title}</span>
      <div className="settings__group">{children}</div>
    </div>
  );
}

interface RowProps {
  icon: string;
  label: string;
  onTap?: () => void;
  arrow?: boolean;
  badge?: string;
  right?: React.ReactNode;
}

function SettingsRow({ icon, label, onTap, arrow, badge, right }: RowProps) {
  return (
    <button className="settings__row" onClick={onTap}>
      <span className="settings__row-icon">{icon}</span>
      <span className="settings__row-label">{label}</span>
      <div className="settings__row-right">
        {badge && <span className="settings__badge">{badge}</span>}
        {right}
        {arrow && <ChevronIcon />}
      </div>
    </button>
  );
}

interface ToggleRowProps {
  icon: string;
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}

function SettingsToggleRow({ icon, label, value, onChange }: ToggleRowProps) {
  return (
    <div className="settings__row settings__row--toggle">
      <span className="settings__row-icon">{icon}</span>
      <span className="settings__row-label">{label}</span>
      <button
        className={`settings__toggle${value ? ' settings__toggle--on' : ''}`}
        onClick={() => onChange(!value)}
        role="switch"
        aria-checked={value}
      >
        <span className="settings__toggle-thumb" />
      </button>
    </div>
  );
}

function ChevronIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="settings__chevron">
      <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
