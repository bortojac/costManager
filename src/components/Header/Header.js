import React from 'react';
import './header.css';


class Header extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="header">
                <h1>Cost Manager App</h1>
                {//<i className="fa fa-2x fa-user-circle"></i>
                }
            </div>
        )
    }
}

export default Header;