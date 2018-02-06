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
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="amount" fill="#8884d8" />
                                    </BarChart>
            </ResponsiveContainer>
        )
    }
}

export default MonthlyGraph;