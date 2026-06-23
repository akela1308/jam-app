import React from 'react';
import './BottomNav.css';

export type NavTab = 'home' | 'search' | 'add' | 'messages' | 'profile';

interface BottomNavProps {
  active: NavTab;
  onTab: (tab: NavTab) => void;
}

const tabs: { id: NavTab; icon: React.ComponentType<{ active: boolean }>; label: string }[] = [
  { id: 'home', label: 'Главная', icon: HomeIcon },
  { id: 'search', label: 'Поиск', icon: SearchIcon },
  { id: 'add', label: 'Добавить', icon: AddIcon },
  { id: 'messages', label: 'Сообщения', icon: ChatIcon },
  { id: 'profile', label: 'Профиль', icon: ProfileIcon },
];

export function BottomNav({ active, onTab }: BottomNavProps) {
  return (
    <nav className="bottom-nav">
      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          className={`bottom-nav__item${active === id ? ' bottom-nav__item--active' : ''}${id === 'add' ? ' bottom-nav__item--add' : ''}`}
          onClick={() => onTab(id)}
          aria-label={label}
        >
          <Icon active={active === id} />
        </button>
      ))}
    </nav>
  );
}

/* ── SVG Icons ── */

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 9.5L12 3L21 9.5V20C21 20.55 20.55 21 20 21H15V15H9V21H4C3.45 21 3 20.55 3 20V9.5Z"
        fill={active ? 'var(--color-primary)' : 'none'}
        stroke={active ? 'var(--color-primary)' : 'var(--color-text-secondary)'}
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SearchIcon({ active }: { active: boolean }) {
  const c = active ? 'var(--color-primary)' : 'var(--color-text-secondary)';
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke={c} strokeWidth="1.7" />
      <path d="M16.5 16.5L21 21" stroke={c} strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function AddIcon(_: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="var(--color-primary)" />
      <path d="M12 7V17M7 12H17" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ChatIcon({ active }: { active: boolean }) {
  const c = active ? 'var(--color-primary)' : 'var(--color-text-secondary)';
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 4H20C20.55 4 21 4.45 21 5V15C21 15.55 20.55 16 20 16H7L3 20V5C3 4.45 3.45 4 4 4Z"
        fill={active ? 'var(--color-primary)' : 'none'}
        stroke={c}
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProfileIcon({ active }: { active: boolean }) {
  const c = active ? 'var(--color-primary)' : 'var(--color-text-secondary)';
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" stroke={c} strokeWidth="1.7" />
      <path d="M4 20C4 17 7.6 14 12 14C16.4 14 20 17 20 20" stroke={c} strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}
