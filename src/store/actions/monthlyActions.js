import {
    MONTHLY_DATA_RECEIVED,
    MONTHLY_DATA_REQUESTED
} from './types';
import { userId } from './userInfoActions';


export const monthlyDataRequested = (userId) => {
    return {
        type: MONTHLY_DATA_REQUESTED,
        loading: true,
        userId: userId
    };
};

export const monthlyDataReceived = (jsonResponse) => {
    return {
        type: MONTHLY_DATA_RECEIVED,
        loading: false,
        json: jsonResponse
    };
};

export const fetchMonthlyData = () => {
    return (dispatch) => {
        dispatch(monthlyDataRequested(userId));
        return fetch('/userBase/' + userId,
            {
                method: 'GET'
            }
        ).then(res => res.json())
            .then(jsonResponse => {
                return fetch('/expenseBase/' + userId + '/monthlyGraph',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            monthStartDay: jsonResponse.monthStartDay
                        })
                    })
            })
            .then(response => response.json())
            .then(jsonResponse => dispatch(monthlyDataReceived(jsonResponse)));
    };
};
