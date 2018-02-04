import React from 'react';
import PropTypes from 'prop-types';
import './newExpense.css';


class NewExpense extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dateInputValue: new Date(Date.now()),
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

    updateDateValue(event) {
        this.setState({
            dateInputValue: event.target.value
        });
    }
    updateCategoryValue(event) {
        this.setState({
            categoryInputValue: event.target.value
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
            this.state.dateInputValue,
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
        return (
            <div className="newExpenseDiv">
                <h1 className="modalContentHeader">New Expense Entry</h1>
                <form>
                    <div>
                        <h4>Date:</h4>
                        <input
                            type="date"
                            name="date"
                            onChange={this.updateDateValue}
                            value={this.state.dateInputValue}
                        ></input>
                    </div>
                    {//below we are doing a regular select input, but we should use props to let the user decide
                        // which categories they want
                    }
                    <div>
                        <h4>Category:</h4>
                        <select name="category"
                            value={this.state.categoryInputValue}
                            onChange={this.updateCategoryValue}
                        >
                            <option value="rent">Rent</option>
                            <option value="entertainment">Entertainment</option>
                            <option value="groceries">Groceries</option>
                            <option value="utilities">Utilities</option>
                            <option value="personal">Personal</option>
                        </select>
                    </div>
                    <div>
                        <h4>Amount:</h4>
                        <input
                            type="number"
                            name="amount"
                            min="1"
                            max="50000"
                            value={this.state.amountInputValue}
                            onChange={this.updateAmountValue}></input>
                    </div>
                    <div>
                        <h4>Notes:</h4>
                        <textarea
                            name="notes"
                            rows="4"
                            cols="30"
                            value={this.state.notesInputText}
                            onChange={this.updateNotesText}></textarea>
                    </div>
                    <button type="button" onClick={this.handleSubmit}>Save</button>
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

