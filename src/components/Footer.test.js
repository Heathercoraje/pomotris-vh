import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Footer from './Footer';

describe('Footer', () => {
	const wrapper = shallow(<Footer />);
	it('renders correctly', () => {
		expect(shallowToJson(wrapper)).toMatchSnapshot();
	});
	it('has footer element', () => {
		expect(wrapper.find('footer')).toHaveLength(1);
	});
});
