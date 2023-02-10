import React from 'react';
import Board from './board.js';
import './game.css';

export default class Game extends React.Component {
  constructor() {
    super();
    this.timeLimitMs = 1 * 60 * 1000; // 制限時間は一旦1分にしておく
    this.startAt = new Date();
    this.state = {
      remainingTimeMs: this.timeLimitMs,
      msDiff: this.msToMinuteSecond(this.timeLimitMs),
      gameStart: false
    };
  }

  timer() {
    setInterval(() => {
      if (this.state.gameStart) { this.tick(); }
    }, 137);
    // 割り切れないかつ大きめの数字にすることで、マシンパワーに優しく、かつタイマーが進んでいる感じを出す
  }

  tick() {
    const now = new Date();
    const diff = this.timeLimitMs - (now - this.startAt);
    if (diff > 0) {
      this.setState({
        remainingTimeMs: diff,
        msDiff: this.msToMinuteSecond(diff)
      });
    } else {
      // this.tick() を 137ms ごとに実行している関係で、最後 0 よりちょっと溢れて止まってしまうのを防ぐ
      this.setState({
        remainingTimeMs: 0,
        msDiff: this.msToMinuteSecond(0),
        gameStart: false
      });
    }
  }

  msToMinuteSecond(ms) {
    const minute = Math.floor(ms / 1000 / 60);
    const minuteStr = ( '00' + minute ).slice(-2);
    const second = Math.floor(ms / 1000) - minute * 60;
    const secondStr = ( '00' + second ).slice(-2);
    const afterDecimalPoint = ms - minute * 60 * 1000 - second * 1000;
    const afterDecimalPointStr = ( '000' + afterDecimalPoint ).slice(-3);
    return `${minuteStr}:${secondStr}.${afterDecimalPointStr}`
  }

  timerSwitch() {
    this.setState({ gameStart: !this.state.gameStart });
  }

  render() {
    this.timer();

    return (
      <div>
        <Board
          remainingTimeMs={ this.state.remainingTimeMs }
        />
        <button
          onClick={ () => this.timerSwitch() }
        >{ this.state.gameStart ? 'Stop' : 'Start' }</button>
        <div className='monospaced'>{ this.state.msDiff }</div>
      </div>
    )
  }
}
