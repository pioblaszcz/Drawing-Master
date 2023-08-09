import { makeObservable, observable, action } from 'mobx';

const INITIAL_STATE = {
    nick: "",
    avatar: null,
    points: 0,
}

export default class UserStore {
    user = INITIAL_STATE

    constructor() {
        makeObservable(this, {
            user: observable,
            setUserNick: action,
            setUserAvatar: action,
            addUserPoints: action,
            resetUser: action
        })
    }

    setUserNick = nick => this.user.nick = nick;
    setUserAvatar = avatar => this.user.avatar = avatar;
    addUserPoints = points => this.user.points += points;

    resetUser = () => this.user = INITIAL_STATE;
}