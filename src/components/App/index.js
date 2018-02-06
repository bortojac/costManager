import { connect } from 'react-redux';
import App from './App';
import { fetchTableData, fetchCategoryData, fetchMonthlyData } from '@@store/actions';
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
    },
    fetchCategoryData: () => dispatch(fetchCategoryData()),
    fetchMonthlyData: () => dispatch(fetchMonthlyData())
  }
}

export default connect(mapStateToProps,
  mapDispatchToProps
)(App);
