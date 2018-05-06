import React from 'react';
import veredProfile from '../../img/vered.jpeg';
import heatherProfile from '../../img/heather.jpg';

const About = () => (
	<div className="children-container">
		<h1>Hi, there!</h1>
		<div className="profile-container">
			<img className="profile" src={heatherProfile} alt="heather-profile" />
			heathercoraje
		</div>
		<div className="profile-container">
			<img className="profile" src={veredProfile} alt="vered-profile" />
			vered
		</div>
	</div>
);

export default About;
