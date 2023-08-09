import { makeObservable, observable, action } from 'mobx';

const INITIAL_STATE = {
    color: '#525252',
    fillSize: 10,
}


export default class DrawingStore {
    drawSettings = INITIAL_STATE;

    constructor() {
        makeObservable(this, {
            drawSettings: observable,
            changeColor: action,
            changeFillSize: action,
            resetDrawing: action
        })
    }

    changeColor = color => this.drawSettings.color = color;
    changeFillSize = size => this.drawSettings.fillSize = size;

    resetDrawing = () => this.drawSettings = INITIAL_STATE;
}