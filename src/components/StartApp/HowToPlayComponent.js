import React, { useState, memo, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { useTranslation } from 'react-i18next';

import 'react-circular-progressbar/dist/styles.css';

import ProgressProvider from "../../providers/ProgressProvider";
import MainHowComponent from './MainHowComponent';

const sliderElements = [
    {
        id: 0,
        title: 'Get ready to memorize the picture!',
        text: 'Select a mode and get ready to memorize the picture, you will only have 5 seconds to do it!'
    },

    {
        id: 1,
        title: 'Now remember the picture!',
        text: 'You will have to replicate it as accurately as possible in the next round!'
    },

    {
        id: 2,
        title: 'Paint what you remembered :)',
        text: 'You dont have much time to reproduce the drawing, hurry up!'
    },

    {
        id: 3,
        title: 'The more precise the better!',
        text: 'The application will check how close your drawing is to the original and award you points! GL'
    },
];

let timer;

const HowToPlay = () => {
    const { t } = useTranslation();

    const [pictureActive, setPictureActive] = useState(0);
    const [valueEnd, setValueEnd] = useState(100)

    const handleChangeActivePicture = (id) => {
        setPictureActive(id);
    }

    useEffect(() => {
        setValueEnd(0);
        setTimeout(() => setValueEnd(100), 60);
        timer = window.setInterval(() => {
            setPictureActive(prev => prev + 1 > 3 ? 0 : prev + 1);
        }, 5000);

        return () => window.clearInterval(timer);
    }, [pictureActive]);

    const list = sliderElements.map(element =>
        <li
            key={element.id}
            className={`list__element ${element.id === pictureActive && 'list__element--active'}`}
            onClick={() => handleChangeActivePicture(element.id)}
        ></li>
    );

    const main = sliderElements.filter(element => element.id === pictureActive)[0];

    return (
        <div className="howToPlay">
            <div className="howToPlay__bar">
                <ProgressProvider valueStart={0} valueEnd={valueEnd}>
                    {value => <CircularProgressbar
                        value={value}
                        strokeWidth={50}
                        styles={buildStyles({
                            strokeLinecap: "butt",
                            pathTransitionDuration: valueEnd === 0 ? 0 : 5,
                        })}
                    />}
                </ProgressProvider>
            </div>
            <h1 className="howToPlay__header">{t('startApp.howTtile')}</h1>
            <div className="howToPlay__main">
                <MainHowComponent {...main} />
            </div>
            <div className="howToPlay__navigation">
                <ul className="navigation__list">
                    {list}
                </ul>
            </div>
        </div>
    )
}

export default memo(HowToPlay);