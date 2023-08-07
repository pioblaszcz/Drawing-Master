import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import ProgressProvider from "../../providers/ProgressProvider";
import { useAppStore } from '../../stores/hooks';
import DrawComponent from './DrawComponent';
import CompareComponent from './CompareComponent';
import Canvas from './Canvas';

const TIME_TO_REMEMBER = 5;
let interval;

const PlayComponent = () => {

    const { changeHideRemembered, app } = useAppStore();
    const [showImage, setShowImage] = useState(false);
    const [counter, setCounter] = useState(TIME_TO_REMEMBER);
    const [isPlayerTurn, setIsPlayerTurn] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setShowImage(true);
        }, 2000)
    }, []);

    useEffect(() => {
        if (!showImage) return;
        interval = setInterval(
            () => setCounter(prev => prev - 1),
            1000,
        );

        return () => clearInterval(interval);
    }, [showImage]);

    useEffect(() => {
        if (counter === 0) {
            clearInterval(interval);
            changeHideRemembered(true);
            setShowImage(false);
            setTimeout(() => setIsPlayerTurn(true), 100);
        }
    }, [counter, changeHideRemembered]);

    const drawingSpace = showImage && !isPlayerTurn ?
        < div className="remember__timer">
            <div className="remember__timer-container">
                <ProgressProvider valueStart={0} valueEnd={100}>
                    {value => <CircularProgressbar
                        value={value}
                        strokeWidth={10}
                        text={counter === 0 ? '0' : counter}
                        styles={buildStyles({
                            strokeLinecap: "butt",
                            pathTransitionDuration: 5
                        })}
                    />}
                </ProgressProvider>
            </div>
        </div> : isPlayerTurn && <DrawComponent />

    return (
        <div className={`container ${app.hideRemembered && 'container--hide'}`}>
            <Canvas isPlayerTurn={isPlayerTurn} showImage={showImage} />
            {app.showResult ? <CompareComponent /> : drawingSpace}
        </div >
    );
};

export default observer(PlayComponent);