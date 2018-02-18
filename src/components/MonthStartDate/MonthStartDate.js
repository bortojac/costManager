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
  
    componentWillMount() {
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
        console.log(this.state.monthStartDay);
    }
    
    renderMonthStartInput() {
        if(!this.props.monthStartEditFlag) {
        return (
            <p>{this.props.monthStartDay}</p>
        );
        }
    else {
            return (
                <div>
                    <input
                        className="monthStartDayInput"
                        type="number"
                        name="amount"
                        min="1"
                        max={`${moment().endOf('month').format('DD')}`}
                        value={this.state.monthStartDay ? this.state.monthStartDay : this.props.monthStartDay}
                        onChange={this.handleChange}></input>

                    <a className="monthStartSubmitButton" onClick={this.handleMonthStartSubmit}>Submit</a>
                </div>
            );
        }
    }

    render() {
        return <div>{this.renderMonthStartInput()}</div>
    }
}

export default MonthStartDate;