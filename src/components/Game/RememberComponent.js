import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import ProgressProvider from "../../providers/ProgressProvider";
import { useAppStore } from '../../stores/hooks';

import wow from '../../images/woow.png';
import nail from '../../images/nail.png';
import pin from '../../images/pin.png';

const TIME_TO_REMEMBER = 5;
let interval;

const RememberComponent = () => {

    const { changeHideRemembered, isPlayerTurn, app } = useAppStore();
    const { t } = useTranslation();
    const [showImage, setShowImage] = useState(false);
    const [counter, setCounter] = useState(TIME_TO_REMEMBER);

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
            setTimeout(() => isPlayerTurn(true), 1000);
        }
    }, [counter, changeHideRemembered, isPlayerTurn]);

    return (
        <div className={`remember ${app.hideRemembered && 'remember--hide'}`}>
            <div className="remember__canvas-container">
                <img src={wow} alt="" className="remember__wow" />
                <img src={nail} alt="" className="remember__nail" />
                <img src={pin} alt="" className="remember__pin" />
                <canvas className={`remember__canvas ${showImage && 'remember__canvas--showImage'}`}></canvas>
                {!showImage && <p className="canvas__text">{t('game.remember')}</p>}
            </div>
            {
                showImage &&
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
                </div>
            }
        </div >
    );
};

export default observer(RememberComponent);