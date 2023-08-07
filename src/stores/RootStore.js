import AppStore from "./AppStore";
import DrawingStore from './DrawingStore';

export default class RootStore {
    constructor() {
        this.appStore = new AppStore();
        this.drawingStore = new DrawingStore();
    }
}