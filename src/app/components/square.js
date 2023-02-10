import React from 'react';
import './square.css';

export default class Square extends React.Component {
  render() {
    return (
      <button
        className={
          'square' + (
            this.props.isGameStart && !this.props.isGameEnd && this.props.isSelected
              ? ' selected'
              : ''
          )
        }
        onClick={ this.props.onClick }
      >
        { this.props.isGameStart || this.props.isGameEnd ? this.props.value : '' }
      </button>
    );
  }
}
