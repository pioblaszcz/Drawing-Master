import { makeObservable, observable, action } from 'mobx';

export default class AppStore {
    app = {
        hideStartApp: false,
        hideRemembered: false,
        playerTurn: false,
        endDrawing: false,
        showResult: false,
        showGameEndComponent: false,
        compareRate: null
    }

    constructor() {
        makeObservable(this, {
            app: observable,
            changeHide: action,
            changeHideRemembered: action,
            isPlayerTurn: action,
            setIsDrawingEnded: action,
            setShowResult: action,
            setCompareRate: action
        })
    }

    changeHide = hide => this.app.hideStartApp = hide;
    changeHideRemembered = hide => this.app.hideRemembered = hide;
    isPlayerTurn = bool => this.app.playerTurn = bool;
    setIsDrawingEnded = bool => this.app.endDrawing = bool;
    setShowResult = bool => this.app.showResult = bool;
    setCompareRate = number => this.app.compareRate = number;
}