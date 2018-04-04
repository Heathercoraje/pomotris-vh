import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CategorySetting extends Component {
	state = {
		fields: [
			{
				category: this.props.categories
					? this.props.categories[0].category
					: '',
				color: this.props.categories
					? this.props.categories[0].color
					: '#000000'
			},
			{
				category: this.props.categories
					? this.props.categories[1].category
					: '',
				color: this.props.categories
					? this.props.categories[1].color
					: '#000000'
			},
			{
				category: this.props.categories
					? this.props.categories[2].category
					: '',
				color: this.props.categories
					? this.props.categories[2].color
					: '#000000'
			},
			{
				category: this.props.categories
					? this.props.categories[3].category
					: '',
				color: this.props.categories
					? this.props.categories[3].color
					: '#000000'
			}
		]
	};

	onInputChange = event => {
		const categoryID = event.target.id;
		const fields = this.state.fields.slice();
		const field = fields[categoryID];
		field[event.target.name] = event.target.value;
		fields.splice(categoryID, 1, field);
		this.setState({ fields });
	};

	onSaveClick = () => {
		const data = this.state.fields;
		this.props.onSave(data);
		this.props.closeModal();
	};

	onCancelClick = () => {
		this.props.closeModal();
	};
	render() {
		const categoryFields = this.state.fields.map((field, i) => (
			<Field key={i} id={i} data={field} onInputChange={this.onInputChange} />
		));
		return (
			<div className="setting">
				<hr />
				<h1>Category Setting</h1>
				{categoryFields}
				<button className="button-modal-save" onClick={this.onSaveClick}>
					Save
				</button>
				<button className="button-modal-cancel" onClick={this.onCancelClick}>
					Cancel
				</button>
			</div>
		);
	}
}

CategorySetting.propTypes = {
	categories: PropTypes.any,
	closeModal: PropTypes.func,
	onSave: PropTypes.func
};

class Field extends Component {
	render() {
		const ID = this.props.id;
		const category = this.props.data.category;
		const color = this.props.data.color;
		return (
			<form className="category-color-form" onSubmit={e => e.preventDefault()}>
				<input
					id={ID}
					name="color"
					type="color"
					value={color}
					className="input-color"
					onChange={this.props.onInputChange}
				/>
				<input
					id={ID}
					name="category"
					value={category}
					className="input-category"
					placeholder="new category"
					onChange={this.props.onInputChange}
					autoComplete="off"
				/>
			</form>
		);
	}
}

Field.propTypes = {
	id: PropTypes.number,
	data: PropTypes.object,
	onInputChange: PropTypes.func
}

export default CategorySetting;
