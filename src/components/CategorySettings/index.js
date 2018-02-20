import { connect } from 'react-redux';
import CategorySettings from './CategorySettings';
import { updateCategories } from '@@store/actions';
import { getCategoriesState
 } from '@@store/selectors';
 import _ from 'lodash';


const mapStateToProps = state => {
    console.log("categorySettings");
    console.log(state);
    return {
    categories: getCategoriesState(state)
    }; 
 }

const mapDispatchToProps = dispatch => {
  return {
    updateCategories: (newCategories) => {
      dispatch(updateCategories(newCategories))
    }
  }
}

export default connect(mapStateToProps,
  mapDispatchToProps
)(CategorySettings);