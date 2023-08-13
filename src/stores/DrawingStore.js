import { makeAutoObservable } from 'mobx';

const INITIAL_STATE = {
    color: '#525252',
    fillSize: 10,
    draw: null
}

export default class DrawingStore {
    drawSettings = INITIAL_STATE;

    constructor() {
        makeAutoObservable(this)
    }

    changeColor = color => this.drawSettings.color = color;
    changeFillSize = size => this.drawSettings.fillSize = size;
    setDraw = draw => this.drawSettings.draw = draw;

    resetDrawing = () => this.drawSettings = INITIAL_STATE;
}