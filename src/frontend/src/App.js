import Content from './components/content';
import Footer from './components/footer';
import Header from './components/header';
import './App.css';
import { useSelector } from 'react-redux';

function App() {
  const isScreenDimmed = useSelector((state) => state.isScreenDimmed);

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
