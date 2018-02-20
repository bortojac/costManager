import { connect } from 'react-redux';
import MonthlyGraph from './MonthlyGraph';
import {  fetchMonthlyData, fetchUserInfo } from '@@store/actions';
import { getMonthlyDataState, getMonthlyLoadingFlag, getMonthStartDayState} from '@@store/selectors';


const mapStateToProps = state => {
  console.log('monthlyDataStateBelow');
  console.log(state);
    return {
        data: getMonthlyDataState(state),
        loading: getMonthlyLoadingFlag(state),
        monthStartDay: getMonthStartDayState(state)
    }; 
 };

const mapDispatchToProps = dispatch => {
  //console.log('dispatchToPropsRunning');
  return {
        fetchMonthlyData: () => dispatch(fetchMonthlyData()),
        //fetchMonthStartDay: (userId) => dispatch(fetchUserInfo(userId))
    };
  };

export default connect(mapStateToProps,
  mapDispatchToProps
)(MonthlyGraph);
