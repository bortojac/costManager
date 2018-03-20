import {
    SAVE_NEEDED,
    SAVE_FINISHED
} from './types';
import { fetchCategoryData } from './categoryActions';
import { fetchTableData } from './tableActions';
import { fetchMonthlyData } from './monthlyActions';
import { userId, fetchUserInfo } from './userInfoActions';


export const saveNeeded = () => {
    return {
        type: SAVE_NEEDED,
        pending: true
    };
};

export const saveFinished = (responseMessage) => {
    return {
        type: SAVE_FINISHED,
        pending: false,
        message: responseMessage
    };
};

// POST request to save expense to database
export const saveExpense = (date, category, amount, notes, monthStartDay) => {
    return dispatch => {
        dispatch(saveNeeded());
        return fetch('/expenseBase/' + userId, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                date: date,
                category: category,
                amount: amount,
                notes: notes,
                monthStartDay: monthStartDay
            })
        })
            .then(response => response.text())
            .then(textReponse => {
                dispatch(saveFinished(textReponse));
                dispatch(fetchTableData());
                dispatch(fetchCategoryData());
                dispatch(fetchMonthlyData());
            });
    };
};