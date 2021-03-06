import { connect } from 'react-redux';
import Table from './Table';
import { fetchTableData } from '@@store/actions';
import { getTableDataState, getTableLoadingFlag } from '@@store/selectors';

const mapStateToProps = state => {
    return {
        tableData: getTableDataState(state),
        tableLoading: getTableLoadingFlag(state)
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchTableData: () => dispatch(fetchTableData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);
