import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TimerSetting from './TimerSetting';
import CategorySetting from './CategorySetting';

// Modal is a stateful component with entire setting data
class Modal extends React.Component {
  state = {
    timerOpen: true,
    selected: 'timer',
    selectedOption: {
      duration: this.props.timeData.duration,
      breakTime: this.props.timeData.breakTime,
      categories: this.props.categories
    }
  };

  // control display
  closeModal = () => {
    if (this.props.onCloseClick) {
      this.props.onCloseClick();
    }
  };

  switchSetting = val => {
    const update = val === 'timer';
    this.setState({
      timerOpen: update,
      selected: val
    });
  };

  isActive = val => {
    const selected = this.state.selected;
    const className = val === selected ? 'active-modal' : '';
    return className;
  };

  // control options
  // this send new timer setting to Timer component
  onTimerSubmit = (duration, breakTime) => {
    const newOption = this.state.selectedOption;
    newOption.duration = duration;
    newOption.breakTime = breakTime;
    this.setState({
      selectedOption: newOption
    });
    this.props.onOptionClick({ duration, breakTime });
  };

  onCategorySubmit = array => {
    const newOption = this.state.selectedOption;
    newOption.categories = array;
    this.setState({
      selectedOption: newOption
    });
    this.submitCategorySetting();
  };

  // send categories/color setting up to Dashboard, attached to onCategorySubmit
  submitCategorySetting = () => {
    const data = this.state.selectedOption.categories;
    this.props.onCategorySubmit(data);
  };

  render() {
    if (!this.props.isOpen) return null;
    const categories = this.props.categories.length
      ? this.props.categories
      : null;
    const content = this.state.timerOpen ? (
      <TimerSetting
        onSave={this.onTimerSubmit}
        closeModal={this.closeModal}
        {...this.state.selectedOption}
      />
    ) : (
      <CategorySetting
        onSave={this.onCategorySubmit}
        closeModal={this.closeModal}
        categories={categories}
      />
    );
    return (
      <div>
        <div className="modal-style">
          <ul className="list-setting">
            <li
              className={this.isActive('timer')}
              onClick={this.switchSetting.bind(this, 'timer')}
            >
              Timer
            </li>
            <li
              className={this.isActive('category')}
              onClick={this.switchSetting.bind(this, 'category')}
            >
              Category
            </li>
          </ul>
          {content}
        </div>
        <div className="back-style" onClick={this.closeModal} />
      </div>
    );
  }
}

Modal.propTypes = {
  isOpen: PropTypes.bool,
  onCloseClick: PropTypes.func,
  onOptionClick: PropTypes.func,
  onCategorySubmit: PropTypes.func
};

export default Modal;
