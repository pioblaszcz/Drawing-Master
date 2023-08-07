import { makeObservable, observable, action } from 'mobx';

export default class DrawingStore {
    drawSettings = {
        color: '#525252',
        fillSize: 10,
    }

    constructor() {
        makeObservable(this, {
            drawSettings: observable,
            changeColor: action,
            changeFillSize: action,
        })
    }

    changeColor = color => this.drawSettings.color = color;
    changeFillSize = size => this.drawSettings.fillSize = size;
}