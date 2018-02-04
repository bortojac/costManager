import {
    TABLE_DATA_REQUESTED,
    TABLE_DATA_RECEIVED,
    SAVE_NEEDED,
    SAVE_FINISHED
} from './types';

const apiURL = 'http://localhost:3000/expenseBase';

export const tableDataRequested = () => {
    return {
        type: TABLE_DATA_REQUESTED,
        loading: true
    };
}

export const tableDataReceived = (jsonResponse) => {
    console.log('received');
    //console.log(jsonResponse);
    return {
        type: TABLE_DATA_RECEIVED,
        loading: false,
        json: jsonResponse
    };
}

// we need a fetchData action that can be called in the componentWillMount method in the Table component
export const fetchTableData = () => {
    return dispatch => {
        dispatch(tableDataRequested());
        return fetch(apiURL,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
              }
        })
        .then(response => response.json())
        .then(jsonResponse => dispatch(tableDataReceived(jsonResponse)));
    };
}


export const saveNeeded = () => {
    return {
            type: SAVE_NEEDED,
            pending: true
    };
}

export const saveFinished = (responseMessage) => {
    console.log('saved');
    //console.log(jsonResponse);
    return {
            type: SAVE_FINISHED,
            pending: false,
            message: responseMessage 
    };
}

// POST request to save expense to database
export const saveExpense = (date, category, amount, notes) => {
    return dispatch => {
        dispatch(saveNeeded());
        return fetch(apiURL, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                date: date,
            category: category,
            amount: amount,
        notes: notes       
    })
            })
        .then(response => response.text())
        .then(textReponse => {
            dispatch(saveFinished(textReponse));
            dispatch(fetchTableData());
        });
    };

}
