import { connect } from 'react-redux';
import App from './App';
import { fetchTableData } from '@@store/actions';
import { getTableLoadingFlag } from '@@store/selectors';


const mapStateToProps = state => {
    console.log(state);
    return {
    //tableData: getTableDataState(state),
    tableLoading: getTableLoadingFlag(state)
    }; 
 }

const mapDispatchToProps = dispatch => {
  return {
    fetchTableData: () => {
      dispatch(fetchTableData())
    }
  }
}

export default connect(mapStateToProps,
  mapDispatchToProps
)(App);
