import React from 'react';
import './square.css';

export default class Square extends React.Component {
  render() {
    return (
      <button
        className={ "square" + (this.props.isSelected ? ' selected' : '') }
        onClick={ this.props.onClick }
      >
        { this.props.value }
      </button>
    );
  }
}
