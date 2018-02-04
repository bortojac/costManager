import React from 'react';
import './table.css';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import _ from 'lodash';

class Table extends React.Component {
    constructor(props) {
        super(props);
        //this.props.fetchTableData();
    }

    render() {
       let tableDat =_.get(this.props,'tableData', [{date: [], category: [], amount: [], notes: []}]);
       console.log(tableDat);
        return (
            <div >
                <ReactTable
                    data={tableDat}
                    columns={[
                        {
                            Header: "Expenses in Database",
                            columns: [
                                {
                                    Header: "Date",
                                    accessor: "date"
                                },
                                {
                                    Header: "Category",
                                    accessor: "category"
                                },
                                {
                                    Header: "Amount",
                                    accessor: "amount" 
                                },
                                {
                                    Header: "Notes",
                                    accessor: "notes" 
                                }

                            ]}
                            ]
                        }
                    defaultPageSize={10}
                    className="-striped -highlight"
                />
            </div>
        )
    }
}

Table.propTypes = {
    tableData: PropTypes.arrayOf(
        PropTypes.shape({
            date: PropTypes.date,
            category: PropTypes.string,
            amount: PropTypes.number,
            notes: PropTypes.string
        }).isRequired
    )
}

export default Table;