import { connect } from 'react-redux';
import Home from './Home';
//import { fetchTableData, fetchCategoryData, fetchMonthlyData } from '@@store/actions';
import { getTableLoadingFlag, 
  getTotalSumState
 } from '@@store/selectors';
 import _ from 'lodash';


const mapStateToProps = state => {
    console.log('Home');
    console.log(state);
    return {
    totalSum: getTotalSumState(state),
    tableLoading: getTableLoadingFlag(state)
    }; 
 }

const mapDispatchToProps = dispatch => {
  return {
    //fetchTableData: () => {
     // dispatch(fetchTableData())
    //},
    //fetchCategoryData: () => dispatch(fetchCategoryData()),
    //fetchMonthlyData: () => dispatch(fetchMonthlyData())
  }
}

export default connect(mapStateToProps//,
  //mapDispatchToProps
)(Home);