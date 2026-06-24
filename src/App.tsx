import { useState } from 'react';
import { LanguageProvider } from './i18n/LanguageContext';
import { BottomNav, type NavTab } from './components/BottomNav';
import { Splash } from './screens/Splash';
import { Onboarding } from './screens/Onboarding';
import { Registration } from './screens/Registration';
import { Home } from './screens/Home';
import { Messages } from './screens/Messages';
import { Search } from './screens/Search';
import { WriteReview } from './screens/WriteReview';
import { Profile } from './screens/Profile';
import { BrandProfile } from './screens/BrandProfile';
import { Giveaway } from './screens/Giveaway';
import { ProfileSetup } from './screens/ProfileSetup';
import { UserProfile } from './screens/UserProfile';
import { ReviewDetail } from './screens/ReviewDetail';
import { ProductDetail, type Product } from './screens/ProductDetail';
import { SearchResults } from './screens/SearchResults';
import { EditProfile } from './screens/EditProfile';
import { Chat, type ChatContact } from './screens/Chat';
import { Notifications } from './screens/Notifications';
import { Coupons } from './screens/Coupons';
import { Events } from './screens/Events';
import { PointsLevels } from './screens/PointsLevels';
import { Settings } from './screens/Settings';
import { Brands } from './screens/Brands';
import { Leaderboard } from './screens/Leaderboard';
import { getTelegramUser, getDisplayName, type TelegramUser } from './hooks/useTelegramUser';
import './App.css';

type Screen =
  | NavTab
  | 'brand' | 'giveaway' | 'setup' | 'user' | 'review'
  | 'product' | 'search-results' | 'edit-profile' | 'chat' | 'notifications'
  | 'coupons' | 'events' | 'points' | 'settings' | 'brands' | 'leaderboard';

type AppPhase = 'splash' | 'onboarding' | 'app';

const CATEGORY_EMOJIS: Record<string, string> = {
  Очищение: '🫧', Отшелушивание: '✨', Тонер: '💧', Сыворотка: '⚗️',
  Маска: '🎭', Крем: '🫙', 'Крем для глаз': '👁️', 'Бальзам для губ': '💋', Солнцезащита: '☀️',
};

const CATEGORY_LABELS: Record<string, string> = {
  cleansing: 'Очищение', exfoliation: 'Отшелушивание', toner: 'Тонер',
  serum: 'Сыворотка', mask: 'Маска', cream: 'Крем',
  'eye-cream': 'Крем для глаз', 'lip-balm': 'Бальзам для губ', sunscreen: 'Солнцезащита',
};

const tgUser = getTelegramUser();

