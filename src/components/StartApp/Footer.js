import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {

    const { t } = useTranslation();

    return (
        <div className="startPage__footer">
            <p className="footer__info">
                <a href="https://github.com/pioblaszcz/Drawing-Master" target="_blank">github</a>  | <a href="#">{t('startApp.contact')}</a>
            </p>
        </div>
    );
};

export default Footer;