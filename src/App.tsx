import { useState } from 'react';
import { BottomNav, type NavTab } from './components/BottomNav';
import { Registration } from './screens/Registration';
import { Home } from './screens/Home';
import { Messages } from './screens/Messages';
import { Search } from './screens/Search';
import { WriteReview } from './screens/WriteReview';
import { Profile } from './screens/Profile';
import './App.css';

function App() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [activeTab, setActiveTab] = useState<NavTab>('home');

  if (!isRegistered) {
    return <Registration onComplete={() => setIsRegistered(true)} />;
  }

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':     return <Home />;
      case 'search':   return <Search />;
      case 'add':      return <WriteReview onPublish={() => setActiveTab('home')} />;
      case 'messages': return <Messages />;
      case 'profile':  return <Profile />;
      default:         return <Home />;
    }
  };

  return (
    <>
      {renderScreen()}
      <BottomNav active={activeTab} onTab={setActiveTab} />
    </>
  );
}

export default App;
