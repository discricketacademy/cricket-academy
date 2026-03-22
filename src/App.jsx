import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Programs from './components/Programs';
import RisingStarsFeatured from './components/RisingStars/RisingStarsFeatured';
import PlayerGrid from './components/RisingStars/PlayerGrid'; // Full DB Page
import PlayerProfilePage from './components/RisingStars/PlayerProfilePage';
import RegisterPage from './components/Registration/RegisterPage';
import AdminDashboard from './components/Admin/AdminDashboard';
import Rules from './components/Rules';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './index.css';

function App() {
  // Navigation State: 'home', 'all-players', 'player-profile', 'register', 'admin'
  const getInitialView = () => {
    const path = window.location.pathname;
    if (path === '/all-players') return 'all-players';
    if (path === '/register') return 'register';
    if (path === '/admin') return 'admin';
    return 'home';
  };

  const [currentView, setCurrentView] = useState(getInitialView());
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  // Sync state with browser History API
  useEffect(() => {
    const handlePopState = () => {
      setCurrentView(getInitialView());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Routing Handlers
  const handleNavigate = (view) => {
    setCurrentView(view);
    window.scrollTo(0, 0);
    // Push state to update URL without reloading page
    const routeMap = {
      'home': '/',
      'all-players': '/all-players',
      'register': '/register',
      'admin': '/admin',
      'player-profile': '/player-profile'
    };
    if (routeMap[view]) {
      window.history.pushState(null, '', routeMap[view]);
    }
  };

  const handlePlayerSelect = (player) => {
    setSelectedPlayer(player);
    setCurrentView('player-profile');
  };

  // Profile Back Navigation Logic
  const handleBackFromProfile = () => {
    // If we've selected from the Home page vs the DB page, ideally we track history.
    // For simplicity, failing back to 'all-players' is safest if they were browsing the DB.
    // We will assume they return to the DB page for continuous browsing.
    setCurrentView('all-players');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return (
          <>
            <Hero onJoin={() => handleNavigate('register')} />
            <About />
            <Programs />
            <RisingStarsFeatured
              onViewAll={() => handleNavigate('all-players')}
              onSelectPlayer={handlePlayerSelect}
            />
            <Rules />
            <Contact />
            <Footer />
          </>
        );
      case 'all-players':
        return (
          <div style={{ paddingTop: '80px' }}> {/* Offset for fixed nav */}
            <PlayerGrid onSelectPlayer={handlePlayerSelect} />
          </div>
        );
      case 'register':
        return <RegisterPage onAdminUnlock={() => handleNavigate('admin')} />;
      case 'admin':
        return <AdminDashboard onCancel={() => handleNavigate('home')} />;
      case 'player-profile':
        return <PlayerProfilePage player={selectedPlayer} onBack={handleBackFromProfile} />;
      default:
        return <Hero onJoin={() => handleNavigate('register')} />;
    }
  };

  return (
    <div className="app-container" style={{ backgroundColor: '#0B1F3A', minHeight: '100vh', color: '#fff' }}>
      {/* Hide standard navbar deeply inside specific full-page views if needed, otherwise keep it */}
      {currentView !== 'player-profile' && currentView !== 'admin' && (
        <Navbar currentView={currentView} onNavigate={handleNavigate} />
      )}

      {renderContent()}
    </div>
  );
}

export default App;
