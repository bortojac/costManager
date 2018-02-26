import { connect } from 'react-redux';
import NewExpense from './NewExpense';
import { saveExpense, fetchUserInfo, addUserCategory } from '@@store/actions';
import { 
    getCategoriesState, 
    getSaveMessage,
    getUpdatedCategories,
    getMonthStartDayState
} from '@@store/selectors';
import { getUserCategoriesState } from '../../store/selectors';

// eventually we will need to pass props to NewExpense for the user-selected categories
const mapStateToProps = state => {
    //console.log(state)
    return {
        categories: getCategoriesState(state),
        saveMessage: getSaveMessage(state),
        updatedCategories: getUpdatedCategories(state),
        categoryOptions: getUserCategoriesState(state),
        monthStartDay: getMonthStartDayState(state)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        saveExpense: (date, category, amount, notes//,
             //monthStartDay
            ) => {
            dispatch(saveExpense(date, category, amount, notes//, 
                //monthStartDay
            ))
        },
        addUserCategory: (category) => dispatch(addUserCategory(category)),
        fetchUserInfo: () => dispatch(fetchUserInfo())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(NewExpense)