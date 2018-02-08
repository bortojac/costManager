import { connect } from 'react-redux';
import MonthlyGraph from './MonthlyGraph';
import {  } from '@@store/actions';
import { getMonthlyDataState, getMonthlyLoadingFlag} from '@@store/selectors';


const mapStateToProps = state => {
  console.log(state);
    return {
        data: getMonthlyDataState(state),
        loading: getMonthlyLoadingFlag(state)
    }; 
 }

/*const mapDispatchToProps = dispatch => {
  return {
    };
  }*/

export default connect(mapStateToProps,
 // mapDispatchToProps
)(MonthlyGraph);
