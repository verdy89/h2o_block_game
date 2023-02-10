import React from 'react';
import Square from './square.js';

export default class Board extends React.Component {
  constructor() {
    super();
    this.rows = 16;
    this.cols = 10;
    this.charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    this.chars = this.initChar(Array(this.rows * this.cols));
  }

  randomAlphabet() {
    return this.charset[Math.floor(Math.random() * this.charset.length)];
  }

  initChar(array) {
    for (let i = 0; i < array.length; i++) {
      array[i] = this.randomAlphabet();
    }
    return array;
  }

  renderSquare(i) {
    return (
      <Square
        key={ 'square_' + i }
        value={ this.chars[i] }
      />
    )
  }

  render() {
    const rows = [];
    for (let rowNum = 0; rowNum < this.rows; rowNum++) {
      const row = [];
      for (let colNum = 0; colNum < this.cols; colNum++) {
        row.push(this.renderSquare(rowNum * this.cols + colNum));
      }
      rows.push(<div key={ 'row_' + rowNum } className="board-row">{ row }</div>)
    }

    return <div>{ rows }</div>;
  }
}
