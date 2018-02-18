import React from 'react';
import Table from '../Table';
import CategoryGraph from '../CategoryGraph';
import './home.css';
import MonthlyGraph from '../MonthlyGraph';
import _ from 'lodash';


class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.totalSum);
        return (
            <div className="homeContainer">
                <div className="row1">
                    <h1>{this.props.totalSum ? `You've Spent $${this.props.totalSum.toLocaleString()} this month`:
                'Loading...'}</h1>
                </div>
                <div className="row2">
                    <CategoryGraph />
                    <MonthlyGraph />
                </div>
                <div className="row3">
                    <Table />
                </div>
            </div>
        )
    }
}

export default Home;