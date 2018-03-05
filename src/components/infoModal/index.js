import { connect } from 'react-redux';
import InfoModal from './InfoModal';
import {  } from '@@store/actions';
import { } from '@@store/selectors';


const mapStateToProps = state => {
    return {
        //data: getCategoryDataState(state),
        //loading: getCategoryLoadingFlag(state)
    }; 
 }

const mapDispatchToProps = dispatch => {
  return {
        //fetchCategoryData: () => dispatch(fetchCategoryData()),
    };
  }

export default connect(mapStateToProps,
 mapDispatchToProps
)(InfoModal);
