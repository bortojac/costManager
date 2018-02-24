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
        super(props);
        this.renderTooltip = this.renderTooltip.bind(this);
    }

    componentDidMount() {
        this.props.fetchCategoryData();
    }

    renderTooltip(props) {
        //console.log(payload);
        //console.log(_.get(props, 'payload[0].payload', 'default'));
        const tooltipCategory = _.get(props, 'payload[0].payload.category', 'default');
        const tooltipAmount = _.get(props, 'payload[0].payload.amount', 'default');
        const { active } = props;
        if (active) {
            return (
                <div className="customTooltip">
                    <p>{tooltipCategory}</p>
                    <p className="tooltipAmount">{`Amount: ${tooltipAmount.toLocaleString()}`}</p>
                </div>
            );
        }
    }


    render() {
        // we set the width to 99% and a static height to help with responsiveness. issue 172 -> https://github.com/recharts/recharts/issues/172
        return (
            <section className="categoryGraph">
            <h2 className="categoryGraphTitle">Cost by Category</h2>
            <ResponsiveContainer width={'99%'} height={400}> 
                <BarChart data={this.props.data} >
                <CartesianGrid horizontal={false} vertical={false} fill={'#fff'} fillOpacity={.8}/>
                    <XAxis dataKey="category"/>
                    <YAxis tickFormatter={tickItem => tickItem.toLocaleString()}/>
                    <Tooltip content={this.renderTooltip}/>
                    <Bar dataKey="amount" fill="#CC0000" fillOpacity={1}/>
                                    </BarChart>
            </ResponsiveContainer>
            </section>
        )
    }
}

export default CategoryGraph;