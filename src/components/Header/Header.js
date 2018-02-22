import React from 'react';
import './header.css';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/fontawesome-free-regular';



class Header extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="header">
            <a  onClick={this.props.openModal}><FontAwesomeIcon icon={faPlusSquare} size="2x"/></a>
                <h1>Cost Manager App</h1>
                {//<i className="fa fa-2x fa-user-circle"></i>
                }
            </div>
        )
    }
}

export default Header;