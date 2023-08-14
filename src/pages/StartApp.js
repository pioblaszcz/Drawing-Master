import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from 'react-i18next';
import { useAppStore, useDrawingStore, useUserStore } from '../stores/hooks';

import TrainingComponent from '../components/StartApp/TrainingComponent';
import MultiplayerComponent from '../components/StartApp/MultiplayerComponent';
import HowToPlay from '../components/StartApp/HowToPlayComponent';
import Footer from '../components/StartApp/Footer';

import EntryModal from '../components/Modals/EntryModal';

import draw1 from '../images/drawings/draw1.png';
import draw2 from '../images/drawings/draw2.jpg';
import logo from '../images/logo/logotran.png';

const drawings = [draw1, draw2];

const StartApp = () => {
    const { app, resetApp, setShowHowToPlay, setShowResult } = useAppStore();
    const { user } = useUserStore();
    const { resetDrawing, setDraw } = useDrawingStore();
    const { t, i18n } = useTranslation();

    const { isMobile } = user;

    const [playOption, setPlayOption] = useState(1);
    const [language, setLanguage] = useState(i18n.language.toUpperCase().includes('E') ? 'EN' : 'PL');

    useEffect(() => {
        resetDrawing();
        setDraw(drawings[Math.floor(Math.random() * 2)]);
        resetApp();
    }, [resetApp, resetDrawing, setDraw, setShowResult]);

    const play = playOption ? <TrainingComponent /> : <MultiplayerComponent />;

    const handleChangeLanguage = () => {
        if (language === 'EN') {
            setLanguage('PL');
            i18n.changeLanguage('pl');
        }
        else {
            setLanguage('EN');
            i18n.changeLanguage('en');
        }
    }

    const handleChoseMode = (option) => setPlayOption(option);

    return (
        <>
            <EntryModal />
            <div className={`startPage ${app.hideStartApp && 'startPage--hide'}`}>
                <div className="startPage__lang" onClick={handleChangeLanguage}>
                    {!isMobile && <FontAwesomeIcon icon={faGlobe} className="lang__globe" />}
                    <p className="lang__p">{language}</p>
                </div>
                <div className="startPage__logo">
                    <img src={logo} alt="" className="startPage__logo-image" draggable="false" />
                </div>
                <div className="startPage__main">
                    <div className="startPage__play">
                        <button className={`startPage__chose ${playOption ? 'button--active' : 'button--unactive'}`} onClick={() => handleChoseMode(1)}>{t('startApp.training')}</button>
                        <button className={`startPage__chose  ${!playOption ? 'button--active' : 'button--unactive'}`} onClick={() => handleChoseMode(0)}>{user.isMobile ? 'Multiplayer' : t('startApp.playWFriends')}</button>
                        <div className={`space ${!playOption && 'space--second'}`}></div>
                        {play}
                    </div>
                    {isMobile && <FontAwesomeIcon icon={faCircleInfo} className="startPage__info" onClick={() => setShowHowToPlay(true)} />}
                    {isMobile ? app.showHowToPlay && <HowToPlay /> : <HowToPlay />}
                </div>
                <Footer />
            </div>
        </>
    );
};

export default observer(StartApp);