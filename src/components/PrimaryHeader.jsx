import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import orange from '../../img/orange.png';

class PrimaryHeader extends Component {
	render() {
		return (
			<header className="primary-header">
				<div>
					<span className="logo">
						<Link to="/">
							Pomotris<img className="logo-icon" src={orange} />
						</Link>
					</span>
				</div>
				<ul>
					<li>
						<Link to="/howto">How to</Link>
					</li>
					<li>
						<Link to="/feedback">Feedback</Link>
					</li>
				</ul>
			</header>
		);
	}
}

export default PrimaryHeader;
