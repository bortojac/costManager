import React from 'react';
import './monthlyGraph.css';
import _ from 'lodash';
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


class MonthlyGraph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showMonths: 5
        };
        this.renderTooltip = this.renderTooltip.bind(this);
    }

    componentDidMount() {
        //this.props.fetchMonthStartDay('bortojac');
        console.log('monthlyGraphComponentDidMount');
        this.props.fetchMonthlyData('bortojac');

        //console.log('monthlyGraphComponentMethod');
        //console.log(this.props.monthStartDay);
        //console.log(this.nextProps);
        /*if(this.props.monthStartDay) {
            console.log(`the monthStartDay is ${this.props.monthStartDay}`);
            this.props.fetchMonthlyData(this.props.monthStartDay);
        }*/
    }

    renderTooltip(props) {
        //console.log(payload);
        //console.log(_.get(props, 'payload[0].payload', 'default'));
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

    render() {
        //console.log('MonthlyGraphData Below')
        
        console.log(this.props.monthStartDay);
        // we set the width to 99% and a static height to help with responsiveness. issue 172 -> https://github.com/recharts/recharts/issues/172
        return (
            <section className="monthlyGraph">
            <h2 className="monthlyGraphTitle">Cost by Month</h2>
            <p className="monthlyGraphSubtitle">{`Beginning the ${this.renderMonthStartString()}`}</p>
            <ResponsiveContainer width={'99%'} height={400}>
                <BarChart data={_.takeRight(this.props.data, this.state.showMonths) }>
                    <CartesianGrid vertical={false} horizontal={false} fill={'#fff'} fillOpacity={.8}/>
                    <XAxis dataKey="monthStartXAxis" />
                    <YAxis tickFormatter={tickItem => tickItem.toLocaleString()}/>
                    <Tooltip content={this.renderTooltip} />
                    <Bar dataKey="amount" fill="#CC0000" fillOpacity={1} />
                </BarChart>
            </ResponsiveContainer>
            </section>
        )
    }
}

export default MonthlyGraph;