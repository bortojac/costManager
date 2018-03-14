import {
    USER_INFO_REQUESTED,
    USER_INFO_RECEIVED
} from './types';

export const apiURL = 'http://localhost:3000/expenseBase';
export const userId = 'bortojac';

export const userInfoRequested = () => {
    return {
        type: USER_INFO_REQUESTED,
        loading: true
    };
};

export const userInfoReceived = (jsonResponse) => {
    console.log(jsonResponse);
    return {
        type: USER_INFO_RECEIVED,
        loading: false,
        json: jsonResponse
    };
};

export const fetchUserInfo = () => {
    return dispatch => {
        console.log('userInfoRequested');
        dispatch(userInfoRequested());
        return fetch('/userBase/' + userId,
            {
                method: 'GET'
            })
            .then(response => response.json())
            .then(jsonResponse => dispatch(userInfoReceived(jsonResponse)));
    };
};
