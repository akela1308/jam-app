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
import './App.css';

type Screen = NavTab | 'brand' | 'giveaway';

function App() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [screen, setScreen] = useState<Screen>('home');
  const activeTab = (['home', 'search', 'add', 'messages', 'profile'] as NavTab[]).includes(screen as NavTab)
    ? (screen as NavTab)
    : 'home';

  if (!isRegistered) {
    return <Registration onComplete={() => setIsRegistered(true)} />;
  }

  const renderScreen = () => {
    switch (screen) {
      case 'home':     return <Home onBrand={() => setScreen('brand')} onGiveaway={() => setScreen('giveaway')} />;
      case 'search':   return <Search />;
      case 'add':      return <WriteReview onPublish={() => setScreen('home')} />;
      case 'messages': return <Messages />;
      case 'profile':  return <Profile />;
      case 'brand':    return <BrandProfile onBack={() => setScreen('home')} onGiveaway={() => setScreen('giveaway')} />;
      case 'giveaway': return <Giveaway onBack={() => setScreen('home')} />;
      default:         return <Home onBrand={() => setScreen('brand')} onGiveaway={() => setScreen('giveaway')} />;
    }
  };

  return (
    <>
      {renderScreen()}
      <BottomNav active={activeTab} onTab={(tab) => setScreen(tab)} />
    </>
  );
}

export default App;
