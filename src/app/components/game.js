import React from 'react';
import Board from './board.js';
import Help from './help.js';
import TweetButton from './tweetButton.js';
import './game.css';

export default class Game extends React.Component {
  constructor() {
    super();
    this.timeLimitMs = 1 * 60 * 1000; // 制限時間は一旦1分にしておく
    this.interval = null;
    this.timerIntervalMs = 10;
    this.state = {
      remainingTimeMs: this.timeLimitMs,
      msDiff: this.msToMinuteSecond(this.timeLimitMs),
      gameStart: false,
      score: 0,
      level: 1 // Board の this.charset を level + 2 文字目まで使う
    };
  }

  timer() {
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      if (this.state.gameStart) { this.tick(); }
    }, this.timerIntervalMs);
  }

  tick() {
    this.timeLimitMs -= this.timerIntervalMs;
    if (this.timeLimitMs > 0) {
      this.setState({
        remainingTimeMs: this.timeLimitMs,
        msDiff: this.msToMinuteSecond(this.timeLimitMs)
      });
    } else {
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
    if (this.state.remainingTimeMs === 0) {
      window.location.reload();
    } else {
      this.setState({ gameStart: !this.state.gameStart });
    }
  }

  setLevel = (level) => {
    this.setState({ level: level });
  }

  setScore = (score) => {
    this.setState({ score: score });
  }

  render() {
    this.timer();

    const buttonText =
      this.state.remainingTimeMs === 0
        ? 'Reset'
        : this.state.gameStart ? 'Stop' : 'Start'

    return (
      <div>
        <div className='white'>Score: { this.state.score }</div>
        <div className='white'>Level: { this.state.level }</div>
        <Help />
        <Board
          remainingTimeMs={ this.state.remainingTimeMs }
          isGameStart={ this.state.gameStart }
          isGameEnd={ this.state.remainingTimeMs === 0 }
          level={ this.state.level }
          setLevel={ this.setLevel }
          score={ this.state.score }
          setScore={ this.setScore }
        />
        <button
          onClick={ () => this.timerSwitch() }
        >{ buttonText }</button>
        <div className='monospaced'>{ this.state.msDiff }</div>
        <TweetButton
          score={ this.state.score }
        />

      </div>
    )
  }
}
