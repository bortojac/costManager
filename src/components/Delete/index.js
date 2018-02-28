import { connect } from 'react-redux';
import Delete from './Delete';
import { deleteEntries, deleteAll } from '@@store/actions';
import { 
    getCategoriesState, 
    //getSaveMessage,
    //getUpdatedCategories,
    getUserCategoriesState
} from '@@store/selectors';

// eventually we will need to pass props to NewExpense for the user-selected categories
const mapStateToProps = state => {
    //console.log(state)
    return {
        categories: getCategoriesState(state),
        //saveMessage: getSaveMessage(state),
        //updatedCategories: getUpdatedCategories(state),
        //categoryOptions: getUserCategoriesState(state),
        //monthStartDay: getMonthStartDayState(state)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        deleteEntries: (date, category, amount) => dispatch(deleteEntries(date, category, amount)),
        deleteAll: () => dispatch(deleteAll())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Delete)