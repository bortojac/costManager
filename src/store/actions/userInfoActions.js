import {
    USER_INFO_REQUESTED,
    USER_INFO_RECEIVED
} from './types';

export const userId = 'bortojac';

export const userInfoRequested = () => {
    return {
        type: USER_INFO_REQUESTED,
        loading: true
    };
};

export const userInfoReceived = (jsonResponse) => {
    return {
        type: USER_INFO_RECEIVED,
        loading: false,
        json: jsonResponse
    };
};

export const fetchUserInfo = () => {
    return dispatch => {
        dispatch(userInfoRequested());
        return fetch('/userBase/' + userId,
            {
                method: 'GET'
            })
            .then(response => response.json())
            .then(jsonResponse => dispatch(userInfoReceived(jsonResponse)));
    };
};
