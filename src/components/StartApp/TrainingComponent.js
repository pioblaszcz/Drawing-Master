import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import icon from '../../images/playIcn.png';
import avatar from '../../images/avatars/avatar2.png';
import refresh from '../../images/refresh.png';

const TrainingComponent = () => {
    const { t } = useTranslation();

    const [nickname, setNickname] = useState('');

    const setUserNickname = (e) => setNickname(e.target.value);

    const handleStartGame = () => {

    }

    return (
        <div className="play">
            <div className="play__avatar">
                <div className="avatar__container">
                    <img src={refresh} alt="" className="avatar__refresh" />
                    <img src={avatar} alt="" className="avatar__img" draggable="false" />
                </div>
            </div>
            <div className="play__nickname">
                <p className="nickname__p">{t('startApp.insert')}</p>
                <input type="text" className="nickname__input" placeholder={t('startApp.placeholder')} value={nickname} onChange={setUserNickname} />
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