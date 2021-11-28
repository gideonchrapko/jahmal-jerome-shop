import React, { Component, useEffect, Suspense } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Gallery from './Components/Gallery';
import Home from './Components/Home';
import Contact from './Components/Contact';


import Products from './ComponentsShopify/Products';
import Cart from './ComponentsShopify/Cart';
import ProductView from './ComponentsShopify/ProductView';


import pageNotFound from './404';
import Navbar from './Components/Navbar';

import Branding from './Assets/branding.png'
import { MdRemoveShoppingCart } from "react-icons/md"

import { useShopify } from "./hooks"

import './App.css';

export default (props) => {

	const {
		createShop,
		createCheckout,
		fetchProducts,
		// fetchedCheckout,
		// fetchCollection,
	} = useShopify()

	useEffect(() => {
		createShop()
		fetchProducts()
		createCheckout()
	},[])
	
    return (
    <div className="App">
		<div>
        <img 
            src={Branding} 
            alt="Click to go the Home Page"
            className="branding"
            onClick={() => window.appHistory.push("/")}
          />
		  <Cart />
      	</div>
		<Navbar />
		<Switch>
			<Route exact path="/" component={Home} />
			<Route path="/commissary" component={Products} />
			<Route path="/slot-time" component={Gallery} />
          	<Route path="/law-library" component={Contact} />
			  <Route path="/Product/:productId" component={ProductView} />
			<Route component={pageNotFound} />
		</Switch>
		<h1 className="footer">© Jerome Jahmal 2021 Copyright All Rights </h1>
    </div>

    );
}