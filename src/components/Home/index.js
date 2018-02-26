import { connect } from 'react-redux';
import Home from './Home';
import { fetchUserInfo } from '@@store/actions';
import { getTableLoadingFlag, 
  getTotalSumState,
  getMonthStartDayState
 } from '@@store/selectors';
 import _ from 'lodash';


const mapStateToProps = state => {
    console.log('Home');
    console.log(state);
    return {
    totalSum: getTotalSumState(state),
    tableLoading: getTableLoadingFlag(state),
    monthStartDay: getMonthStartDayState(state)
    }; 
 }

const mapDispatchToProps = dispatch => {
  return {
    //fetchTableData: () => {
     // dispatch(fetchTableData())
    //},
    fetchUserInfo: (userId) => dispatch(fetchUserInfo(userId)),
    //fetchMonthlyData: () => dispatch(fetchMonthlyData())
  }
}

export default connect(mapStateToProps,
  mapDispatchToProps
)(Home);