import { useState } from 'react';

import Content from './components/content';
import Footer from './components/footer';
import Header from './components/header';
import './App.css';

function App() {
  const [isScreenDimmed, setIsScreenDimmed] = useState(false);

  return (
    <>
      <div
        style={!isScreenDimmed ? { display: 'none' } : {}}
        className="dim-background"
      />
      <Header />
      <Content screenDimmedHandler={setIsScreenDimmed} />
      <Footer />
    </>
  );
}

export default App;
