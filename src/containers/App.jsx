import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import PrimaryHeader from '../components/PrimaryHeader';
import Footer from '../components/Footer';

const App = () => (
	<BrowserRouter>
		<div className="parent-container">
			<PrimaryHeader />
			<hr />
			<Switch>
				<Route exact path="/" component={Dashboard} />
				<Route exact path="/login" component={loginLayout} />
				<Route exact path="/mypage" component={mypageLayout} />
			</Switch>
			<Footer />
		</div>
	</BrowserRouter>
);
// mock components
const loginLayout = () => <div>This is login page</div>;
const mypageLayout = () => <div>This is mypage</div>;

export default App;

// use render for passing in-scope variable as props otherwise component={} is fine
