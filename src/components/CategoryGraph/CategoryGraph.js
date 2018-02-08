import React from 'react';
import './categoryGraph.css';
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


class CategoryGraph extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        //console.log('CategoryGraphData Below')
        //console.log(this.props.data);
        return (
            <ResponsiveContainer width={'50%'}>
                <BarChart data={this.props.data} >
                <CartesianGrid horizontal={false} vertical={false} fill={'#080606'} fillOpacity={.8}/>
                    <XAxis dataKey="category"/>
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="amount" fill="#CC0000" fillOpacity={.8}/>
                                    </BarChart>
            </ResponsiveContainer>
        )
    }
}

export default CategoryGraph;