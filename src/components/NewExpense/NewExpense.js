import React from 'react';
import PropTypes from 'prop-types';
import './newExpense.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import _ from 'lodash';

/*const formatDate = (momentObj) => {
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
}*/

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
            //submitted: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateDateValue = this.updateDateValue.bind(this);
        this.updateCategoryValue = this.updateCategoryValue.bind(this);
        this.updateAmountValue = this.updateAmountValue.bind(this);
        this.updateNotesText = this.updateNotesText.bind(this);
    }
    
   //componentDidMount() {

//        }

    updateDateValue(date) {
        this.setState({
            dateInputValue: date
        });
        console.log(this.state.dateInputValue);
        console.log(formatDate(this.state.dateInputValue));
    }
    updateCategoryValue(selectedOption) {
        const value = selectedOption === null ? '' : selectedOption.value
        this.setState({
            categoryInputValue: value
        });
        if(!this.state.options.map(item => item.value).includes(value) & value !== '') {
            this.setState(prevState => ({
                options: [
                    ...prevState.options,
                    {value: value,//.toLowerCase(),
                     label: value//.replace(/\b\w/g, l => l.toUpperCase())
                    }]
            }));
        }
        console.log(value);
        console.log(this.state.categoryInputValue);
        console.log(this.state.options);
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
        if(this.state.categoryInputValue) {
            this.props.saveExpense(
                //formatDate(this.state.dateInputValue), // formatting to yyyy-mm-dd for storage
                this.state.dateInputValue.format('YYYY-MM-DD'),
                this.state.categoryInputValue,
                this.state.amountInputValue,
                this.state.notesInputText//,
                //this.props.monthStartDay
            );
            // if the user has created a new category, we should add it to the user database too
            if (!this.props.categoryOptions.includes(this.state.categoryInputValue)) {
                this.props.addUserCategory(this.state.categoryInputValue);
            }
            this.props.fetchUserInfo();
            this.props.closeModal();

        }
        else {
            return false;
        }
        //this.setState({submitted: false})
    }

    /*renderSaveMessage() {
        if(this.props.saveMessage) {
            return <p>{this.props.saveMessage}</p>
        }
        return
    }*/

    render() {
        //console.log('New Expense');
        //console.log(this.props.monthStartDay);
        return (
            <div className="newExpenseDiv">
                <h1 className="modalContentHeader">New Expense Entry</h1>
                <form className="form">
                    <div className="inputContainer">
                        <h4>Date:</h4>
                        <DatePicker
                            onChange={this.updateDateValue}
                            //className="datePicker"
                            maxDate={moment()}
                            selected={this.state.dateInputValue}
                        />
                    </div>
                    {//below we are doing a regular select input, but we should use props to let the user decide
                        // which categories they want
                    }
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
                    {//this.renderSaveMessage()
                    }
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

