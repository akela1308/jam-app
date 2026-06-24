import { useLanguage } from '../i18n/LanguageContext';
import './CouponCard.css';

export interface Coupon {
  id: string;
  brand: string;
  title: string;
  discount: string;
  expiresAt: string;
  color: string;
}

interface CouponCardProps {
  coupon: Coupon;
}

export function CouponCard({ coupon }: CouponCardProps) {
  const { t } = useLanguage();
  const cc = t.couponCard;
  return (
    <div className="coupon-card" style={{ background: coupon.color }}>
      <div className="coupon-card__top">
        <span className="coupon-card__brand">{coupon.brand}</span>
        <span className="coupon-card__discount">{coupon.discount}</span>
      </div>
      <div className="coupon-card__title">{coupon.title}</div>
      <div className="coupon-card__footer">
        <span className="coupon-card__expires">{cc.validUntil} {coupon.expiresAt}</span>
        <button className="coupon-card__btn">{cc.get}</button>
      </div>
      <div className="coupon-card__perf" />
    </div>
  );
}
