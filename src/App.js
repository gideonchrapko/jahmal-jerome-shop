import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Shop from './Components/Shop'
import Gallery from './Components/Gallery'
import Home from './Components/Home'

import './App.css';

function App() {
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
