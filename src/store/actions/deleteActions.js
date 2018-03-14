import {
    DELETE_ALL_FINISHED,
    DELETE_ALL_REQUESTED,
    DELETE_ENTRIES_FINISHED,
    DELETE_ENTRIES_REQUESTED
} from './types';
import { fetchCategoryData } from './categoryActions';
import { fetchMonthlyData } from './monthlyActions';
import { apiURL, userId } from './userInfoActions';

export const deleteAllRequested = () => {
    return {
        type: DELETE_ALL_REQUESTED,
        deleted: true
    };
};

export const deleteAllFinished = (textResponse) => {
    return {
        type: DELETE_ALL_FINISHED,
        deleted: false,
        textResponse: textResponse
    };
};

export const deleteAll = () => {
    return dispatch => {
        dispatch(deleteAllRequested())
        return fetch(apiURL + '/' + userId + '/deleteAll', {
            method: 'delete'
        })
            .then(response => response.text())
            .then(textResponse => {
                dispatch(deleteAllFinished(textResponse));
                dispatch(fetchCategoryData());
                dispatch(fetchMonthlyData());
            })
    };
};

export const deleteEntriesRequested = () => {
    return {
        type: DELETE_ENTRIES_REQUESTED,
        deleted: true
    };
};

export const deleteEntriesFinished = (textResponse) => {
    return {
        type: DELETE_ENTRIES_FINISHED,
        deleted: false,
        textResponse: textResponse
    };
};

export const deleteEntries = (date, category, amount, notes) => {
    return dispatch => {
        dispatch(deleteEntriesRequested())
        return fetch(`${apiURL}/${userId}/deleteEntries/`,
            {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: userId,
                    date: date,
                    category: category,
                    amount: amount,
                    notes: notes
                })
            })
            .then(response => response.text())
            .then(textResponse => {
                dispatch(deleteEntriesFinished(textResponse));
                dispatch(fetchCategoryData());
            })
    };
        };