import React from 'react';
import './sidebar.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/fontawesome-free-solid';
import { faChartBar } from '@fortawesome/fontawesome-free-regular';
import { faPlusSquare } from '@fortawesome/fontawesome-free-regular';

const Sidebar = ({ openModal }) => {
        return (
            <div className='sidebar'>
                <a onClick={openModal}><FontAwesomeIcon icon={faPlusSquare} size="2x" /></a>
                <Link to="/"><FontAwesomeIcon icon={faChartBar} size="2x" /></Link>
                <Link to="/settings"><FontAwesomeIcon icon={faCog} size="2x" /></Link>
            </div>
        )
}

Sidebar.propTypes = {
    openModal: PropTypes.func.isRequired,
}

export default Sidebar;