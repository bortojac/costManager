import { connect } from 'react-redux';
import Delete from './Delete';
import { deleteEntries, deleteAll, fetchCategoryData } from '@@store/actions';
import { 
    getCategoriesState, 
    //getSaveMessage,
    //getUpdatedCategories,
    //getUserCategoriesState,
    getDeleteMessage,
    getDeleteBool,
    getDBDataState
} from '@@store/selectors';

// eventually we will need to pass props to NewExpense for the user-selected categories
const mapStateToProps = state => {
    //console.log(state)
    return {
        categories: getCategoriesState(state),
        deleteMessage: getDeleteMessage(state),
        deleteBool: getDeleteBool(state),
        dbData: getDBDataState(state)
        //saveMessage: getSaveMessage(state),
        //updatedCategories: getUpdatedCategories(state),
        //categoryOptions: getUserCategoriesState(state),
        //monthStartDay: getMonthStartDayState(state)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        deleteEntries: (date, category, amount, notes) => dispatch(deleteEntries(date, category, amount, notes)),
        deleteAll: () => dispatch(deleteAll())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Delete)