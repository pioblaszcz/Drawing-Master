import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useAppStore } from '../stores/hooks';
import { useTranslation } from 'react-i18next';
import PlayComponent from '../components/Game/PlayComponent';

const Game = () => {

    const { t } = useTranslation();
    const [gameStarted, setGameStarted] = useState(false);
    const navigate = useNavigate();
    const { app } = useAppStore();

    useEffect(() => {
        if (!app.hideStartApp || app.shouldReturn) navigate('/');
        setTimeout(() => setGameStarted(true), 4700);
    }, [app.hideStartApp, navigate]);

    return (
        <>
            {gameStarted ?
                <PlayComponent />
                :
                <div className="round">
                    <p>3</p>
                    <p>2</p>
                    <p>1</p>
                    <p>{t('game.go')}</p>
                </div>
            }
        </>
    );
};
export default observer(Game);