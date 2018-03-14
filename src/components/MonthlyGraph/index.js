import { connect } from 'react-redux';
import MonthlyGraph from './MonthlyGraph';
import {  fetchMonthlyData } from '@@store/actions';
import { getMonthlyDataState, getMonthlyLoadingFlag, getMonthStartDayState} from '@@store/selectors';

const mapStateToProps = state => {
    return {
        data: getMonthlyDataState(state),
        loading: getMonthlyLoadingFlag(state),
        monthStartDay: getMonthStartDayState(state)
    }; 
 };

const mapDispatchToProps = dispatch => {
  return {
        fetchMonthlyData: () => dispatch(fetchMonthlyData()),
    };
  };

export default connect(mapStateToProps,
  mapDispatchToProps
)(MonthlyGraph);
