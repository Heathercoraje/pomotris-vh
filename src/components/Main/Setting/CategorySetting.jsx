import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
					data={this.state.fields[0]}
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
					type="color"
					className="input-color"
					value={this.props.data ? this.props.data.color: ' '}
					id={this.props.id}
					onChange={this.props.onInputChange}
				/>
				<input
					name="category"
					className='input-category'
					value={this.props.data ? this.props.data.category: ' '}
					id={this.props.id}
					placeholder={this.props.placeholder}
					onChange={this.props.onInputChange}
				/>
				<input style={{ display: 'none' }} type="submit" />
			</form>
		);
	}
}

export default CategorySetting;
