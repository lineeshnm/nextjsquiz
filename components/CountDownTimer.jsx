import React from 'react'
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <div className="timer">Too lale...</div>;
    }
  
    return (
      <div className="timer">
        <div className="text">Remaining</div>
        <div className="value">{remainingTime}</div>
        <div className="text">seconds</div>
      </div>
    );
  };

const CountDownTimer = ({duration, selectedAnswer, isPlaying, setCurrentPoint}) => {
    return (
    <div className="timer-wrapper">
      <CountdownCircleTimer
        isPlaying={isPlaying}
        duration={duration}
        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
        colorsTime={[duration/2, duration/3, duration/4, 0]}
        onComplete={() => {
          selectedAnswer(null)
          // return { shouldRepeat: true, delay: 1.5 }
        }}
        onUpdate={(remainingTime) => setCurrentPoint(remainingTime)}
        >
        {renderTime}
      </CountdownCircleTimer>
    </div>
    );
}

export default CountDownTimer