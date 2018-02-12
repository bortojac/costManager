import React from 'react';
import Table from '../Table';
import CategoryGraph from '../CategoryGraph';
import './home.css';
import MonthlyGraph from '../MonthlyGraph';


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.props.fetchTableData();
        this.props.fetchCategoryData();
        this.props.fetchMonthlyData();
    }

    render() {
        return (
            <div className="homeContainer">
                <div className="row1">
                    <h1>{`You've Spent $${this.props.totalSum.toLocaleString()} this month`}</h1>
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