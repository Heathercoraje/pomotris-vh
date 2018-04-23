import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import App from './App';
import PrimaryHeader from '../components/PrimaryHeader';
import Footer from '../components/Footer';
import Routes from '../routes';

describe('App', () => {
	const wrapper = shallow(<App />);
	it('should have `PrimaryHeader`', () => {
		expect(wrapper.contains(<PrimaryHeader />)).toBe(true);
	});
	it('should have `Footer', () => {
		expect(wrapper.contains(<Footer />)).toBe(true);
	});
	it('should have `Routes`', () => {
		expect(wrapper.contains(<Routes />)).toBe(true);
	});
});
