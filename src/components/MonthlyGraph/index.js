import { connect } from 'react-redux';
import MonthlyGraph from './MonthlyGraph';
import {  } from '@@store/actions';
import { getMonthlyData, getMonthlyLoadingFlag} from '@@store/selectors';


const mapStateToProps = state => {
    return {
        data: getMonthlyData(state),
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
