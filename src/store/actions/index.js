import {
    TABLE_DATA_REQUESTED,
    TABLE_DATA_RECEIVED,
    SAVE_NEEDED,
    SAVE_FINISHED,
    CATEGORY_DATA_RECEIVED,
    CATEGORY_DATA_REQUESTED,
    MONTHLY_DATA_RECEIVED,
    MONTHLY_DATA_REQUESTED,
    UPDATE_CATEGORIES_FINISHED,
    UPDATE_CATEGORIES_REQUESTED
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
            dispatch(fetchCategoryData());
            dispatch(fetchMonthlyData());
        });
    };

}

export const categoryDataRequested = () => {
    return {
        type: CATEGORY_DATA_REQUESTED,
        loading: true
    };
}

export const categoryDataReceived = (jsonResponse) => {
    console.log('categoryDataReceived');
    return {
        type: CATEGORY_DATA_RECEIVED,
        loading: false,
        json: jsonResponse
    };
}

export const fetchCategoryData = () => {
    return dispatch => {
        dispatch(categoryDataRequested());
        return fetch(apiURL+'/categoryGraph',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
              }
        })
        .then(response => response.json())
        .then(jsonResponse => dispatch(categoryDataReceived(jsonResponse)));
    };
}

export const monthlyDataRequested = () => {
    return {
        type: MONTHLY_DATA_REQUESTED,
        loading: true
    };
}

export const monthlyDataReceived = (jsonResponse) => {
    return {
        type: MONTHLY_DATA_RECEIVED,
        loading: false,
        json: jsonResponse
    };
}

export const fetchMonthlyData = () => {
    return dispatch => {
        dispatch(monthlyDataRequested());
        return fetch(apiURL+'/monthlyGraph',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
              }
        })
        .then(response => response.json())
        .then(jsonResponse => dispatch(monthlyDataReceived(jsonResponse)));
    };
}

export const updateCategoriesRequested = (newCategories) => {
    return {
        type: UPDATE_CATEGORIES_REQUESTED,
        fetching: true,
        newCategories: newCategories
    }
}

export const updateCategoriesFinished = () => {
    return {
        type: UPDATE_CATEGORIES_FINISHED,
        fetching: false
    }
}

export const updateCategories = (newCategories) => {
    return dispatch => {
        dispatch(updateCategoriesRequested(newCategories))
        return fetch(apiURL+'/newCategories', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                newCategories: newCategories
    })}).then(dispatch(updateCategoriesFinished()))
        }
    }