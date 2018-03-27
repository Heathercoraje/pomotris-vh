import React, { Component } from 'react';
import styled from 'styled-components';
import Timer from './Timer';

const Wrapper = styled.div`
	width: 40vw;
	margin: 0 auto;
	text-align: center;
`;

class Dashboard extends React.Component {
	state = {
		record: []
	};
	render() {
		return (
			<Wrapper>
				<h1>Pomotris</h1>
				<Timer />
			</Wrapper>
		);
	}
}

export default Dashboard;
