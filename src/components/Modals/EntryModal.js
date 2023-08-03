import React from 'react';

import logo from '../../images/logotran2.png';

const EntryModal = () => {
    return (
        <>
            <div className="modal-container">
                <div className="modal">
                    <div className="modal__header">
                        <img src={logo} alt="" className="modal__logo" />
                    </div>
                    <div className="modal__content">
                        <h2 className="modal__title">access denied!</h2>
                        <p className="modal__description">
                            We are sorry but the app is not available on mobile devices
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EntryModal;