function App() {
  // In Telegram: skip splash/onboarding. In browser: show full flow.
  const [phase, setPhase] = useState<AppPhase>(tgUser ? 'app' : 'splash');
  const [isRegistered, setIsRegistered] = useState<boolean>(!!tgUser);
  const [currentUser, setCurrentUser] = useState<TelegramUser | null>(tgUser);
  const [screen, setScreen] = useState<Screen>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] = useState<string>('Сыворотка');
  const [chatContact, setChatContact] = useState<ChatContact | undefined>(undefined);

  void setCurrentUser;

  // ── Splash ──────────────────────────────────────────────
  if (phase === 'splash') {
    return <Splash onDone={() => setPhase('onboarding')} />;
  }

  // ── Onboarding ──────────────────────────────────────────
  if (phase === 'onboarding') {
    return <Onboarding onDone={() => setPhase('app')} />;
  }

  // ── Registration ────────────────────────────────────────
  if (!isRegistered) {
    return (
      <Registration
        onComplete={() => {
          setIsRegistered(true);
          setScreen('setup');
        }}
      />
    );
  }

  // ── Profile setup (browser only) ────────────────────────
  if (screen === 'setup' && !tgUser) {
    return <ProfileSetup onComplete={() => setScreen('home')} />;
  }

  const displayName = currentUser ? getDisplayName(currentUser) : '@гость';

  const activeTab = (['home', 'search', 'add', 'messages', 'profile'] as NavTab[]).includes(screen as NavTab)
    ? (screen as NavTab)
    : screen === 'search-results' ? 'search'
    : screen === 'chat' ? 'messages'
    : 'home';

  const renderScreen = () => {
    switch (screen) {
      case 'home':
        return (
          <Home
            userName={displayName}
            onBrand={() => setScreen('brand')}
            onGiveaway={() => setScreen('giveaway')}
            onReview={() => setScreen('review')}
            onNotifications={() => setScreen('notifications')}
            onAllCoupons={() => setScreen('coupons')}
            onAllEvents={() => setScreen('events')}
            onBrands={() => setScreen('brands')}
            onLeaderboard={() => setScreen('leaderboard')}
          />
        );
      case 'coupons':
        return <Coupons onBack={() => setScreen('home')} onBrand={() => setScreen('brand')} />;
      case 'events':
        return <Events onBack={() => setScreen('home')} onEvent={() => setScreen('giveaway')} onBrand={() => setScreen('brand')} />;
      case 'notifications':
        return <Notifications onBack={() => setScreen('home')} />;
      case 'search':
        return (
          <Search
            onCategorySelect={(id) => {
              setSelectedCategory(CATEGORY_LABELS[id] ?? id);
              setScreen('search-results');
            }}
          />
        );
      case 'search-results':
        return (
          <SearchResults
            category={selectedCategory}
            categoryEmoji={CATEGORY_EMOJIS[selectedCategory] ?? '🔍'}
            onBack={() => setScreen('search')}
            onProduct={() => setScreen('product')}
            onBrand={() => setScreen('brand')}
          />
        );
      case 'add':      return <WriteReview onPublish={() => setScreen('home')} />;
      case 'messages':
        return (
          <Messages
            onUserProfile={() => setScreen('user')}
            onBrandProfile={() => setScreen('brand')}
            onChat={(contact) => { setChatContact(contact); setScreen('chat'); }}
          />
        );
      case 'chat':
        return (
          <Chat
            contact={chatContact}
            onBack={() => setScreen('messages')}
            onProfile={() => chatContact?.isBrand ? setScreen('brand') : setScreen('user')}
          />
        );
      case 'profile':
        return (
          <Profile
            tgUser={currentUser}
            displayName={displayName}
            onEdit={() => setScreen('edit-profile')}
            onSettings={() => setScreen('settings')}
            onPoints={() => setScreen('points')}
          />
        );
      case 'points':
        return <PointsLevels onBack={() => setScreen('profile')} />;
      case 'settings':
        return (
          <Settings
            onBack={() => setScreen('profile')}
            onEditProfile={() => setScreen('edit-profile')}
            onPoints={() => setScreen('points')}
          />
        );
      case 'edit-profile':
        return (
          <EditProfile
            tgUser={currentUser}
            onBack={() => setScreen('profile')}
            onSave={() => setScreen('profile')}
          />
        );
      case 'brands':
        return <Brands onBack={() => setScreen('home')} onBrand={() => setScreen('brand')} />;
      case 'leaderboard':
        return <Leaderboard onBack={() => setScreen('home')} />;
      case 'brand':
        return (
          <BrandProfile
            onBack={() => setScreen('home')}
            onGiveaway={() => setScreen('giveaway')}
            onProduct={(p) => { setSelectedProduct(p); setScreen('product'); }}
          />
        );
      case 'giveaway': return <Giveaway onBack={() => setScreen('home')} />;
      case 'user':     return <UserProfile onBack={() => setScreen('messages')} onMessage={() => setScreen('messages')} />;
      case 'review':   return <ReviewDetail onBack={() => setScreen('home')} onUserProfile={() => setScreen('user')} onBrandProfile={() => setScreen('brand')} />;
      case 'product':
        return (
          <ProductDetail
            product={selectedProduct}
            onBack={() => setScreen('brand')}
            onWriteReview={() => setScreen('add')}
          />
        );
      default: return <Home userName={displayName} onBrand={() => setScreen('brand')} onGiveaway={() => setScreen('giveaway')} />;
    }
  };

  return (
    <LanguageProvider>
      <>
        {renderScreen()}
        <BottomNav active={activeTab} onTab={(tab) => setScreen(tab)} />
      </>
    </LanguageProvider>
  );
}

export default App;
