import React from 'react';
import './delete.css';
import _ from 'lodash';
import moment from 'moment';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { fetchCategoryData } from '../../store/actions';


class Delete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryEditFlag: false,
            monthStartEditFlag: false,
            dateInputValue: undefined,
            categoryInputValue: undefined,
            amountInputValue: undefined,
            notesInputValue: undefined
        };
        this.handleDeleteEntriesClick = this.handleDeleteEntriesClick.bind(this);
        this.handleDeleteAllClick = this.handleDeleteAllClick.bind(this);
        this.updateCategoryValue = this.updateCategoryValue.bind(this);
        this.updateAmountValue = this.updateAmountValue.bind(this);
        this.updateDateValue = this.updateDateValue.bind(this);
       this.updateNotesValue = this.updateNotesValue.bind(this);

    }


    updateDateValue(date) {
        //console.log('state');
        //console.log(this.state.dateInputValue);
        //console.log(date);
        this.setState({
            dateInputValue: date//,
            //renderDeleteMessage: false
        });
    }

    updateCategoryValue(selectedOption) {
        const value = selectedOption === null ? '' : selectedOption.value
        this.setState({
            categoryInputValue: value//,
           // renderDeleteMessage: false
        });

        console.log(this.state.categoryInputValue);
    }

    updateAmountValue(val) {
        const value = val === null ? '' : val
        this.setState({
            amountInputValue: value//,
            //deleteBool: false
        });
    }

updateNotesValue(selectedOption) {
        const value = selectedOption === null ? '' : selectedOption.value
        this.setState({
            notesInputValue: value//,
            //deleteBool: false
        });
    }

    handleDeleteEntriesClick() {
        if(this.state.notesInputValue && this.state.amountInputValue && this.state.dateInputValue && this.state.categoryInputValue) {
            console.log('worked');
            this.props.deleteEntries(
                this.state.dateInputValue.format('YYYY-MM-DD'),
                this.state.categoryInputValue,
                Number(this.state.amountInputValue),
                this.state.notesInputValue
            );
            this.setState({
                dateInputValue: undefined,
                categoryInputValue: undefined,
                notesInputValue: undefined,
                amountInputValue: undefined
            })
        }
        return
    }

    handleDeleteAllClick() {
        this.props.deleteAll();
    }

    /*renderDeleteMessage() {
        if(this.state.renderDeleteMessage) {
            return <p className="deleteMessage">{_.get(this.props,'deleteMessage','waiting')}</p>;
        }
    }*/

    includeDatesArr() {
      return _.map(_.get(this.props, 'dbData', []), obj => obj.date);
    }

    categoryOptions() {
        //console.log('categoryOptions');
        //console.log(this.props.dbData);
        //console.log(this.state.dateInputValue.format("DD-MM-YYYY"));
        //console.log(_.map(_.get(this.props, 'dbData', []), obj => obj.date));
        if(this.state.dateInputValue) {
            // moments were not updating as planned: _d value not matching _i value when state updates. format gives correct value. likely due to utc. 
            let formattedDateArr = _.map(this.props.dbData, obj => ({
                date: obj.date.format("DD-MM-YYYY"),
                category: obj.category
            }));
            let formattedDateInput = this.state.dateInputValue.format('DD-MM-YYYY');
           // console.log(formattedDateArr);
            //console.log(formattedDateInput);
            console.log(_.uniqBy(_.map(_.filter(formattedDateArr, { date: formattedDateInput }), obj => ({
                value: obj.category,
                label: obj.category.replace(/\b\w/g, l => l.toUpperCase())
            })), 'value'));
            return _.uniqBy(_.map(_.filter(formattedDateArr, { date: formattedDateInput }), obj => ({
                value: obj.category,
                label: obj.category.replace(/\b\w/g, l => l.toUpperCase())
            })), 'value' );

        }
    }

        notesOptions() {
            //console.log('notesOptions');
            //console.log(this.props.dbData);
            //console.log(this.state.dateInputValue.format("DD-MM-YYYY"));
            //console.log(_.map(_.get(this.props, 'dbData', []), obj => obj.date));
            if(this.state.dateInputValue && this.state.categoryInputValue) {
                // moments were not updating as planned: _d value not matching _i value when state updates. format gives correct value. likely due to utc. 
                let formattedDateArr = _.map(this.props.dbData, obj => ({
                    date: obj.date.format("DD-MM-YYYY"),
                    category: obj.category,
                    notes: obj.notes
                }));
                let formattedDateInput = this.state.dateInputValue.format('DD-MM-YYYY');
                //console.log(formattedDateArr);
              //  console.log(formattedDateInput);
                  //  console.log(this.state.categoryInputValue);
                return _.uniqBy(_.map(_.filter(formattedDateArr, { date: formattedDateInput, category: this.state.categoryInputValue }), obj => ({
                    value: obj.notes,
                    label: obj.notes
                })), 'value'); 
}
}

