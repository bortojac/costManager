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
        super(props)
        this.state = {
            showMonths: 5
        }
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

    render() {
        //console.log('MonthlyGraphData Below')
        
        console.log(this.props.monthStartDay);
        // we set the width to 99% and a static height to help with responsiveness. issue 172 -> https://github.com/recharts/recharts/issues/172
        return (
            <section className="monthlyGraph">
            <h2 className="monthlyGraphTitle">Cost by Month</h2>
            <ResponsiveContainer width={'99%'} height={400}>
                <BarChart data={_.takeRight(this.props.data, this.state.showMonths) }>
                    <CartesianGrid vertical={false} horizontal={false} fill={'#fff'} fillOpacity={.8}/>
                    <XAxis dataKey="monthStartInterval" />
                    <YAxis tickFormatter={tickItem => tickItem.toLocaleString()}/>
                    <Tooltip formatter={value => value.toLocaleString()}/>
                    <Bar dataKey="amount" fill="#CC0000" fillOpacity={.7} />
                                    </BarChart>
            </ResponsiveContainer>
            </section>
        )
    }
}

export default MonthlyGraph;