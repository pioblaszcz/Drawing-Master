import React from 'react';
import { useTranslation } from 'react-i18next';

const MultiplayerComponent = () => {
    const { t } = useTranslation();

    return (
        <div className="multi">
            <p className="multi__apologise">
                {t('startApp.apologise')}
            </p>
        </div>
    );
};

export default MultiplayerComponent;