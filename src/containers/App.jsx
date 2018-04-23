import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Routes from '../routes';
import PrimaryHeader from '../components/PrimaryHeader';
import Footer from '../components/Footer';

const App = () => (
	<BrowserRouter>
		<div className="parent-container">
			<PrimaryHeader />
			<hr />
			<Routes />
			<Footer />
		</div>
	</BrowserRouter>
);

export default App;

// use render for passing in-scope variable as props otherwise component={} is fine
