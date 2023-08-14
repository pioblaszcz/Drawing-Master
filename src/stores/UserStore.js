import { makeAutoObservable } from 'mobx';

const INITIAL_STATE = {
    nick: "",
    avatar: null,
    points: 0,
    isMobile: false,
}

export default class UserStore {
    user = INITIAL_STATE

    constructor() {
        makeAutoObservable(this)
    }

    setIsMobile = bool => this.user.isMobile = bool;
    setUserNick = nick => this.user.nick = nick;
    setUserAvatar = avatar => this.user.avatar = avatar;
    addUserPoints = points => this.user.points += points;

    resetUser = () => this.user = INITIAL_STATE;
}

