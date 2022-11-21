import React from 'react';
import { BrowserRouter, Route, Switch, Link as Navlink } from 'react-router-dom';
import Product from './components/Product';
import Home from './components/Home';
import Kart from './components/Kart';
import PurchasePage from './components/PurchasePage';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      kartInfo: [],
      quantity: [],
    };
  }

  async componentDidMount() {
    const kartInfo = JSON.parse(localStorage.getItem('kartInfo'));
    const quantity = JSON.parse(localStorage.getItem('quantity'));
    if (kartInfo && quantity) {
      this.setState({
        kartInfo,
        quantity,
      });
    }
  }

  localStorageInfo = () => {
    const { kartInfo, quantity } = this.state;
    localStorage.setItem('kartInfo', JSON.stringify(kartInfo));
    localStorage.setItem('quantity', JSON.stringify(quantity));
  };

  getProductInfos = (param, quant) => {
    const { kartInfo, quantity } = this.state;
    this.setState({
      kartInfo: [...kartInfo, param],
      quantity: [...quantity, quant],
    }, () => this.localStorageInfo());
  };

  changeQuantity = (quant) => {
    const { quantity } = this.state;
    this.setState({
      quantity: quant,
    }, () => localStorage.setItem('quantity', JSON.stringify(quantity)));
  };

  removeProduct = (title, index) => {
    const { kartInfo, quantity } = this.state;
    quantity.splice(index, 1);
    const newCart = kartInfo.filter((ele) => ele.title !== title);
    this.setState({
      kartInfo: newCart,
      quantity,
    }, () => {
      localStorage.setItem('kartInfo', JSON.stringify(newCart));
      localStorage.setItem('quantity', JSON.stringify(quantity));
    });
  };

  render() {
    const { kartInfo, quantity } = this.state;
    return (
      <div>
        <BrowserRouter>
          <header>
            <Navlink to="/">
              Home
            </Navlink>
            <h2>FrontEnd Online Store</h2>
            <Navlink
              to="/kart"
              data-testid="shopping-cart-button"
            >
              Cart
              {' '}
              <span data-testid="shopping-cart-size">
                {kartInfo.length}
              </span>
            </Navlink>
          </header>
          <Switch>
            <Route
              path="/"
              render={
                () => (<Home
                  funcKart={ this.getProductInfos }
                />)
              }
              exact
            />
            <Route
              path="/kart"
              render={ () => (<Kart
                kartInfo={ kartInfo }
                quantity={ quantity }
                funcChangeQuant={ this.changeQuantity }
                remove={ this.removeProduct }
              />) }
            />
            <Route
              path="/product/:id"
              render={
                (props) => <Product { ...props } func={ this.getProductInfos } />
              }
              exact
            />
            <Route
              path="/PurchasePage"
              render={
                (props) => <PurchasePage { ...props } kartInfo={ kartInfo } />
              }
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
