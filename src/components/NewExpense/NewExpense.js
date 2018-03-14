import React from 'react';
import PropTypes from 'prop-types';
import './newExpense.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import _ from 'lodash';

class NewExpense extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
        const value = selectedOption === null ? '' : selectedOption.value
        this.setState({
            categoryInputValue: value
        });
        if (!this.state.options.map(item => item.value).includes(value) & value !== '') {
            this.setState(prevState => ({
                options: [
                    ...prevState.options,
                    {
                        value: value,
                        label: value
                    }]
            }));
        }
    }

    updateAmountValue(event) {
        this.setState({
            amountInputValue: event.target.value
        });
    }

    updateNotesText(event) {
        this.setState({
            notesInputText: event.target.value
        });
    }

    handleSubmit() {
        if (this.state.categoryInputValue) {
            this.props.saveExpense(
                this.state.dateInputValue.format('YYYY-MM-DD'),
                this.state.categoryInputValue,
                this.state.amountInputValue,
                this.state.notesInputText
            );
            // if the user has created a new category, we should add it to the user database too
            if (!this.props.categoryOptions.includes(this.state.categoryInputValue)) {
                this.props.addUserCategory(this.state.categoryInputValue);
            }
            this.props.closeModal();
        }
        else {
            return false;
        }
    }

    render() {
        return (
            <div className="newExpenseDiv">
                <h1 className="modalContentHeader">New Expense Entry</h1>
                <form className="form">
                    <div className="inputContainer">
                        <h4>Date:</h4>
                        <DatePicker
                            onChange={this.updateDateValue}
                            maxDate={moment()}
                            selected={this.state.dateInputValue}
                        />
                    </div>
                    <div className="inputContainer">
                        <h4>Category:</h4>
                        <Select.Creatable
                            name="category"
                            clearable={true}
                            value={this.state.categoryInputValue}
                            onChange={this.updateCategoryValue}
                            className="categorySelect"
                            options={this.state.options}
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
                    <button className={this.state.categoryInputValue ? "saveButton" : "disabled saveButton"} type="button" onClick={this.handleSubmit}>Save</button>
                </form>
            </div>
        );
    }
}
NewExpense.propTypes = {
    saveExpense: PropTypes.func.isRequired,
    addUserCategory: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    categoryOptions: PropTypes.array.isRequired
}

export default NewExpense;

