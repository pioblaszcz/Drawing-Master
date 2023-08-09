import AppStore from "./AppStore";
import DrawingStore from './DrawingStore';
import UserStore from './UserStore';

export default class RootStore {
    constructor() {
        this.appStore = new AppStore();
        this.drawingStore = new DrawingStore();
        this.userStore = new UserStore();
    }
}