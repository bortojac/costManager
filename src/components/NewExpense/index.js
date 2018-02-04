import { connect } from 'react-redux';
import NewExpense from './NewExpense';
import { saveExpense } from '@@store/actions';
import { isExpenseSaved, getSaveMessage} from '@@store/selectors';

// eventually we will need to pass props to NewExpense for the user-selected categories
const mapStateToProps = state => ({
    saved: isExpenseSaved(state),
    saveMessage: getSaveMessage(state)
});

const mapDispatchToProps = dispatch => {
    return {
        saveExpense: (date, category, amount, notes) => {
            dispatch(saveExpense(date, category, amount, notes))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(NewExpense)