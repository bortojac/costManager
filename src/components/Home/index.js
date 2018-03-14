import { connect } from 'react-redux';
import Home from './Home';
import { fetchUserInfo } from '@@store/actions';
import { 
  getTotalSumState,
  getMonthStartDayState,
  getMonthlyLoadingFlag
 } from '@@store/selectors';
 import _ from 'lodash';


const mapStateToProps = state => {
    return {
    totalSum: getTotalSumState(state),
    loading: getMonthlyLoadingFlag(state),
    monthStartDay: getMonthStartDayState(state)
    }; 
 }

const mapDispatchToProps = dispatch => {
  return {
    fetchUserInfo: (userId) => dispatch(fetchUserInfo(userId))
  }
}

export default connect(mapStateToProps,
  mapDispatchToProps
)(Home);