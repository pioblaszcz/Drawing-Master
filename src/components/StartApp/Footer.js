import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {

    const { t } = useTranslation();

    return (
        <div className="startPage__footer">
            <p className="footer__info">
                <a href="https://github.com/pioblaszcz/Drawing-Master" target="_blank" rel="noreferrer">github</a>  |
                <a href="https://www.facebook.com/profile.php?id=100005502377954" target="_blank" rel="noreferrer"> {t('startApp.contact')}</a>
            </p>
        </div>
    );
};

export default Footer;