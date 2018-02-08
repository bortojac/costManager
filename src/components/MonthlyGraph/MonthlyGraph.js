import React from 'react';
import './monthlyGraph.css';
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
    }

    render() {
        console.log('MonthlyGraphData Below')
        console.log(this.props.data);
        return (
            <ResponsiveContainer width={'50%'}>
                <BarChart data={this.props.data}>
                    <CartesianGrid vertical={false} horizontal={false} fill={'#080606'} fillOpacity={.8}/>
                    <XAxis dataKey="monthYear" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="amount" fill="#CC0000" fillOpacity={.8} />
                                    </BarChart>
            </ResponsiveContainer>
        )
    }
}

export default MonthlyGraph;