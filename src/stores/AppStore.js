import { makeAutoObservable } from 'mobx';

const INITIAL_STATE = {
    showHowToPlay: false,
    hideStartApp: false,
    hideRemembered: false,
    playerTurn: false,
    endDrawing: false,
    showResult: false,
    showGameEndComponent: false,
    compareRate: null,
    isGameEnded: false,
    hideResult: false,
    shouldReturn: false,
}

export default class AppStore {
    app = INITIAL_STATE;

    constructor() {
        makeAutoObservable(this)
    }

    setShowHowToPlay = bool => this.app.showHowToPlay = bool;
    changeHide = hide => this.app.hideStartApp = hide;
    changeHideRemembered = hide => this.app.hideRemembered = hide;
    isPlayerTurn = bool => this.app.playerTurn = bool;
    setIsDrawingEnded = bool => this.app.endDrawing = bool;
    setShowResult = bool => this.app.showResult = bool;
    setCompareRate = number => this.app.compareRate = number;
    setIsGameEnded = bool => this.app.isGameEnded = bool;
    setHideResult = bool => this.app.hideResult = bool;
    setShouldReturn = bool => this.app.shouldReturn = bool;

    resetApp = () => this.app = INITIAL_STATE;
}