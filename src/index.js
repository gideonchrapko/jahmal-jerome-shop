import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import Client from 'shopify-buy';

const client = Client.buildClient({
	storefrontAccessToken: 'dd4d4dc146542ba7763305d71d1b3d38',
	domain: 'graphql.myshopify.com'
  });

const rootElement = document.getElementById("root");
const customHistory = createBrowserHistory({
	// basename: config.urlBasename || ''
  })

ReactDOM.render(
	<Router history={customHistory}>
		<Route component={({history}) => {
			window.appHistory = history
			return (
			<App client={client}/>
			)
		}}/>
	</Router>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
