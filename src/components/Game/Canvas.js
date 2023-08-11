import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { useDrawingStore } from '../../stores/hooks';
import { useAppStore } from '../../stores/hooks';
import { useOnDraw } from '../../alghoritms/hooks';
import EndGameComponent from './EndGameComponent';

import wow from '../../images/elements/wow.png';
import nail from '../../images/elements/nail.png';
import pin from '../../images/elements/pin.png';

import drawing from '../../images/drawings/draw1.png'

const Canvas = ({ isPlayerTurn, showImage }) => {

    const { app, setShowResult } = useAppStore();
    const canvasCompareRef = useRef();

    const { drawSettings } = useDrawingStore();
    const { color, fillSize } = drawSettings;
    const { t } = useTranslation();

    const [canvasWidth, setCanvasWidth] = useState();
    const [canvasHeight, setCanvasHeight] = useState();
    const [showEndGameComponent, setShowEndGameComponent] = useState(false);
    const [showCompare, setShowCompare] = useState(false);

    useEffect(() => {
        if (app.endDrawing) {
            setTimeout(() => setShowCompare(true), 5500);
            setTimeout(() => setShowResult(true), 6500);
        }
    }, [app.endDrawing, setShowResult, app.isGameEnded]);

    useEffect(() => {
        if (app.isGameEnded) {
            setTimeout(() => {
                setShowEndGameComponent(true);
            }, 1000);
        }
    }, [app.isGameEnded]);

    useEffect(() => setCanvasProperties(), []);

    const onDraw = (ctx, point, prevPoint) => {
        if (!color || !isPlayerTurn) return;

        drawLine(prevPoint, point, ctx);
    }

    const drawLine = (
        start,
        end,
        ctx
    ) => {
        start = start ?? end;

        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = fillSize;
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(start.x, start.y, (fillSize / 2), 0, 2 * Math.PI);
        ctx.fill();
    }

    const setCanvasProperties = () => {
        const canvas = document.querySelector('canvas');
        if (!canvas.clientWidth) return;
        setCanvasWidth(canvas.clientWidth);
        setCanvasHeight(canvas.clientHeight);
    }

    const { onMouseDown, setCanvasRef } = useOnDraw(onDraw);

    const showImageStyle = showImage ? {
        backgroundImage: `url(${drawing})`
    } : {};

    return (
        <>
            {showEndGameComponent ? <EndGameComponent /> :
                <div className={`canvas-container ${app.isGameEnded && 'canvas-container--hide'}`}>
                    <img src={wow} alt="" className="container__wow" />
                    <img src={nail} alt="" className="container__nail" />
                    <img src={pin} alt="" className="container__pin" />
                    {showCompare && (
                        <>
                            <img src={drawing} className="canvasCompare canvasCompare--image" alt="drawn element" />
                            <canvas
                                ref={canvasCompareRef}
                                width={canvasWidth}
                                height={canvasHeight}
                                className="canvasCompare canvasCompare--main">
                            </canvas>
                        </>
                    )}
                    <canvas className='canvas' style={showImageStyle}
                        width={canvasWidth}
                        height={canvasHeight}
                        ref={setCanvasRef}
                        onMouseDown={onMouseDown}
                    ></canvas>
                    {!showImage && !isPlayerTurn && <p className="canvas__text">{t('game.remember')}</p>}
                </div>
            }
        </>
    );
};

export default observer(Canvas);