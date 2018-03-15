import React from 'react';
import './monthStartDate.css';
import moment from 'moment';
import _ from 'lodash';
import PropTypes from 'prop-types';

class MonthStartDate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            monthStartDay: this.props.monthStartDay,
            disableSubmit: false
        };
        this.handleMonthStartSubmit = this.handleMonthStartSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this);
    }
    
    componentDidMount() {
        this.props.fetchMonthStartDay();
    }

    handleMonthStartSubmit() {
        if(this.state.disableSubmit) {
            return
        }
        this.props.updateMonthStartDay(this.state.monthStartDay);
        this.props.fetchMonthStartDay();
        this.props.handleMonthStartEdit();
    }

    handleChange(e) {

        this.setState({
            monthStartDay: e.target.value
        })

        // disable the submit button if the value is greater than 28 or blank
        if(e.target.value <= 28 && e.target.value) {
            this.setState({
                disableSubmit: false
             });
        } 
        else {
           this.setState({
               disableSubmit: true
           })
        }
    }

    renderMonthStartString() {
        if ([3, 23].includes(this.props.monthStartDay)) {
            return `${this.props.monthStartDay}rd`;
        }
        else if ([2, 22].includes(this.props.monthStartDay)) {
            return `${this.props.monthStartDay}nd`;
        }
        else if ([1, 21].includes(this.props.monthStartDay)) {
            return `${this.props.monthStartDay}st`;
        }
        else {
            return `${this.props.monthStartDay}th`;
        }
    }

    renderMonthStartInput() {
        if (!this.props.monthStartEditFlag) {
            return (
                <p className="monthStartDayText">{this.renderMonthStartString()}</p>
            );
        }
        else {
            console.log(this.state.monthStartDay);
            return (
                <div className="row2Col2InputContainer">
                    <input
                        className="monthStartDayInput"
                        type="number"
                        name="amount"
                        onChange={this.handleChange}
                        min={0}
                        max={28}
                        value={this.state.monthStartDay}
            ></input>
                    <a className= {this.state.disableSubmit ? "monthStartSubmitButton disabled" : "monthStartSubmitButton"} onClick={this.handleMonthStartSubmit}>Submit</a>
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

MonthStartDate.propTypes = {
    monthStartDay: PropTypes.number,
    fetchMonthStartDay: PropTypes.func.isRequired,
    updateMonthStartDay: PropTypes.func.isRequired,
    handleMonthStartEdit: PropTypes.func.isRequired
}

export default MonthStartDate;