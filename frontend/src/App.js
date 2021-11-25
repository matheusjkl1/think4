import { Route, Switch, Redirect } from 'react-router-dom';
import Products from './pages/Products';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import Orders from './pages/Orders';
import Notfound from './pages/Notfound';
import './css/App.css';

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/customer/products" />
      </Route>
      <Route path="/login" component={ Login } />
      <Route path="/register" component={ Register } />
      <Route exact path="/seller/orders" component={ Orders } />
      <Route exact path="/customer/products" component={ Products } />
      <Route exact path="/customer/checkout" component={ Checkout } />
      <Route exact path="/customer/orders" component={ Orders } />
      <Route component={ Notfound } />
    </Switch>
  );
}

export default App;
