import React from 'react';
import './sidebar.css';


class Sidebar extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className= 'sidebar'>
            <button type="button" onClick={this.props.openModal}>New Expense </button>
            <button type="button">Edit Settings </button>
            </div>
        )
}
}

export default Sidebar;