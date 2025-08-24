import { useState } from 'react';

import Header from './components/Header.jsx';
import MainContent from './components/MainContent.jsx';
import Footer from './components/Footer.jsx';
import UserProfile from './components/UserProfile.jsx';
import WelcomeMessage from './components/WelcomeMessage.jsx';
import Counter from './components/Counter.jsx';  // <-- Added this import

import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';

import './App.css';

function App() {
  return (
    <>
      <Header />
      
      <UserProfile
        name="John Doe"
        age={30}
        bio="An avid traveler who loves exploring new cultures and cuisines."
      />
      <UserProfile
        name="Jane Smith"
        age={28}
        bio="Passionate about photography and visiting historical cities."
      />
      
      <MainContent />

      <Counter />  {/* <-- Added this component */}

      <Footer />

      <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>Vite + React</h1>
      <WelcomeMessage />

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
