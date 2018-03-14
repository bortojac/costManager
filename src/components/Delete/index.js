import { connect } from 'react-redux';
import Delete from './Delete';
import { deleteEntries, deleteAll } from '@@store/actions';
import { 
    getDBDataState
} from '@@store/selectors';

const mapStateToProps = state => {
    return {
        dbData: getDBDataState(state)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        deleteEntries: (date, category, amount, notes) => dispatch(deleteEntries(date, category, amount, notes)),
        deleteAll: () => dispatch(deleteAll())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Delete)