import React from 'react';
import './square.css';

export default class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      isSelected: false
    };
  }

  changeChar() {
    if (['H', 'O'].includes(this.state.value)) {
      // this.setState({ value: '💧' });
      this.setState({ isSelected: true });
    }
  }

  render() {
    return (
      <button
        className={ "square" + (this.state.isSelected ? ' selected' : '') }
        onClick={ () => this.changeChar() }
      >
        { this.state.value }
      </button>
    );
  }
}
