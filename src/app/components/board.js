import React from 'react';
import Square from './square.js';

export default class Board extends React.Component {
  constructor() {
    super();
    this.rows = 16;
    this.cols = 10;
    this.charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    this.chars = this.initChar(Array(this.rows * this.cols));
    this.isSelectedArray = Array(this.rows * this.cols).fill(false);
    this.state = {
      isSelectedArray: this.isSelectedArray,
      chars: this.chars
    };
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

  handleClick(i) {
    if (['H', 'O'].includes(this.state.chars[i])) {
      this.isSelectedArray[i] = true;
      this.setState({ isSelectedArray: this.isSelectedArray });

      const indexesOfSelectedSquares = [];
      for (let i = 0; i < this.state.isSelectedArray.length; i++) {
        if (this.state.isSelectedArray[i] === true) { indexesOfSelectedSquares.push(i); }
      }

      if (indexesOfSelectedSquares.length === 3) {
        if (this.isH2O(indexesOfSelectedSquares) && this.isSquare(indexesOfSelectedSquares)) {
          const rows = indexesOfSelectedSquares.map((e) => Math.floor(e / this.cols));
          const cols = indexesOfSelectedSquares.map((e) => e % this.cols);
          const minRow = rows.reduce((a, b) => { return Math.min(a, b); });
          const maxRow = rows.reduce((a, b) => { return Math.max(a, b); });
          const minCol = cols.reduce((a, b) => { return Math.min(a, b); });
          const maxCol = cols.reduce((a, b) => { return Math.max(a, b); });

          for (let row = minRow; row <= maxRow; row++) {
            for (let col = minCol; col <= maxCol; col++) {
              this.chars[row * this.cols + col] = '💧'
            }
          }
          this.setState({ chars: this.chars });
        }
        this.isSelectedArray = Array(this.rows * this.cols).fill(false);
        this.setState({isSelectedArray: Array(this.rows * this.cols).fill(false)});
      }
    }
  }

  isH2O(indexArray) {
    const chars = indexArray.map(i => this.chars[i]).sort();
    return JSON.stringify(chars) === JSON.stringify(['H', 'H', 'O']);
  }

  isSquare(defaultArray) {
    const rowSet = new Set(defaultArray.map((e) => Math.floor(e / this.cols)));
    const colSet = new Set(defaultArray.map((e) => e % this.cols));
    return (rowSet.size < 3 && colSet.size < 3) || rowSet.size === 1 || colSet.size === 1;
  }

  renderSquare(i) {
    return (
      <Square
        key={ 'square_' + i }
        value={ this.state.chars[i] }
        isSelected={ this.state.isSelectedArray[i] }
        onClick={ () => this.handleClick(i) }
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
