import { connect } from 'react-redux';
import MonthStartDate from './MonthStartDate';
import { updateMonthStartDay, fetchUserInfo } from '@@store/actions';
import {
  getMonthStartDayState
} from '@@store/selectors';
import _ from 'lodash';


const mapStateToProps = state => {
  return {
    monthStartDay: getMonthStartDayState(state),
  };
}

const mapDispatchToProps = dispatch => {
  return {
    updateMonthStartDay: (monthStartDay) => {
      dispatch(updateMonthStartDay(monthStartDay))
    },
    fetchMonthStartDay: (userId) => {
      dispatch(fetchUserInfo(userId))
    }
  }
}

export default connect(mapStateToProps,
  mapDispatchToProps
)(MonthStartDate);