import { useState } from 'react';
import './Settings.css';

interface SettingsProps {
  onBack?: () => void;
  onEditProfile?: () => void;
  onPoints?: () => void;
}

const APP_VERSION = '1.0.0';

export function Settings({ onBack, onEditProfile, onPoints }: SettingsProps) {
  const [notifLikes, setNotifLikes] = useState(true);
  const [notifFollows, setNotifFollows] = useState(true);
  const [notifCoupons, setNotifCoupons] = useState(true);
  const [notifEvents, setNotifEvents] = useState(false);

  return (
    <div className="screen-content">
      {/* Header */}
      <div className="settings__header">
        {onBack && (
          <button className="settings__back" onClick={onBack}>←</button>
        )}
        <h1 className="settings__title">Настройки</h1>
      </div>

      {/* Account */}
      <SettingsSection title="Аккаунт">
        <SettingsRow icon="✏️" label="Редактировать профиль" onTap={onEditProfile} arrow />
        <SettingsRow icon="🏆" label="Баллы и уровни"        onTap={onPoints}      arrow />
        <SettingsRow icon="🔗" label="Пригласить друга"      onTap={() => {}}       arrow />
      </SettingsSection>

      {/* Notifications */}
      <SettingsSection title="Уведомления">
        <SettingsToggleRow
          icon="❤️"
          label="Лайки на отзывы"
          value={notifLikes}
          onChange={setNotifLikes}
        />
        <SettingsToggleRow
          icon="👤"
          label="Новые подписчики"
          value={notifFollows}
          onChange={setNotifFollows}
        />
        <SettingsToggleRow
          icon="🎟️"
          label="Новые купоны"
          value={notifCoupons}
          onChange={setNotifCoupons}
        />
        <SettingsToggleRow
          icon="🎁"
          label="Старт эвентов"
          value={notifEvents}
          onChange={setNotifEvents}
        />
      </SettingsSection>

      {/* Privacy */}
      <SettingsSection title="Конфиденциальность">
        <SettingsRow icon="🔒" label="Закрытый профиль"    onTap={() => {}} arrow />
        <SettingsRow icon="🚫" label="Заблокированные"     onTap={() => {}} arrow badge="0" />
        <SettingsRow icon="📊" label="Мои данные"          onTap={() => {}} arrow />
      </SettingsSection>

      {/* About */}
      <SettingsSection title="О приложении">
        <SettingsRow icon="📋" label="Условия использования" onTap={() => {}} arrow />
        <SettingsRow icon="🛡️" label="Политика конфиденциальности" onTap={() => {}} arrow />
        <SettingsRow icon="💬" label="Обратная связь"        onTap={() => {}} arrow />
        <SettingsRow
          icon="⭐"
          label="Оценить приложение"
          onTap={() => {}}
          arrow
        />
        <SettingsRow
          icon="ℹ️"
          label="Версия"
          onTap={() => {}}
          right={<span className="settings__version-tag">v{APP_VERSION}</span>}
        />
      </SettingsSection>

      {/* Sign out */}
      <div className="settings__signout-wrap">
        <button className="settings__signout-btn">
          Выйти из аккаунта
        </button>
      </div>
    </div>
  );
}

/* ── Sub-components ───────────────────────────────────── */

function SettingsSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="settings__section">
      <span className="settings__section-title">{title}</span>
      <div className="settings__group">
        {children}
      </div>
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
