import React, { Component } from 'react';
import green from '../../img/green.png';
import powderblue from '../../img/powderblue.png';

const Footer = () => (
	<footer>
		<img className="footer-img-left" src={powderblue} />
		<p className="footer-text">
			{' '}
			Pomotris version 1.0. 2018{' '}
			<a target="_blank" href="www.github/pomotris-vh">
				<i className="fab fa-github" />
			</a>
		</p>
		<img className="footer-img-right" src={green} />
	</footer>
);

export default Footer;
