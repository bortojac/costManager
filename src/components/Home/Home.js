import React from 'react';
import Table from '../Table';
import CategoryGraph from '../CategoryGraph';
import PropTypes from 'prop-types';
import './home.css';
import MonthlyGraph from '../MonthlyGraph';
import _ from 'lodash';
import { PulseLoader } from 'react-spinners';

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchUserInfo();
    }

    renderHeader() {
        return (
            <h1>
                {this.props.totalSum ?
                    (
                        `You've Spent $${this.props.totalSum.toLocaleString()} this month`
                    )
                    :
                    (
                        this.props.loading ?
                            (
                                <PulseLoader color={'#ff0000'} loading={this.props.loading} />
                            )
                            :
                            (
                                'Start logging expenses!'
                            )
                    )
                }
            </h1>
        )
    }

    render() {
        return (
            <div className="homeContainer">
                <div className="row1">
                    {this.renderHeader()}
                </div>
                <div className="row2">
                    <CategoryGraph />
                    <MonthlyGraph monthStartDay={this.props.monthStartDay} />
                </div>
                <div className="row3">
                    <Table />
                </div>
            </div>
        )
    }
}

Home.propTypes = {
    totalSum: PropTypes.number,
    fetchUserInfo: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
}


export default Home;