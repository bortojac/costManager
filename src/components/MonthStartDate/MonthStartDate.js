import React from 'react';
import './monthStartDate.css';
import moment from 'moment';
import _ from 'lodash';

class MonthStartDate extends React.Component {
    constructor(props) {
        super(props);
        // state needs to be dynamic to whatever number of categories are made in the newExpenseModal. 
        this.state = {
            monthStartDay: undefined
        };
        this.handleMonthStartSubmit = this.handleMonthStartSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this);
    }
  
    componentDidMount() {
        // get UserInfo to 
        this.props.fetchMonthStartDay('bortojac'); 
    }

    handleMonthStartSubmit() {
        console.log(this.state.monthStartDay);
        this.props.updateMonthStartDay(this.state.monthStartDay);
        this.props.fetchMonthStartDay('bortojac'); 
        this.props.handleMonthStartEdit();
    }

    handleChange(e) {
        this.setState({monthStartDay: e.target.value}); 
        //console.log(this.state.monthStartDay);
    }
    
    renderMonthStartString() {
        if([3,23].includes(this.props.monthStartDay)) {
            return `${this.props.monthStartDay}rd`;
        }
        else if([2,22].includes(this.props.monthStartDay)) {
            return `${this.props.monthStartDay}nd`;
        }
        else if([1,21].includes(this.props.monthStartDay)) {
            return `${this.props.monthStartDay}st`;
        }
        else {
            return `${this.props.monthStartDay}th`;
        }
    }

    renderMonthStartInput() {
        if(!this.props.monthStartEditFlag) {
        return (
            <p className="monthStartDayText">{this.renderMonthStartString()}</p>
        );
        }
    else {
            return (
                <div className="row2Col2InputContainer">
                    <input
                        className="monthStartDayInput"
                        type="number"
                        name="amount"
                        min="1"
                        max={28}
                        value={this.state.monthStartDay ? this.state.monthStartDay : this.props.monthStartDay}
                        onChange={this.handleChange}></input>

                    <a className="monthStartSubmitButton" onClick={this.handleMonthStartSubmit}>Submit</a>
                </div>
            );
        }
    }

    render() {
        return (
            <div className="monthStartDateTextContainer">
                <h3 className="monthStartDateTextHeader">Which day of the month should be the start of your monthly budget period?</h3>
                {this.renderMonthStartInput()}
            </div>
        );
    }
}

export default MonthStartDate;