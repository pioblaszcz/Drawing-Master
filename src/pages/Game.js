import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useAppStore } from '../stores/hooks';
import { useTranslation } from 'react-i18next';
import RememberComponent from '../components/Game/RememberComponent';

const Game = () => {

    const { t } = useTranslation();
    const [gameStarted, setGameStarted] = useState(false);
    const navigate = useNavigate();
    const { app } = useAppStore();

    useEffect(() => {
        if (!app.hideStartApp) navigate('/');
        setTimeout(() => setGameStarted(true), 5500);
    }, [app.hideStartApp, navigate]);

    const playjsx = app.playerTurn ? null : <RememberComponent />;

    return (
        <>
            {gameStarted ?
                playjsx
                :
                <div className="round">
                    <p>{t('game.round')} 1</p>
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