amountOptions() {
    //console.log('categoryOptions');
    //console.log(this.props.dbData);
    //console.log(this.state.dateInputValue.format("DD-MM-YYYY"));
    //console.log(_.map(_.get(this.props, 'dbData', []), obj => obj.date));
    if(this.state.dateInputValue && this.state.categoryInputValue && this.state.notesInputValue) {
        // moments were not updating as planned: _d value not matching _i value when state updates. format gives correct value. likely due to utc. 
        let formattedDateArr = _.map(this.props.dbData, obj => ({
            date: obj.date.format("DD-MM-YYYY"),
            category: obj.category,
            note: obj.notes,
            amount: obj.amount
        }));
        let formattedDateInput = this.state.dateInputValue.format('DD-MM-YYYY');
        //console.log(formattedDateArr);
        //console.log(formattedDateInput);
        return _.uniqBy(_.map(_.filter(formattedDateArr, { date: formattedDateInput, category: this.state.categoryInputValue }), obj => ({
            value: obj.amount,
            label: obj.amount
        })), 'value');
}
} 

    render() {
        //console.log(_.map(_.get(this.props, 'dbData', []), obj => obj.date.format('MM-DD-YYYY')));
        //;

        return (
            <div className="deleteContainer">
            <div className="deleteEntriesContainer">
                <form className="deleteForm">
                    <div className="deleteDateInputContainer">
                        <h4>Date:</h4>
                        <DatePicker
                            onChange={this.updateDateValue}
                            selected={this.state.dateInputValue}
                            includeDates={this.includeDatesArr()}
                            placeholderText="Select a date"
                        />
                        {//_.map(_.get(this.props, 'dbData', []), obj => obj.date)]
                        }
                    </div>
                    <div className="deleteInputContainer">
                        <h4>Category:</h4>
                        <Select
                            name="deleteCategory"
                            clearable={true}
                            value={this.state.categoryInputValue}
                            onChange={this.updateCategoryValue}
                            disabled={ this.state.dateInputValue ? false : true}
                            className="deleteSelect"
                            options={this.categoryOptions()}
                        />
                    </div>
                    <div className="deleteInputContainer">
                        <h4>Notes:</h4>
                        <Select
                            name="deleteNotes"
                            clearable={true}
                            value={this.state.notesInputValue}
                            disabled={this.state.categoryInputValue && this.state.dateInputValue ? false: true}
                            className="deleteSelect"
                            options={this.notesOptions()}
                            onChange={this.updateNotesValue}>
                            </Select>
                    </div>
                    <div className="deleteInputContainer">
                        <h4>Amount:</h4>
                        <Select
                            name="deleteAmount"
                            clearable={true}
                            simpleValue
                            value={this.state.amountInputValue}
                            disabled={this.state.categoryInputValue && this.state.dateInputValue && this.state.notesInputValue ? false : true }
                            className="deleteSelect"
                            options={this.amountOptions()}
                            onChange={this.updateAmountValue}></Select>
                    </div>
               </form>
                {//this.renderDeleteMessage()
                }
                <a 
                className={this.state.categoryInputValue && this.state.dateInputValue && this.state.notesInputValue && this.state.amountInputValue ? "deleteButton" : "disabled deleteButton"}
                onClick={this.handleDeleteEntriesClick}>Delete Entry</a>
                </div>
                <a className="deleteButton" onClick={this.handleDeleteAllClick}>Delete All</a>
            </div>
        )
    }
}

export default Delete;