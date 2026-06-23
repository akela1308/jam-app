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
  // Flower/asterisk shape matching Figma design
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      {/* 8-petal flower / asterisk */}
      <path d="M14 4C14 4 13 8 14 10C15 8 14 4 14 4Z" fill="var(--color-primary)" />
      <path d="M14 24C14 24 15 20 14 18C13 20 14 24 14 24Z" fill="var(--color-primary)" />
      <path d="M4 14C4 14 8 15 10 14C8 13 4 14 4 14Z" fill="var(--color-primary)" />
      <path d="M24 14C24 14 20 13 18 14C20 15 24 14 24 14Z" fill="var(--color-primary)" />
      <path d="M6.93 6.93C6.93 6.93 9.76 9.76 11.17 9.17C9.76 7.76 6.93 6.93 6.93 6.93Z" fill="var(--color-primary)" />
      <path d="M21.07 21.07C21.07 21.07 18.24 18.24 16.83 18.83C18.24 20.24 21.07 21.07 21.07 21.07Z" fill="var(--color-primary)" />
      <path d="M21.07 6.93C21.07 6.93 18.24 9.76 18.83 11.17C20.24 9.76 21.07 6.93 21.07 6.93Z" fill="var(--color-primary)" />
      <path d="M6.93 21.07C6.93 21.07 9.76 18.24 9.17 16.83C7.76 18.24 6.93 21.07 6.93 21.07Z" fill="var(--color-primary)" />
      <circle cx="14" cy="14" r="4.5" fill="var(--color-primary)" />
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
