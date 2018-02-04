import React from 'react';
import PropTypes from 'prop-types';
import './newExpense.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const formatDate = (momentObj) => {
    let date = momentObj._d;
    let dd = date.getDate();
    let mm = date.getMonth()+1; // january is 0
    let yyyy = date.getFullYear();
    if(dd<10) {
        dd = '0'+dd
    }
    if(mm<10) {
        mm = '0'+mm
    }

   date = `${yyyy}-${mm}-${dd}`;
   return date;
}

class NewExpense extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dateInputValue: moment(),
            categoryInputValue: 'rent',
            amountInputValue: 0,
            notesInputText: 'What was the expense on?'
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateDateValue = this.updateDateValue.bind(this);
        this.updateCategoryValue = this.updateCategoryValue.bind(this);
        this.updateAmountValue = this.updateAmountValue.bind(this);
        this.updateNotesText = this.updateNotesText.bind(this);
    }

    updateDateValue(date) {
        this.setState({
            dateInputValue: date
        });
    }
    updateCategoryValue(selectedOption) {
        this.setState({
            categoryInputValue: selectedOption.value
        });
    }
    updateAmountValue(event) {
        this.setState({
            amountInputValue: event.target.value
        });
    }
    updateNotesText() {
        this.setState({
            notesInputText: event.target.value
        });
    }

    handleSubmit() {
        this.props.saveExpense(
            formatDate(this.state.dateInputValue), // formatting to yyyy-mm-dd for storage
             this.state.categoryInputValue,
             this.state.amountInputValue,
            this.state.notesInputText)
    }

    renderSaveMessage() {
        if(this.props.saveMessage && this.props.saved) {
            return <p>{this.props.saveMessage}</p>
        }
        return
    }

    render() {
        console.log(this.state.categoryInputValue);
        return (
            <div className="newExpenseDiv">
                <h1 className="modalContentHeader">New Expense Entry</h1>
                <form className="form">
                    <div className="inputContainer">
                        <h4>Date:</h4>
                        <DatePicker
                            onChange={this.updateDateValue}
                            //className="datePicker"
                            selected={this.state.dateInputValue}
                        />
                    </div>
                    {//below we are doing a regular select input, but we should use props to let the user decide
                        // which categories they want
                    }
                    <div className="inputContainer">
                        <h4>Category:</h4>
                        <Select
                         name="category"
                            value={this.state.categoryInputValue}
                            onChange={this.updateCategoryValue}
                            className="categorySelect"
                            options={
                                [
                                    { value: 'rent', label: 'Rent' },
                                    { value: 'groceries', label: 'Groceries' },
                                    { value: 'utilities', label: 'Utilities' },
                                    { value: 'personal', label: 'Personal' }
                                ]
                            }
                        />
                    </div>
                    <div className="inputContainer">
                        <h4>Amount:</h4>
                        <input
                            type="number"
                            name="amount"
                            min="1"
                            max="50000"
                            value={this.state.amountInputValue}
                            onChange={this.updateAmountValue}></input>
                    </div>
                    <div className="inputContainer">
                        <h4>Notes:</h4>
                        <textarea
                            name="notes"
                            rows="4"
                            cols="30"
                            value={this.state.notesInputText}
                            onChange={this.updateNotesText}></textarea>
                    </div>
                    <button className="saveButton" type="button" onClick={this.handleSubmit}>Save</button>
                    {this.renderSaveMessage()}
                </form>
            </div>
        );
    }
}
NewExpense.propTypes = {
    saveExpense: PropTypes.func.isRequired,
    saved: PropTypes.bool.isRequired,
    saveMessage: PropTypes.string.isRequired
}

export default NewExpense;

