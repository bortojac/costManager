import React from 'react';
import './infoModal.css';
import PropTypes from 'prop-types';

const InfoModal = ({ headerContent, modalMainContent }) => {
        return (
                <div className="infoModalContainer">
                        <h1 className="infoModalHeader">
                                {headerContent}
                        </h1>
                        <div className="infoModalContent">
                                {modalMainContent}
                        </div>
                </div>
        );
}

InfoModal.propTypes = {
        headerContent: PropTypes.string.isRequired,
        modalMainContent: PropTypes.object.isRequired
}

export default InfoModal;