import React from 'react';
import './settings.css';
import _ from 'lodash';
import CategorySettings from '../CategorySettings';

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryEditFlag: false,
            startDateEditFlag: false
        };
        this.handleCategoryEditClick = this.handleCategoryEditClick.bind(this);
        this.handleStartDateEditClick = this.handleStartDateEditClick.bind(this);
    }

    handleCategoryEditClick() {
        this.setState({categoryEditFlag: !this.state.categoryEditFlag})
        console.log(this.state.categoryEditFlag)
    }

    handleStartDateEditClick() {
        this.setState({startDateEditFlag: true})
    }

    render() {
        return (
            <div className="settingsContainer">
                <div className="settingsRow1">
                    <h1>Settings</h1>
                </div>
                <div className="settingsRow2">
                    <section className="settingsRow2Col1">
                        <h2>Your Spending Categories</h2>
                        <div className="settingsRow2Col1Content">
                        <a className="editLink" onClick={this.handleCategoryEditClick}>
                        {this.state.categoryEditFlag ? 'Cancel' : 'Edit'}
                        </a>
                        <CategorySettings categoryEditFlag ={this.state.categoryEditFlag}/>
                        </div>
                    </section>
                    <section className="settingsRow2Col2">
                        <h2>Your Month Start Date</h2>
                        <div className="settingsRow2Col2Content">
                        <a className="editLink"  onClick={this.handleStartDateEditClick}>edit</a>
                            <p>1st</p>
                        </div>
                    </section>
                </div>
            </div>
        )
    }
}

export default Settings;