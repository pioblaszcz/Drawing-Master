import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad, faImage, faPaintBrush, faPercent } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from 'react-i18next';

const icons = [faGamepad, faImage, faPaintBrush, faPercent];

const MainHowComponent = ({ id, title, text }) => {
    const { t } = useTranslation();

    return (
        <>
            <div className="howToPlay__icon-container">
                <FontAwesomeIcon icon={icons[id]} className="howToPlay__icon" bounce={true} />
            </div>
            <div className="howToPlay__text">
                <h2 className="text__h2">{`${id + 1}. `}{t(`how.title${id}`)}</h2>
                <p className="text__mainContent">{t(`how.text${id}`)}</p>
            </div>
        </>
    );
};

export default MainHowComponent;