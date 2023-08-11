import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react';
import { useAppStore } from '../../stores/hooks';
import { useOnCheck } from '../../alghoritms/hooks';
import { useTranslation } from 'react-i18next';

let interval;

const CompareComponent = () => {

    const { t } = useTranslation();

    const loaderInsideRef = useRef();
    useOnCheck();

    const { app, setIsGameEnded } = useAppStore();

    const [compareRateCopy, setCompareRateCopy] = useState(0)

    useEffect(() => {
        interval = setInterval(() => setCompareRateCopy(prev => prev + 1), 150);

        setTimeout(() => {
            loaderInsideRef.current.style.transition = (150 * app.compareRate / 1000).toFixed(0) + 's linear';
            loaderInsideRef.current.style.transform = `translateX(${app.compareRate}%)`;
        }, 700);


        return () => clearInterval(interval);
    }, [app.compareRate]);

    useEffect(() => {
        if (compareRateCopy === app.compareRate) {
            const hideTime = app.compareRate < 5 ? 2800 : 1400;
            clearInterval(interval);
            setTimeout(() => setIsGameEnded(true), hideTime);
        }

    }, [compareRateCopy, app.compareRate, setIsGameEnded]);

    return (
        <>
            <div className={`compare ${app.isGameEnded && 'compare--hide'}`}>
                <div className="compare__rate">{t('game.compare')}: {compareRateCopy}%</div>
                <div className="compare__loader">
                    <div className="compare__loader--inside" ref={loaderInsideRef}></div>
                </div>
            </div>
        </>
    );
};

export default observer(CompareComponent);