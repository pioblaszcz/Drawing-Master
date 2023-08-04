import { makeObservable, observable, action } from 'mobx';

export default class AppStore {
    app = {
        hideStartApp: false,
        hideRemembered: false,
        playerTurn: false
    }

    constructor() {
        makeObservable(this, {
            app: observable,
            changeHide: action,
            changeHideRemembered: action,
            isPlayerTurn: action
        })
    }

    changeHide = hide => this.app.hideStartApp = hide;
    changeHideRemembered = hide => this.app.hideRemembered = hide;
    isPlayerTurn = bool => this.app.playerTurn = bool;
}