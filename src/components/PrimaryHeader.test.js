import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import PrimaryHeader from './PrimaryHeader';

describe('PrimaryHeader', () => {
	const wrapper = shallow(<PrimaryHeader />);
	it('has links', () => {
		expect(shallowToJson(wrapper)).toMatchSnapshot();
	});
});
