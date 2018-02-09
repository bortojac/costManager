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
        // we set the width to 99% and a static height to help with responsiveness. issue 172 -> https://github.com/recharts/recharts/issues/172
        return (
            <section className="graph2">
            <ResponsiveContainer width={'99%'} height={400}> 
                <BarChart data={this.props.data} >
                <CartesianGrid horizontal={false} vertical={false} fill={'#fff'} fillOpacity={.8}/>
                    <XAxis dataKey="category"/>
                    <YAxis tickFormatter={tickItem => tickItem.toLocaleString()}/>
                    <Tooltip formatter={value => value.toLocaleString()}/>
                    <Bar dataKey="amount" fill="#CC0000" fillOpacity={.7}/>
                                    </BarChart>
            </ResponsiveContainer>
            </section>
        )
    }
}

export default CategoryGraph;