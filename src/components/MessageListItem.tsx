import './MessageListItem.css';

export interface Message {
  id: string;
  name: string;
  preview: string;
  time: string;
  avatarUrl?: string;
  isUnread: boolean;
  isBrand: boolean;
}

interface MessageListItemProps {
  message: Message;
  onClick: () => void;
}

export function MessageListItem({ message, onClick }: MessageListItemProps) {
  return (
    <button className={`msg-item${message.isUnread ? ' msg-item--unread' : ''}`} onClick={onClick}>
      <div className="msg-item__avatar">
        {message.avatarUrl ? (
          <img src={message.avatarUrl} alt={message.name} className="msg-item__avatar-img" />
        ) : (
          <div className="msg-item__avatar-placeholder">
            {message.name.charAt(0).toUpperCase()}
          </div>
        )}
        {message.isBrand && <span className="msg-item__brand-badge">B</span>}
      </div>

      <div className="msg-item__body">
        <div className="msg-item__header">
          <span className="msg-item__name">{message.name}</span>
          <span className="msg-item__time">{message.time}</span>
        </div>
        <div className="msg-item__preview-row">
          <span className="msg-item__preview">{message.preview}</span>
          {message.isUnread && <span className="msg-item__badge">новое</span>}
        </div>
      </div>
    </button>
  );
}
