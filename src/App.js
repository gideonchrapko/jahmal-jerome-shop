import React, { Component, useEffect, Suspense } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Gallery from './Components/Gallery';
import Home from './Components/Home';
import Contact from './Components/Contact';
import Products from './ShopifyComponents/Products';
import Cart from './ShopifyComponents/Cart';
import pageNotFound from './404';
import Navbar from './Components/Navbar';

import Branding from './Assets/branding.png'
import { MdRemoveShoppingCart } from "react-icons/md"

import './App.css';

class App extends Component {
	constructor() {
	  super();
  
	  this.state = {
		isCartOpen: false,
		checkout: { lineItems: [] },
		products: [],
		shop: {}
	  };
  
	  this.handleCartClose = this.handleCartClose.bind(this);
	  this.addVariantToCart = this.addVariantToCart.bind(this);
	  this.updateQuantityInCart = this.updateQuantityInCart.bind(this);
	  this.removeLineItemInCart = this.removeLineItemInCart.bind(this);
	}
  
	componentWillMount() {
	  this.props.client.checkout.create().then((res) => {
		this.setState({
		  checkout: res,
		});
	  });
  
	  this.props.client.product.fetchAll().then((res) => {
		this.setState({
		  products: res,
		});
	  });
  
	  this.props.client.shop.fetchInfo().then((res) => {
		this.setState({
		  shop: res,
		});
	  });
	}
  
	addVariantToCart(variantId, quantity){
	  this.setState({
		isCartOpen: true,
	  });
  
	  const lineItemsToAdd = [{variantId, quantity: parseInt(quantity, 10)}]
	  const checkoutId = this.state.checkout.id
  
	  return this.props.client.checkout.addLineItems(checkoutId, lineItemsToAdd).then(res => {
		this.setState({
		  checkout: res,
		});
	  });
	}
  
	updateQuantityInCart(lineItemId, quantity) {
	  const checkoutId = this.state.checkout.id
	  const lineItemsToUpdate = [{id: lineItemId, quantity: parseInt(quantity, 10)}]
  
	  return this.props.client.checkout.updateLineItems(checkoutId, lineItemsToUpdate).then(res => {
		this.setState({
		  checkout: res,
		});
	  });
	}
  
	removeLineItemInCart(lineItemId) {
	  const checkoutId = this.state.checkout.id
  
	  return this.props.client.checkout.removeLineItems(checkoutId, [lineItemId]).then(res => {
		this.setState({
		  checkout: res,
		});
	  });
	}
  
	handleCartClose() {
	  this.setState({
		isCartOpen: false,
	  });
	}

  render() {
    return (
    <div className="App">
		<div>
        <img 
            src={Branding} 
            alt="Click to go the Home Page"
            className="branding"
            onClick={() => window.appHistory.push("/home")}
          />
      	</div>
		<header className="App__header">
			{!this.state.isCartOpen &&
				<div className="App__view-cart-wrapper">
					<button className="App__view-cart" onClick={()=> this.setState({isCartOpen: true})}><MdRemoveShoppingCart /></button>
				</div>
			}
		</header>
		<Navbar />
		<Switch>
			<Route exact path="/" component={Home} />
			<Route
				path='/commissary'
				render={(props) => (
					<Products 
						{...props} 
						authed={true}
						products={this.state.products}
						client={this.props.client}
						addVariantToCart={this.addVariantToCart}
					/>
				)}
			/>
			<Route path="/slot-time" component={Gallery} />
          	<Route path="/law-library" component={Contact} />
			<Route component={pageNotFound} />
		</Switch>
        <Cart
          checkout={this.state.checkout}
          isCartOpen={this.state.isCartOpen}
          handleCartClose={this.handleCartClose}
          updateQuantityInCart={this.updateQuantityInCart}
          removeLineItemInCart={this.removeLineItemInCart}
        />
    </div>
    );
}
}

export default App;
