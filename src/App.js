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
import {Route} from 'react-router-dom';

function App() {
  return (
    <div className ="App">
      <Header />

      <Route exact path='/'>
        <Visual />
        <Intro />
        <Info />
      </Route>

      <Route path='/department' component={Department}></Route>
      <Route path='/community' component={Community}></Route>
      <Route path='/gallery' component={Gallery}></Route>
      <Route path='/youtube' component={Youtube}></Route>
      <Route path='/location' component={Location}></Route>
      <Route path='/join' component={Join}></Route>

      <Footer />
    </div>
  );
}

export default App;
