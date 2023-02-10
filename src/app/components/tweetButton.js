import React from 'react';
import './tweetButton.css';

export default class TweetButton extends React.Component {
  render() {
    const text =
        'H2Oブロックゲームで遊びました！%0D%0A'
      + `スコアは ${this.props.score} でした！%0D%0A`
      + `%23ツクアソ%0D%0A%0D%0A`
      + 'https://verdy89.github.io/h2o_block_game/'

    return (
      <a
        className="twitter-share-button"
        href={ `https://twitter.com/intent/tweet?text=${text}` }
        target="_blank"
        rel="noopener noreferrer"
      >ツイート</a>
    );
  }
}

