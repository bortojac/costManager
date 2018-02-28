import React from 'react';
import './settings.css';
import _ from 'lodash';
import moment from 'moment';
import CategorySettings from '../CategorySettings';
import MonthStartDate from '../MonthStartDate';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import DeleteInputs from '../Delete';
import { faTimes } from '@fortawesome/fontawesome-free-solid';
import { faEdit } from '@fortawesome/fontawesome-free-regular';


class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryEditFlag: false,
            monthStartEditFlag: false,
            dateInputValue: moment(),
            categoryInputValue: undefined,
            amountInputValue: 0,
            notesInputText: 'What was the expense on?',
            options: _.map(this.props.categoryOptions, category => (
                {
                    value: category,
                    label: category.replace(/\b\w/g, l => l.toUpperCase())
                })
            )
            //submitted: false
        };
        this.handleCategoryEdit = this.handleCategoryEdit.bind(this);
        this.handleMonthStartEdit = this.handleMonthStartEdit.bind(this);
    }

    handleCategoryEdit() {
        this.setState({categoryEditFlag: !this.state.categoryEditFlag});
    }

    handleMonthStartEdit() {
        this.setState({monthStartEditFlag: !this.state.monthStartEditFlag});
        //console.log(this.state.monthStartEditFlag);
    }

    renderIcons(flag, handleFunc) {
        if(flag) {
            console.log(flag);
            console.log('true');
        return (<a className="editLink" onClick={handleFunc}><FontAwesomeIcon icon={faTimes} /></a>);
        } 
        else {
            console.log(flag);
        return (<a className="editLink"  onClick={handleFunc}><FontAwesomeIcon icon={faEdit} /></a>);
        }
    }
    
    render() {
        //console.log(moment().endOf('month').format('DD'));
        return (
            <div className="settingsContainer">
                <div className="settingsRow1">
                    <h1>Settings</h1>
                </div>
                <div className="settingsRow2">
                    <section className="settingsRow2Col1">
                        <h2>Your Spending Categories</h2>
                        <div className="settingsRow2Col1Content">
                        {this.renderIcons(this.state.categoryEditFlag, this.handleCategoryEdit)}
                        <CategorySettings handleCategoryEdit={this.handleCategoryEdit}
                        categoryEditFlag ={this.state.categoryEditFlag}/>
                        </div>
                    </section>
                    <section className="settingsRow2Col2">
                        <h2>Your Month Start Date</h2>
                        <div className="settingsRow2Col2Content">
                        {this.renderIcons(this.state.monthStartEditFlag, this.handleMonthStartEdit)}
                       <MonthStartDate handleMonthStartEdit={this.handleMonthStartEdit}
                       monthStartEditFlag={this.state.monthStartEditFlag}/>
                        </div>
                    </section>
                    <section className="settingsRow2Col3">
                        <h2>Delete Entries</h2>
                        <div className="settingsRow2Col3Content">
                        <DeleteInputs />
                        </div>
                        </section>
                </div>
            </div>
        )
    }
}

export default Settings;