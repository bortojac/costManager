import React from 'react';
import './sidebar.css';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/fontawesome-free-solid';
import { faChartBar } from '@fortawesome/fontawesome-free-regular';
import { faPlusSquare } from '@fortawesome/fontawesome-free-regular';


class Sidebar extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className= 'sidebar'>
            <a  onClick={this.props.openModal}><FontAwesomeIcon icon={faPlusSquare} size="2x"/></a>
            <Link to="/"><FontAwesomeIcon icon={faChartBar} size="2x" /></Link>
            <Link to="/settings"><FontAwesomeIcon icon={faCog} size="2x" /></Link>
            </div>
        )
}
}

export default Sidebar;