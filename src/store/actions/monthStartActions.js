import {
    UPDATE_MONTH_START_DAY_FINISHED,
    UPDATE_MONTH_START_DAY_REQUESTED
} from './types';
import { apiURL, userId } from './userInfoActions';

export const updateMonthStartDayRequested = (monthStartDay) => {
    return {
        type: UPDATE_MONTH_START_DAY_REQUESTED,
        fetching: true,
        monthStartDay: monthStartDay
    };
};

export const updateMonthStartDayFinished = () => {
    return {
        type: UPDATE_MONTH_START_DAY_FINISHED,
        fetching: false
    };
};

export const updateMonthStartDay = (monthStartDay) => {
    return dispatch => {
        dispatch(updateMonthStartDayRequested(monthStartDay))
        return fetch('/userBase/' + userId + '/monthStartDay', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                monthStartDay: monthStartDay
            })
        }).then(() => {
            dispatch(updateMonthStartDayFinished());
        })
    };
};