import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Shop from './Components/Shop';
import Gallery from './Components/Gallery';
import Home from './Components/Home';
import Contact from './Components/Contact';

import pageNotFound from './404';

import './App.css';

function App() {
  return (
    <div className="App">
		<Switch>
			<Route exact path="/" component={Home} />
			<Route path="/commissary" component={Shop} />
			<Route path="/slot-time" component={Gallery} />
          	<Route path="/law-library" component={Contact} />
			<Route component={pageNotFound} />
		</Switch>
    </div>
  );
}

export default App;
