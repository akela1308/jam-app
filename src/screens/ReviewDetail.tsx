import { useState } from 'react';
import avatar1 from '../assets/avatars/avatar-1.png';
import avatar3 from '../assets/avatars/avatar-3.png';
import avatar4 from '../assets/avatars/avatar-4.png';
import './ReviewDetail.css';

interface ReviewDetailProps {
  onBack?: () => void;
  onUserProfile?: () => void;
  onBrandProfile?: () => void;
}

const COMMENTS = [
  { id: '1', user: '@kate_beauty', avatar: avatar3, text: 'Тоже пользуюсь этой сывороткой — полностью согласна!', time: '2ч назад', likes: 3 },
  { id: '2', user: '@user01', avatar: avatar4, text: 'А у тебя какой тип кожи? Интересно, подойдёт ли мне', time: '5ч назад', likes: 1 },
];

export function ReviewDetail({ onBack, onUserProfile, onBrandProfile }: ReviewDetailProps) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(48);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(COMMENTS);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount((n) => liked ? n - 1 : n + 1);
  };

  const handleSendComment = () => {
    if (!comment.trim()) return;
    setComments([
      {
        id: String(Date.now()),
        user: '@anna_skin',
        avatar: avatar1,
        text: comment.trim(),
        time: 'Только что',
        likes: 0,
      },
      ...comments,
    ]);
    setComment('');
  };

  return (
    <div className="review-detail">
      {/* Sticky header */}
      <div className="review-detail__header">
        <button className="review-detail__back" onClick={onBack}>←</button>
        <span className="review-detail__header-title">Отзыв</span>
        <button className="review-detail__save" onClick={() => setSaved(!saved)}>
          {saved ? '🔖' : '📎'}
        </button>
      </div>

      <div className="review-detail__scroll">
        {/* Author */}
        <button className="review-detail__author" onClick={onUserProfile}>
          <img src={avatar1} alt="@anna_skin" className="review-detail__author-avatar" />
          <div className="review-detail__author-info">
            <span className="review-detail__author-name">@anna_skin</span>
            <span className="review-detail__author-date">15 декабря 2024</span>
          </div>
          <span className="review-detail__author-arrow">›</span>
        </button>

        {/* Product badge */}
        <button className="review-detail__product-badge" onClick={onBrandProfile}>
          <div className="review-detail__product-thumb" />
          <div className="review-detail__product-info">
            <span className="review-detail__product-brand">@blush</span>
            <span className="review-detail__product-name">Vitamin C Serum, 30ml</span>
          </div>
          <span className="review-detail__product-arrow">›</span>
        </button>

        {/* Rating */}
        <div className="review-detail__rating-row">
          <div className="review-detail__stars">
            {[1,2,3,4,5].map((s) => (
              <span key={s} className={`review-detail__star${s <= 5 ? ' review-detail__star--filled' : ''}`}>★</span>
            ))}
          </div>
          <span className="review-detail__rating-num">5.0</span>
        </div>

        {/* Title */}
        <h1 className="review-detail__title">
          Лучшая сыворотка с витамином С — кожа сияет!
        </h1>

        {/* Skin type tag */}
        <div className="review-detail__tags">
          <span className="review-detail__tag">💧 Комбинированная кожа</span>
          <span className="review-detail__tag">⏱ Использую 1 месяц</span>
        </div>

        {/* Photo placeholder */}
        <div className="review-detail__photos">
          <div className="review-detail__photo review-detail__photo--main" />
          <div className="review-detail__photo-grid">
            <div className="review-detail__photo review-detail__photo--sm" />
            <div className="review-detail__photo review-detail__photo--sm" />
            <div className="review-detail__photo review-detail__photo--sm review-detail__photo--more">
              +2
            </div>
          </div>
        </div>

        {/* Review text */}
        <div className="review-detail__body">
          <p className="review-detail__text">
            Пользуюсь этой сывороткой уже месяц и результат просто потрясающий. Кожа стала заметно ровнее и светлее — пигментные пятна после акне начали осветляться уже на второй неделе.
          </p>
          <p className="review-detail__text">
            Текстура лёгкая, впитывается моментально, без липкости. Запах очень нейтральный — почти нет. Наношу на чистую кожу перед увлажняющим кремом утром и вечером.
          </p>
          <p className="review-detail__text">
            Единственный минус — флакон быстро расходуется если пользоваться дважды в день. Но результат однозначно стоит своих денег!
          </p>
        </div>

        {/* Pros / Cons */}
        <div className="review-detail__verdict">
          <div className="review-detail__verdict-col review-detail__verdict-col--pro">
            <span className="review-detail__verdict-icon">👍</span>
            <span className="review-detail__verdict-label">Плюсы</span>
            <ul className="review-detail__verdict-list">
              <li>Осветляет пигментацию</li>
              <li>Лёгкая текстура</li>
              <li>Быстро впитывается</li>
            </ul>
          </div>
          <div className="review-detail__verdict-col review-detail__verdict-col--con">
            <span className="review-detail__verdict-icon">👎</span>
            <span className="review-detail__verdict-label">Минусы</span>
            <ul className="review-detail__verdict-list">
              <li>Расходуется быстро</li>
            </ul>
          </div>
        </div>

        {/* Actions row */}
        <div className="review-detail__actions">
          <button
            className={`review-detail__action-btn${liked ? ' review-detail__action-btn--liked' : ''}`}
            onClick={handleLike}
          >
            <span className="review-detail__action-icon">{liked ? '❤️' : '🤍'}</span>
            <span>{likeCount}</span>
          </button>
          <button className="review-detail__action-btn">
            <span className="review-detail__action-icon">💬</span>
            <span>{comments.length}</span>
          </button>
          <button className="review-detail__action-btn" onClick={() => setSaved(!saved)}>
            <span className="review-detail__action-icon">{saved ? '🔖' : '📎'}</span>
            <span>{saved ? 'Сохранено' : 'Сохранить'}</span>
          </button>
        </div>

        {/* Comments */}
        <div className="review-detail__comments">
          <h2 className="review-detail__comments-title">Комментарии · {comments.length}</h2>
          {comments.map((c) => (
            <div key={c.id} className="review-comment">
              <img src={c.avatar} alt={c.user} className="review-comment__avatar" />
              <div className="review-comment__body">
                <div className="review-comment__header">
                  <span className="review-comment__user">{c.user}</span>
                  <span className="review-comment__time">{c.time}</span>
                </div>
                <p className="review-comment__text">{c.text}</p>
                <button className="review-comment__like">
                  🤍 {c.likes}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Spacer for input */}
        <div style={{ height: 80 }} />
      </div>

      {/* Comment input — fixed at bottom */}
      <div className="review-detail__input-bar">
        <img src={avatar1} alt="me" className="review-detail__input-avatar" />
        <input
          className="review-detail__input"
          placeholder="Написать комментарий..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendComment()}
        />
        <button
          className={`review-detail__send${comment.trim() ? ' review-detail__send--active' : ''}`}
          onClick={handleSendComment}
          disabled={!comment.trim()}
        >
          ↑
        </button>
      </div>
    </div>
  );
}
