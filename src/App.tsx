import { useState } from 'react';
import { BottomNav, type NavTab } from './components/BottomNav';
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
import { getTelegramUser, getDisplayName, type TelegramUser } from './hooks/useTelegramUser';
import './App.css';

type Screen = NavTab | 'brand' | 'giveaway' | 'setup' | 'user' | 'review' | 'product';

// Определяем начальное состояние авторизации при запуске
const tgUser = getTelegramUser();

function App() {
  const [isRegistered, setIsRegistered] = useState<boolean>(!!tgUser);
  const [currentUser, setCurrentUser] = useState<TelegramUser | null>(tgUser);
  const [screen, setScreen] = useState<Screen>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);

  const activeTab = (['home', 'search', 'add', 'messages', 'profile'] as NavTab[]).includes(screen as NavTab)
    ? (screen as NavTab)
    : 'home';

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

  if (screen === 'setup' && !tgUser) {
    return <ProfileSetup onComplete={() => setScreen('home')} />;
  }

  const displayName = currentUser
    ? getDisplayName(currentUser)
    : '@гость';

  const renderScreen = () => {
    switch (screen) {
      case 'home':
        return (
          <Home
            userName={displayName}
            onBrand={() => setScreen('brand')}
            onGiveaway={() => setScreen('giveaway')}
            onReview={() => setScreen('review')}
          />
        );
      case 'search':   return <Search />;
      case 'add':      return <WriteReview onPublish={() => setScreen('home')} />;
      case 'messages': return <Messages onUserProfile={() => setScreen('user')} onBrandProfile={() => setScreen('brand')} />;
      case 'profile':  return <Profile tgUser={currentUser} displayName={displayName} />;
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

  void setCurrentUser;

  return (
    <>
      {renderScreen()}
      <BottomNav active={activeTab} onTab={(tab) => setScreen(tab)} />
    </>
  );
}

export default App;
