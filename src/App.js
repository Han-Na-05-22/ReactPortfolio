import Header from './components/common/Header';
import Footer from './components/common/Footer';

import Visual from './components/main/Visual';
import Info from './components/main/Info';
import Intro from './components/main/Intro';

import Department from './components/sub/Department';
import Community from './components/sub/Community';
import Gallery from './components/sub/Gallery';
import Youtube from './components/sub/Youtube';
import Location from './components/sub/Location';
import Join from './components/sub/Join';

import './scss/style.scss';

function App() {
  return (
    <div className ="App">
      <Header />
      <Visual />
      <Intro />
      <Info />

      <Department />
      <Community />
      <Gallery />
      <Youtube />
      <Location />
      <Join />
      <Footer />
    </div>
  );
}

export default App;
