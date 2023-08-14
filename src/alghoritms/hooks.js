import { useRef, useEffect } from 'react';
import { useAppStore, useDrawingStore } from '../stores/hooks';


export const useOnDraw = (onDraw) => {

    const { app } = useAppStore();

    const canvasRef = useRef(null);

    const isDrawingRef = useRef(false);

    const mouseMoveListenerRef = useRef(null);
    const mouseUpListenerRef = useRef(null);

    const prevPointRef = useRef(null);

    useEffect(() => {
        const initMouseMoveListener = () => {
            computePointInCanvas();
            const mouseMoveListener = e => {
                if (isDrawingRef.current) {
                    let point;

                    if (e.touches) point = computePointInCanvas(e.touches[0].clientX, e.touches[0].clientY);
                    else point = computePointInCanvas(e.clientX, e.clientY);

                    const ctx = canvasRef.current.getContext('2d');
                    if (onDraw) onDraw(ctx, point, prevPointRef.current);
                    prevPointRef.current = point;
                }
            }
            mouseMoveListenerRef.current = mouseMoveListener;
            window.addEventListener('mousemove', mouseMoveListener);
            window.addEventListener('touchmove', mouseMoveListener);
        }

        const initMouseUpListener = () => {
            const listener = () => {
                isDrawingRef.current = false;
                prevPointRef.current = null;
            }
            mouseUpListenerRef.current = listener;
            window.addEventListener('mouseup', listener);
            window.addEventListener('touchend', listener);
        }

        const computePointInCanvas = (clientX, clientY) => {
            if (!canvasRef.current) return;
            const boundingRect = canvasRef.current.getBoundingClientRect();

            return {
                x: clientX - boundingRect.left,
                y: clientY - boundingRect.top
            }
        }
        const removeListeners = () => {
            if (mouseMoveListenerRef.current) {
                window.removeEventListener('mousemove', mouseMoveListenerRef.current);
                window.removeEventListener('touchmove', mouseMoveListenerRef.current);
            }
            if (mouseMoveListenerRef.current) {
                window.removeEventListener('mouseup', mouseUpListenerRef.current);
                window.removeEventListener('touchend', mouseMoveListenerRef.current);
            }
        }
        initMouseMoveListener();
        initMouseUpListener();

        if (app.endDrawing) {
            removeListeners();
            isDrawingRef.current = false;
        }

        return () => {
            removeListeners();
        }
    }, [onDraw, app.endDrawing]);

    const setCanvasRef = (ref) => {
        canvasRef.current = ref;
    }

    const onMouseDown = () => {
        isDrawingRef.current = true;
    }

    const drawImage = (image) => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d', { willReadFrequently: true });
        ctx.drawImage(image, 0, 0, canvasRef.current.width, canvasRef.current.height);
    }

    const removeImage = () => {
        const ctx = canvasRef.current.getContext('2d', { willReadFrequently: true });
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }

    return {
        setCanvasRef,
        onMouseDown,
        drawImage,
        removeImage
    }

}

export const useOnCheck = () => {
    const img = new Image();

    const { setCompareRate } = useAppStore();
    const { drawSettings } = useDrawingStore();

    img.src = drawSettings.draw;

    const canvas = document.querySelector('.canvas');
    const canvasToCompare = document.querySelector('.canvasCompare');

    if (!canvas || !canvasToCompare) return;

    const ctx1 = canvas.getContext('2d', { willReadFrequently: true });
    const ctx2 = canvasToCompare.getContext('2d', { willReadFrequently: true });

    ctx2.drawImage(img, 0, 0, canvas.width, canvas.height);

    const pixels1 = ctx1.getImageData(0, 0, canvas.width, canvas.height).data;
    const pixels2 = ctx2.getImageData(0, 0, canvasToCompare.width, canvasToCompare.height).data;

    let numberOfPixels = pixels2.length;
    let count = 0;

    for (let i = 0; i < pixels1.length; i++) {
        if ((pixels2[i] === 255 && pixels1[i] === 0) || (pixels2[i] === 255 && pixels1[i] === 255)) numberOfPixels--;
        else if (pixels2[i] === pixels1[i] && pixels2[i] !== 0) {
            count++;
        }
    }
    let number = Number(((count / numberOfPixels) * 100).toFixed(0));
    if (number > 100) number = 100;
    setCompareRate(number);
}