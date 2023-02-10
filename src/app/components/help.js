import React from 'react';
import './help.css';
import img1 from './img1.png';
import img2 from './img2.png';

export default class Help extends React.Component {
  render() {
    return (
      <div className='help'>
        <div className="modal-open">
          <a href="#modal">遊び方</a>
        </div>
        <div className="modal" id="modal">
          <a href="#!" className="overlay">overlay</a>
          <div className="modal-wrapper">
            <div className="modal-contents">
              <a href="#!" className="modal-close">✕</a>
              <div className="modal-content">
                <h2>H<sub>2</sub>Oブロックゲーム</h2>
                <div>H, H, Oで囲んで水を作ろう！</div>
                <img src={img1} className="img" alt="img1" />
                <img src={img2} className="img" alt="img2" />
                <div>一度に作った水の数が多いほど</div>
                <div>高得点がもらえるよ！</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
