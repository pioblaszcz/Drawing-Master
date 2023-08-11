import { makeAutoObservable } from 'mobx';

import draw1 from '../images/drawings/draw1.png';
import draw2 from '../images/drawings/draw2.jpg';

const drawings = [draw1, draw2];

const INITIAL_STATE = {
    color: '#525252',
    fillSize: 10,
    draw: drawings[Math.floor(Math.random() * 2)]
}


export default class DrawingStore {
    drawSettings = INITIAL_STATE;

    constructor() {
        makeAutoObservable(this)
    }

    changeColor = color => this.drawSettings.color = color;
    changeFillSize = size => this.drawSettings.fillSize = size;

    resetDrawing = () => this.drawSettings = INITIAL_STATE;
}