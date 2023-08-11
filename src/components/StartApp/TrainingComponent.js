import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useAppStore, useUserStore } from '../../stores/hooks';

import avatar1 from '../../images/avatars/avatar1.png';
import avatar2 from '../../images/avatars/avatar2.png';
import avatar3 from '../../images/avatars/avatar3.png';
import icon from '../../images/elements/playIcn.png';
import refresh from '../../images/elements/refresh.png';

const avatars = [avatar1, avatar2, avatar3];

const TrainingComponent = () => {

    const { changeHide } = useAppStore();
    const { user, setUserNick, setUserAvatar } = useUserStore();
    const navigate = useNavigate();

    const { t } = useTranslation();

    const [numberAvatar, setNumberAvatar] = useState(user.avatar ? avatars.findIndex(avatar => avatar === user.avatar) : 1);
    const [nickname, setNickname] = useState(user.nick ? user.nick : '');
    const [placeholderEr, setPlaceholderEr] = useState(false);

    const setUserNickname = (e) => {
        setNickname(e.target.value);
        setUserNick(e.target.value);
    }

    const handleChangeAvatar = () => {
        setNumberAvatar(prev => prev + 1 > 2 ? 0 : prev + 1);
        setUserAvatar(avatars[numberAvatar + 1]);
    }

    const handleStartGame = () => {
        if (nickname === '') {
            setPlaceholderEr(true);
            setTimeout(() => setPlaceholderEr(false), 500);
            return;
        }

        !user.avatar && setUserAvatar(avatars[numberAvatar]);
        changeHide(true);
        setTimeout(() => navigate("/play"), 1000);
    }

    return (
        <div className="play">
            <div className="play__avatar">
                <div className="avatar__container">
                    <img src={refresh} alt="" className="avatar__refresh" onClick={handleChangeAvatar} />
                    <img src={user.avatar ? user.avatar : avatars[numberAvatar]} alt="" className="avatar__img" draggable="false" />
                </div>
            </div>
            <div className="play__nickname">
                <p className={`nickname__p  ${placeholderEr && 'nickname--error'}`}>{t('startApp.insert')}</p>
                <input type="text" className='nickname__input' placeholder={t('startApp.placeholder')} value={nickname} onChange={setUserNickname} />
            </div>
            <div className="play__start-wraper">
                <button className="play__button" onClick={handleStartGame}>
                    <img src={icon} alt="" className="play__button-icon" />
                    <p>Start</p>
                </button>
            </div>
        </div>
    );
};

export default TrainingComponent;