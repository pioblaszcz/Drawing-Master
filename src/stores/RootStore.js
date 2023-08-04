import AppStore from "./AppStore";

export default class RootStore {
    constructor() {
        this.appStore = new AppStore();
    }
}