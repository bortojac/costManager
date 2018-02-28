import React from 'react';
import './delete.css';
import _ from 'lodash';
import moment from 'moment';
import Select from 'react-select';
import DatePicker from 'react-datepicker';


class Delete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryEditFlag: false,
            monthStartEditFlag: false,
            dateInputValue: moment(),
            categoryInputValue: undefined,
            amountInputValue: 0,
            options: _.map(this.props.categories, category => (
                {
                    value: category,
                    label: category.replace(/\b\w/g, l => l.toUpperCase())
                })
            )
            //submitted: false
        };
        this.handleDeleteEntriesClick = this.handleDeleteEntriesClick.bind(this);
        this.handleDeleteAllClick = this.handleDeleteAllClick.bind(this);
        this.updateCategoryValue = this.updateCategoryValue.bind(this);
        this.updateAmountValue = this.updateAmountValue.bind(this);
        this.updateDateValue = this.updateDateValue.bind(this);

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
    }

    updateAmountValue(e) {
        this.setState({
            amountInputValue: e.target.value
        });
    }
    handleDeleteEntriesClick() {
        this.props.deleteEntries(
            this.state.dateInputValue.format('YYYY-MM-DD'),
            this.state.categoryInputValue,
            this.state.amountInputValue);
    }

    handleDeleteAllClick() {
        this.props.deleteAll();
    }

    render() {
        //console.log(moment().endOf('month').format('DD'));
        return (
            <div className="deleteContainer">
            <div className="deleteEntriesContainer">
                <form className="deleteForm">
                    <div className="deleteDateInputContainer">
                        <h4>Date:</h4>
                        <DatePicker
                            onChange={this.updateDateValue}
                            selected={this.state.dateInputValue}
                        />
                    </div>
                    <div className="deleteInputContainer">
                        <h4>Category:</h4>
                        <Select
                            name="deleteCategory"
                            clearable={true}
                            value={this.state.categoryInputValue}
                            onChange={this.updateCategoryValue}
                            className="deleteCategorySelect"
                            options={this.state.options}
                        />
                    </div>
                    <div className="deleteAmountInputContainer">
                        <h4>Amount:</h4>
                        <input
                            type="number"
                            name="deleteAmount"
                            min="1"
                            max="50000"
                            value={this.state.amountInputValue}
                            onChange={this.updateAmountValue}></input>
                    </div>
                </form>
                <a className="deleteButton" onClick={this.handleDeleteEntriesClick}>Delete Entries</a>
                </div>
                <a className="deleteButton" onClick={this.handleDeleteAllClick}>Delete All</a>
            </div>
        )
    }
}

export default Delete;