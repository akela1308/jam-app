import { useState } from 'react';
import { MessageListItem, type Message } from '../components/MessageListItem';
import avatar1 from '../assets/avatars/avatar-1.png';
import avatar2 from '../assets/avatars/avatar-2.png';
import avatar3 from '../assets/avatars/avatar-3.png';
import avatar4 from '../assets/avatars/avatar-4.png';
import avatar5 from '../assets/avatars/avatar-5.png';
import './Messages.css';

type Tab = 'all' | 'brands' | 'users';

const ALL_MESSAGES: Message[] = [
  { id: '1', name: '@med_b', preview: 'Ваш купон активирован!', time: '12:30', avatarUrl: avatar1, isUnread: true, isBrand: true },
  { id: '2', name: '@anna_skin', preview: 'Спасибо за рекомендацию 💛', time: '11:15', avatarUrl: avatar2, isUnread: false, isBrand: false },
  { id: '3', name: '@blush_official', preview: 'Новая коллекция уже здесь!', time: '10:02', avatarUrl: avatar3, isUnread: true, isBrand: true },
  { id: '4', name: '@user01', preview: 'Ты пробовала эту сыворотку?', time: 'Вчера', avatarUrl: avatar4, isUnread: false, isBrand: false },
  { id: '5', name: '@kate_beauty', preview: 'Да, очень понравилась!', time: 'Вчера', avatarUrl: avatar5, isUnread: false, isBrand: false },
  { id: '6', name: '@skinfood_ru', preview: 'Скидка 30% только сегодня', time: 'Пн', avatarUrl: undefined, isUnread: true, isBrand: true },
];

const TABS: { id: Tab; label: string }[] = [
  { id: 'all', label: 'Все' },
  { id: 'brands', label: 'Бренды' },
  { id: 'users', label: 'Пользователи' },
];

export function Messages() {
  const [activeTab, setActiveTab] = useState<Tab>('all');

  const filtered = ALL_MESSAGES.filter((m) => {
    if (activeTab === 'brands') return m.isBrand;
    if (activeTab === 'users') return !m.isBrand;
    return true;
  });

  return (
    <div className="screen-content">
      <div className="messages__header">
        <h1 className="messages__title">Сообщения</h1>
        <div className="messages__tabs">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`messages__tab${activeTab === tab.id ? ' messages__tab--active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="messages__list">
        {filtered.map((msg) => (
          <MessageListItem
            key={msg.id}
            message={msg}
            onClick={() => console.log('open chat', msg.id)}
          />
        ))}
      </div>
    </div>
  );
}
