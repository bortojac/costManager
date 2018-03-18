import { connect } from 'react-redux';
import NewExpense from './NewExpense';
import { saveExpense, fetchUserInfo, addUserCategory } from '@@store/actions';
import {
    getCategoriesState,
    getUserCategoriesState,
    getMonthStartDayState
} from '@@store/selectors';

const mapStateToProps = state => {
    return {
        categories: getCategoriesState(state),
        categoryOptions: getUserCategoriesState(state),
        monthStartDay: getMonthStartDayState(state)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        saveExpense: (date, category, amount, notes) => dispatch(saveExpense(date, category, amount, notes)),
        addUserCategory: (category) => dispatch(addUserCategory(category)),
        fetchUserInfo: () => dispatch(fetchUserInfo())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(NewExpense)