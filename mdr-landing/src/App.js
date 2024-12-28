import React, { Suspense } from 'react';
import './App.css';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import LoadingSpinner from './components/ui/LoadingSpinner';
import { AppProvider } from './context/AppContext';

const LandingPage = React.lazy(() => import('./pages/LandingPage'));

function App() {
  return (
    <AppProvider>
      <div className="App">
        <Navbar />
        <Suspense fallback={<LoadingSpinner />}>
          <LandingPage />
        </Suspense>
        <Footer />
      </div>
    </AppProvider>
  );
}

export default App;
