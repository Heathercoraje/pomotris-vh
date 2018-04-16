import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CategorySetting extends Component {
	state = {
		categories: [
			{
				category: this.props.categories
					? this.props.categories[0].category
					: '',
				color: this.props.categories
					? this.props.categories[0].color
					: '#afe6b1'
			},
			{
				category: this.props.categories
					? this.props.categories[1].category
					: '',
				color: this.props.categories
					? this.props.categories[1].color
					: '#7dbd7f'
			},
			{
				category: this.props.categories
					? this.props.categories[2].category
					: '',
				color: this.props.categories
					? this.props.categories[2].color
					: '#328335'
			},
			{
				category: this.props.categories
					? this.props.categories[3].category
					: '',
				color: this.props.categories
					? this.props.categories[3].color
					: '#1f6236'
			}
		]
	};

	onInputChange = event => {
		const categoryID = event.target.id;
		const categories = this.state.categories.slice();
		const targetCategory = categories[categoryID];
		targetCategory[event.target.name] = event.target.value;
		categories.splice(categoryID, 1, targetCategory);
		this.setState({ categories });
	};

	onSaveClick = () => {
		console.log('hello world')
		const data = this.state.categories;
		this.props.onSave(data);
		this.props.closeModal();
	};

	onCancelClick = () => {
		this.props.closeModal();
	};
	render() {
		return (
			<div className="setting">
				<hr />
				<p className="setting-title">Category Setting</p>
				<form onSubmit={this.onSaveClick}>
					{this.state.categories.map((category, i) => (
						<CategoryColorGroup
						key={i}
						id={i}
						data={category}
						onInputChange={this.onInputChange}
						/>
					))}
				</form>
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

class CategoryColorGroup extends Component {
	render() {
		const ID = this.props.id;
		const category = this.props.data.category;
		const color = this.props.data.color;
		return (
			<div className="category-color-form">
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
			</div>
		);
	}
}

CategoryColorGroup.propTypes = {
	id: PropTypes.number,
	data: PropTypes.object,
	onInputChange: PropTypes.func
};

export default CategorySetting;
