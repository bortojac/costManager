import { connect } from 'react-redux';
import CategoryGraph from './CategoryGraph';
import { fetchCategoryData } from '@@store/actions';
import { getCategoryData, getCategoryLoadingFlag} from '@@store/selectors';


const mapStateToProps = state => {
    return {
        data: getCategoryData(state),
        loading: getCategoryLoadingFlag(state)
    }; 
 }

const mapDispatchToProps = dispatch => {
  return {
        fetchCategoryData: () => dispatch(fetchCategoryData()),
    };
  }

export default connect(mapStateToProps,
 mapDispatchToProps
)(CategoryGraph);
