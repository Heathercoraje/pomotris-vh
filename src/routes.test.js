import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router';
import Routes from './routes';
import Dashboard from './components/Main/Dashboard';
import About from './components/About';
import Howto from './components/Howto';

const renderRoutes = path =>
	mount(
		<MemoryRouter initialEntries={[path]}>
			<Routes />
		</MemoryRouter>
	);
// testing 3 routes
describe('#Routes', () => {
	it('renders dashboard on base route', () => {
		const component = renderRoutes('/');
		expect(component.find(Dashboard)).toHaveLength(1);
	});
	it('renders Howto component', () => {
		const component = renderRoutes('/howto');
		expect(component.find(Howto)).toHaveLength(1);
	});
	it('renders Feedback component', () => {
		const component = renderRoutes('/about');
		expect(component.find(About)).toHaveLength(1);
	});
});
