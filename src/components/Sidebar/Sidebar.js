import React from 'react';
import './sidebar.css';
import { Link } from 'react-router-dom';


class Sidebar extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className= 'sidebar'>
            <a className="sidebarButtons" onClick={this.props.openModal}>New Expense </a>
            <Link to="/">Dashboard</Link>
            <Link to="/settings">Edit Settings</Link>
            </div>
        )
}
}

export default Sidebar;