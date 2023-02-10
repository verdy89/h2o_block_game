import React from 'react';
import './square.css';

export default class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
  }

  changeChar() {
    if (['H', 'O'].includes(this.state.value)) {
      this.setState({ value: '💧' });
    }
  }

  render() {
    return (
      <button
        className={ "square" }
        onClick={ () => this.changeChar() }
      >
        { this.state.value }
      </button>
    );
  }
}
