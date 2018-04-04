import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';

class Setting extends React.Component {
	state = {
		isModalOpen: false
	};

	openModal = () => {
		this.setState({
			isModalOpen: true
		});
		this.props.onSettingOpen('Stop');
	};

	closeModal = () => {
		this.setState({
			isModalOpen: false
		});
	};

	render() {
		return (
			<div className="wrapper-setting">
				<span className="setting-icon" onClick={this.openModal}>
					<i className="fas fa-cog" />
				</span>
				<Modal
					isOpen={this.state.isModalOpen}
					onCloseClick={this.closeModal}
					{...this.props}
				/>
			</div>
		);
	}
}

Setting.propTypes = {
	onOptionClick: PropTypes.func,
	onBreakOptionClick: PropTypes.func
};

export default Setting;
