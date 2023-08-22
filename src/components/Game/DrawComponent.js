import React, { useState, useEffect, useRef, useCallback } from 'react';
import { observer } from 'mobx-react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDrawingStore } from '../../stores/hooks';
import { useAppStore } from '../../stores/hooks';
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from 'react-i18next';

import eraser from '../../images/elements/eraser.png';

let interval;
const DRAWING_TIME = 70;

const DrawComponent = () => {

    const { t } = useTranslation();

    const { changeColor, changeFillSize } = useDrawingStore();
    const { setIsDrawingEnded, app } = useAppStore();

    const panelRef = useRef(null);

    const [cursorWeight, setCursorWeight] = useState(10);
    const [showEndInfoElement, setShowEndInfoElement] = useState(false);
    const [timeLeft, setTimeLeft] = useState(DRAWING_TIME);

    const handleEndDrawing = useCallback(() => {
        clearInterval(interval);
        setIsDrawingEnded(true);
        setTimeout(() => {
            panelRef.current.style.display = 'none';
            setShowEndInfoElement(true);
        }, 1200);
    }, [setIsDrawingEnded])

    useEffect(() => {
        interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000)

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (timeLeft === 0) {
            handleEndDrawing();
        }
    }, [timeLeft, handleEndDrawing]);

    const handleSetCursorWeight = (e) => {
        setCursorWeight(e.target.value);
        changeFillSize(e.target.value);
    };

    const timeLeftJsx = timeLeft > 60
        ? `0${Math.floor(timeLeft / 60)}:${timeLeft - 60 * Math.floor(timeLeft / 60) < 10 ?
            '0' + (timeLeft - 60 * Math.floor(timeLeft / 60))
            : timeLeft - 60 * Math.floor(timeLeft / 60)}`
        : `00:${timeLeft < 10 ? '0' + timeLeft : timeLeft}`;

    const handleChangeColor = (color, id) => {
        changeColor(color);
        document.querySelectorAll('.panel__color').forEach(element => element.classList.remove('panel__color--user-select'));
        if (id === 'eraser') return;
        document.querySelector(`.${id}`).parentElement.classList.add('panel__color--user-select');

    };

    const infoJsx = <div className="endInfo__container">
        <p className="endInfo__text">{t('game.drawingEnded1')}</p>
        <p className="endInfo__text-smaller">{t('game.drawingEnded2')}</p>
    </div>;

    return (
        <>
            {showEndInfoElement && infoJsx}
            <div className={`panel__container ${app.endDrawing && `panel__container--hide`}`} ref={panelRef}>
                <div className="panel__colors">
                    <button className="panel__color panel__color--user-select" onClick={() => handleChangeColor('#525252', 'gray')}>
                        <div className="color__fill gray"></div>
                    </button>
                    <button className="panel__color" onClick={() => handleChangeColor('#5691fd', 'blue')}>
                        <div className="color__fill blue"></div>
                    </button>
                    <button className="panel__color" onClick={() => handleChangeColor('#e40101', 'red')}>
                        <div className="color__fill red"></div>
                    </button>
                    <button className="panel__color" onClick={() => handleChangeColor('#fad246', 'yellow')}>
                        <div className="color__fill yellow"></div>
                    </button>
                    <button className="panel__color" onClick={() => handleChangeColor('#00af36', 'green')}>
                        <div className="color__fill green"></div>
                    </button>
                </div>
                <div className="panel__end-container">
                    <button className="panel__end" onClick={handleEndDrawing}>
                        <FontAwesomeIcon icon={faCircleCheck} className="panel__check-icon" />
                        <p>{t('game.done')}</p>
                    </button>
                </div>
                <div className="panel__weight">
                    <input type="range" min="1" max="40" value={cursorWeight} className="panel__weightInput" onChange={handleSetCursorWeight} />
                    <span className="panel__weightValue">{cursorWeight}</span>
                </div>
                <div className="panel__timer">
                    <div className="timer">{timeLeftJsx}</div>
                    <img src={eraser} alt="eraser" className="panel__eraser" onClick={() => handleChangeColor('#fff', 'eraser')} />
                </div>
            </div>
        </>
    );
};

export default observer(DrawComponent);