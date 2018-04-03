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
		this.props.onSettingOpen('Stop');
	};
	closeModal = () => {
		this.setState({
			isModalOpen: false
		});
	};

	onCategorySubmit = data => {
		this.props.onSettingSubmit(data);
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
					optionClick={this.props.onOptionClick}
					onCategorySubmit={this.onCategorySubmit}
				/>
			</div>
		);
	}
}

Setting.propTypes = {
	onOptionClick: PropTypes.func,
	onBreakOptionClick: PropTypes.func
};

const modalStyle = {
	color: '#000',
	width: '35%',
	height: '50%',
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate( -50%, -50%)',
	zIndex: '9999',
	background: '#fff',
	borderRadius: '10px'
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
	state = {
		timerOpen: true
	};

	close = event => {
		event.preventDefault();
		if (this.props.onCloseClick) {
			this.props.onCloseClick();
		}
	};

	switchSetting = val => {
		const update = val === 'timer';
		this.setState({
			timerOpen: update
		});
	};

	render() {
		let content;
		if (!this.props.isOpen) {
			return null;
		}
		if (this.state.timerOpen) {
			content = (
				<TimerSetting
					optionClick={this.props.optionClick}
					closeModal={this.close}
				/>
			);
		} else {
			content = <CategorySetting onSave={this.props.onCategorySubmit} />;
		}

		return (
			<div>
				<div style={modalStyle}>
					<ul className="list-setting">
						<li onClick={this.switchSetting.bind(this, 'timer')}>Timer</li>
						<li onClick={this.switchSetting.bind(this, 'category')}>
							Category
						</li>
					</ul>
					{content}
				</div>
				<div style={backStyle} onClick={this.close} />
			</div>
		);
	}
}

Modal.propTypes = {
	isOpen: PropTypes.bool,
	onCloseClick: PropTypes.func
};

// TimerSetting Modal

const TimerSetting = props => (
	<div className="setting">
		<h1>Timer Setting</h1>
		<hr />
		<p>Choose your timer options</p>
		<TimerOptions optionClick={props.optionClick} />
		<BreakTimeOptions optionClick={props.optionClick} />
		<button className="button-close" onClick={props.closeModal}>
			Close
		</button>
	</div>
);

const TimerOptions = ({ optionClick }) => {
	const options = [25, 45, 60];
	const selectOption = event => {
		optionClick(event.target.value);
	};

	const TimerOptionButtons = options.map((option, i) => (
		<button
			key={i}
			className="button-modal button-timer"
			onClick={selectOption}
			value={option}>
			{option} min
		</button>
	));

	return <div>{TimerOptionButtons}</div>;
};

TimerOptions.propTypes = {
	optionClick: PropTypes.func
};

const BreakTimeOptions = ({ optionClick }) => {
	const options = [10, 15, 20];
	const selectOption = event => {
		optionClick(event.target.value);
	};
	const breakTimeOptionButtons = options.map((option, i) => (
		<button
			key={i}
			className="button-modal button-breakTime"
			onClick={selectOption}
			value={option}>
			{option} min
		</button>
	));
	return <div>{breakTimeOptionButtons}</div>;
};

BreakTimeOptions.propTypes = {
	optionClick: PropTypes.func
};

// CategorySetting Modal

class CategorySetting extends Component {
	state = {
		fields: [
			{
				category: null,
				color: '#000000'
			},
			{
				category: null,
				color: '#000000'
			},
			{
				category: null,
				color: '#000000'
			},
			{
				category: null,
				color: '#000000'
			}
		]
	};

	onInputChange = event => {
		const categoryID = event.target.id;
		const fields = this.state.fields.slice();
		const field = this.state.fields[categoryID];
		field[event.target.name] = event.target.value;
		fields.splice(categoryID, 1, field);
		this.setState({ fields });
	};

	onSaveClick = () => {
		const data = this.state.fields;
		this.props.onSave(data);
	};

	render() {
		return (
			<div>
				<h1 className="setting">Category Setting</h1>
				<hr />
				<Field
					id="0"
					placeholder="category 1"
					onInputChange={this.onInputChange}
					onSubmit={this.onSubmit}
				/>
				<Field
					id="1"
					placeholder="category 2"
					onInputChange={this.onInputChange}
				/>
				<Field
					id="2"
					placeholder="category 3"
					onInputChange={this.onInputChange}
				/>
				<Field
					id="3"
					placeholder="category 4"
					onInputChange={this.onInputChange}
				/>
				<button className='button-save' onClick={this.onSaveClick}>Save</button>
			</div>
		);
	}
}

class Field extends Component {
	render() {
		return (
			<form className="category-color-form" onSubmit={e => e.preventDefault()}>
				<input
					name="color"
					className="input-color"
					id={this.props.id}
					onChange={this.props.onInputChange}
					type="color"
				/>
				<input
					name="category"
					className='input-category'
					id={this.props.id}
					placeholder={this.props.placeholder}
					onChange={this.props.onInputChange}
				/>
				<input style={{ display: 'none' }} type="submit" />
			</form>
		);
	}
}

export default Setting;
