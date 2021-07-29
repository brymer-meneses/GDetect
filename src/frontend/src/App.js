import Content from './components/content';
import Footer from './components/footer';
import Header from './components/header';
import './App.css';

import { useRecoilValue } from 'recoil';
import { isScreenDimmedState } from './states/isScreenDimmed';

function App() {
  const isScreenDimmed = useRecoilValue(isScreenDimmedState);

  return (
    <>
      <div
        style={!isScreenDimmed ? { display: 'none' } : {}}
        className="dim-background"
      />
      <Header />
      <Content />
      <Footer />
    </>
  );
}

export default App;
