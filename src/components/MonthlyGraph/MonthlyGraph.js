import React from 'react';
import './monthlyGraph.css';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {
    ResponsiveContainer,
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Bar
} from 'recharts';
import { PulseLoader } from 'react-spinners';

class MonthlyGraph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showMonths: 5
        };
        this.renderTooltip = this.renderTooltip.bind(this);
    }

    componentDidMount() {
        this.props.fetchMonthlyData();
    }

    renderTooltip(props) {
        const monthInterval = _.get(props, 'payload[0].payload.monthIntervalTooltip', 'default');
        const tooltipAmount = _.get(props, 'payload[0].payload.amount', 'default');
        const { active } = props;
        if (active) {
            return (
                <div className="customTooltip">
                    <p>{monthInterval}</p>
                    <p className="tooltipAmount">{`Amount: ${tooltipAmount.toLocaleString()}`}</p>
                </div>
            );
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

    renderGraph() {
        if (this.props.loading) {
            return (
                <section className="monthlyGraph">
                    <PulseLoader
                        color={'#ff0000'}
                        loading={this.props.loading}
                    />
                </section>
            )
        }
        else {
            return (
                // we set the width to 99% and a static height to help with responsiveness. issue 172 -> https://github.com/recharts/recharts/issues/172
                <section className="monthlyGraph">
                    <h2 className="monthlyGraphTitle">Cost by Month</h2>
                    <p className="monthlyGraphSubtitle">{`Beginning the ${this.renderMonthStartString()}`}</p>
                    <ResponsiveContainer width={'99%'} height={400}>
                        <BarChart data={_.takeRight(this.props.data, this.state.showMonths)}>
                            <CartesianGrid vertical={false} horizontal={false} fill={'#fff'} fillOpacity={.8} />
                            <XAxis dataKey="monthStartXAxis" />
                            <YAxis tickFormatter={tickItem => tickItem.toLocaleString()} />
                            <Tooltip content={this.renderTooltip} />
                            <Bar dataKey="amount" fill="#CC0000" fillOpacity={1} />
                        </BarChart>
                    </ResponsiveContainer>
                </section>
            )
        }
    }

    render() {
        return (
            this.renderGraph()
        )
    }
}

MonthlyGraph.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            amount: PropTypes.number.isRequired,
            monthStartInterval: PropTypes.string.isRequired,
        }).isRequired
    ),
    fetchMonthlyData: PropTypes.func.isRequired,
    monthStartDay: PropTypes.number,
    loading: PropTypes.bool.isRequired
}



export default MonthlyGraph;