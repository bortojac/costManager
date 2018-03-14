import {
    TABLE_DATA_REQUESTED,
    TABLE_DATA_RECEIVED
} from './types';
import { apiURL, userId } from './userInfoActions';


export const tableDataRequested = () => {
    return {
        type: TABLE_DATA_REQUESTED,
        loading: true
    };
};

export const tableDataReceived = (jsonResponse) => {
    return {
        type: TABLE_DATA_RECEIVED,
        loading: false,
        json: jsonResponse
    };
};

export const fetchTableData = () => {
    return dispatch => {
        dispatch(tableDataRequested());
        return fetch(apiURL + '/' + userId,
            {
                method: 'GET'
            })
            .then(response => response.json())
            .then(jsonResponse => dispatch(tableDataReceived(jsonResponse)));
    };
};