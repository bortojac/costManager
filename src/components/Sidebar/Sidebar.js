import React from 'react';
import './sidebar.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/fontawesome-free-solid';
import { faChartBar } from '@fortawesome/fontawesome-free-regular';
import { faPlusSquare } from '@fortawesome/fontawesome-free-regular';

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    // handle enter event for tab access to new Expense Modal
    handleKeyDown(event) {
        if (event.keyCode == 13) {
            this.props.openModal();
        }
    }

    render() {
        return (
            <div className='sidebar'>
                <a onClick={this.props.openModal} onKeyDown={this.handleKeyDown} tabIndex="0"><FontAwesomeIcon icon={faPlusSquare} size="2x" /></a>
                <Link to="/"><FontAwesomeIcon icon={faChartBar} size="2x" /></Link>
                <Link to="/settings"><FontAwesomeIcon icon={faCog} size="2x" /></Link>
            </div>
        )
    }
}

Sidebar.propTypes = {
    openModal: PropTypes.func.isRequired,
}

export default Sidebar;