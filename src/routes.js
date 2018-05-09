import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from './components/Main/Dashboard';
import About from './components/About';

const Routes = () => (
	<Switch>
		<Route exact path="/" component={Dashboard} />
		<Route exact path="/about" component={About} />
	</Switch>
);

export default Routes;
