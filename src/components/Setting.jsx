import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class Setting extends React.Component {
	state = {
		isModalOpen: false
	};
	openModal = () => {
		this.setState({
			isModalOpen: true
		});
	};
	closeModal = () => {
		this.setState({
			isModalOpen: false
		});
	};
	render() {
		return (
			<div>
				<span onClick={this.openModal}>&#8709;</span>
				<Modal isOpen={this.state.isModalOpen} onCloseClick={this.closeModal}>
					<h1>I am a modal</h1>
					<p>Hello world</p>
					<button onClick={this.closeModal}>close</button>
				</Modal>
			</div>
		);
	}
}

const modalStyle = {
  color: '#000',
	width: '35%',
	height: '40%',
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate( -50%, -50%)',
	zIndex: '9999',
	background: '#fff'
};

const backStyle = {
	position: 'absolute',
	width: '100%',
	height: '100%',
	top: '0px',
	left: '0px',
	zIndex: '9998',
	background: 'rgba(0, 0, 0, 0.6)'
};

class Modal extends React.Component {
	close = event => {
		event.preventDefault();
		if (this.props.onCloseClick) {
			this.props.onCloseClick();
		}
	};

	render() {
		if (!this.props.isOpen) {
			return null;
		}
		return (
			<div>
				<div style={modalStyle}>{this.props.children}</div>
				<div style={backStyle} onClick={this.close} />
			</div>
		);
	}
}

Modal.propTypes = {
	isOpen: PropTypes.bool,
	onCloseClick: PropTypes.func
};

export default Setting;
