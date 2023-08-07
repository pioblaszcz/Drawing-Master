import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react';
import { useAppStore } from '../../stores/hooks';
import { useOnCheck } from '../../alghoritms/hooks';

let interval;

const CompareComponent = () => {

    const loaderInsideRef = useRef();
    useOnCheck();

    const { app } = useAppStore();

    const [compareRateCopy, setCompareRateCopy] = useState(0)

    useEffect(() => {
        interval = setInterval(() => setCompareRateCopy(prev => prev + 1), 150);

        setTimeout(() => {
            loaderInsideRef.current.style.transition = (150 * app.compareRate / 1000).toFixed(0) + 's';
            loaderInsideRef.current.style.transform = `translateX(${app.compareRate}%)`;
        }, 700);


        return () => clearInterval(interval);
    }, [app.compareRate]);

    useEffect(() => {
        if (compareRateCopy === app.compareRate) {
            clearInterval(interval);
            setTimeout(() => console.log('Pokaz ekran zakonczenia'), 1800);
        }

    }, [compareRateCopy, app.compareRate]);

    return (
        <div className="compare">
            <div className="compare__rate">Compare: {compareRateCopy}%</div>
            <div className="compare__loader">
                <div className="compare__loader--inside" ref={loaderInsideRef}></div>
            </div>
        </div>
    );
};

export default observer(CompareComponent);