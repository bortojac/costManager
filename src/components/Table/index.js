import { connect } from 'react-redux';
import Table from './Table';
//import { fetchTableData } from '@@store/actions';
import { getTableDataState, getTableLoadingFlag } from '@@store/selectors';


const mapStateToProps = state => { 
    //console.log(state);
    return {
        tableData: getTableDataState(state),
        tableLoading: getTableLoadingFlag(state)
    };

 }

export default connect(mapStateToProps)(Table);
