import { connect } from 'react-redux';
import App from './App';
import { fetchTableData, fetchCategoryData, fetchMonthlyData } from '@@store/actions';
import { getTableLoadingFlag, 
  getTotalSumState
 } from '@@store/selectors';
 import _ from 'lodash';


const mapStateToProps = state => {
    console.log(state);
    console.log(_.sum(_.map(state.categoryData.json, item => item.amount)));
    return {
    totalSum: getTotalSumState(state),
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