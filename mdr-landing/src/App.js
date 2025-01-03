import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import LoadingSpinner from './components/ui/LoadingSpinner';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Suspense fallback={<LoadingSpinner />}>
            <Footer />
          </Suspense>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
