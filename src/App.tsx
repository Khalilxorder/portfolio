import React from 'react';
import Home from './pages/Home';
import Map from './pages/Map';

export default function App() {
  const path = typeof window !== 'undefined' ? window.location.pathname : '/';
  if (path === '/map' || path.startsWith('/map/')) {
    return <Map />;
  }
  return <Home />;
}
