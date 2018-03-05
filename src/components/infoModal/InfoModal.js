import React from 'react';
import './infoModal.css';


class InfoModal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return ( 
           <div className="infoModalContainer">
            <h1 className="infoModalHeader">
            {this.props.headerContent}
            </h1>
            <div className="infoModalContent">
            {this.props.modalMainContent}
            </div>
            </div>
        );
   }
}


export default InfoModal;