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
    UPDATE_CATEGORIES_REQUESTED,
    DELETE_ALL_FINISHED,
    DELETE_ALL_REQUESTED,
    USER_INFO_REQUESTED,
    USER_INFO_RECEIVED,
    UPDATE_MONTH_START_DAY_FINISHED,
    UPDATE_MONTH_START_DAY_REQUESTED,
    ADD_USER_CATEGORY_REQUESTED,
    ADD_USER_CATEGORY_FINISHED,
    UPDATE_USER_CATEGORIES_FINISHED,
    UPDATE_USER_CATEGORIES_REQUESTED,
    DELETE_ENTRIES_FINISHED,
    DELETE_ENTRIES_REQUESTED
} from './types';


const apiURL = 'http://localhost:3000/expenseBase';
const userId = 'bortojac';

export const tableDataRequested = () => {
    return {
        type: TABLE_DATA_REQUESTED,
        loading: true
    };
};

export const tableDataReceived = (jsonResponse) => {
    //console.log('received');
    //console.log(jsonResponse);
    return {
        type: TABLE_DATA_RECEIVED,
        loading: false,
        json: jsonResponse
    };
};

export const fetchTableData = () => {
    return dispatch => {
        dispatch(tableDataRequested());
        return fetch(apiURL+'/'+userId,
            {
                method: 'GET'
        })
        .then(response => response.json())
        .then(jsonResponse => dispatch(tableDataReceived(jsonResponse)));
    };
};


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
        console.log('saveExpenseAction');
        console.log(date);
        return fetch(apiURL+'/'+userId, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
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

export const categoryDataRequested = () => {
    return {
        type: CATEGORY_DATA_REQUESTED,
        loading: true
    };
};

export const categoryDataReceived = (jsonResponse) => {
    //console.log('categoryDataReceived');
    //console.log(jsonResponse);
    return {
        type: CATEGORY_DATA_RECEIVED,
        loading: false,
        json: jsonResponse
    };
};

export const fetchCategoryData = () => {
    return dispatch => {
        dispatch(categoryDataRequested());
        return fetch(apiURL+'/'+userId+'/categoryGraph',
            {
                method: 'GET'
        })
        .then(response => response.json())
        .then(jsonResponse => dispatch(categoryDataReceived(jsonResponse)));
    };
};

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
    console.log('fetching MonthlyData');
    console.log(userId);
    return (dispatch) => {
       //let monthStartDay = getState().userInfo.json.monthStartDay; // make sure that userInfo is fetched before monthlyData
       ///console.log(monthStartDay);
        dispatch(monthlyDataRequested(userId));
        return fetch('/userBase/' + userId,
            {
                method: 'GET'
            }
        ).then(res => res.json())
         .then(jsonResponse => {
                console.log('monthlyDataFetchResponseBelow');
                console.log(jsonResponse);
                return fetch(apiURL + '/' + userId + '/monthlyGraph',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            monthStartDay: jsonResponse.monthStartDay
                            //monthStartDay: monthStartDay
                        })
                    })
            })
            .then(response => response.json())
            .then(jsonResponse => dispatch(monthlyDataReceived(jsonResponse)));
    };
};

export const updateCategoriesRequested = (newCategories) => {
    return {
        type: UPDATE_CATEGORIES_REQUESTED,
        fetching: true,
        newCategories: newCategories
    };
};

export const updateCategoriesFinished = () => {
    return {
        type: UPDATE_CATEGORIES_FINISHED,
        fetching: false
    };
};

export const updateCategories = (newCategories) => {
    return dispatch => {
        dispatch(updateCategoriesRequested(newCategories))
        return fetch(apiURL+'/'+userId+'/newCategories', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                newCategories: newCategories
    })}).then(() =>dispatch(updateCategoriesFinished()))
        };
    };

    export const addUserCategoryRequested = (newCategory) => {
        return {
            type: ADD_USER_CATEGORY_REQUESTED,
            fetching: true,
            newCategory: newCategory        
        };
    };
    
    export const addUserCategoryFinished = () => {
        return {
            type: ADD_USER_CATEGORY_FINISHED,
            fetching: false
        };
    };
    
    export const addUserCategory = (newCategory) => {
        return dispatch => {
            dispatch(addUserCategoryRequested(newCategory))
            return fetch('/userBase/'+userId+'/addCategory', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    category: newCategory
        })}).then(dispatch(addUserCategoryFinished()))
            };
        };

        export const updateUserCategoriesRequested = (newCategories) => {
            return {
                type: UPDATE_USER_CATEGORIES_REQUESTED,
                fetching: true,
                newCategories: newCategories      
            };
        };
        
        export const updateUserCategoriesFinished = () => {
            return {
                type: UPDATE_USER_CATEGORIES_FINISHED,
                fetching: false
            };
        };
        
        export const updateUserCategories = (newCategories) => {
            return dispatch => {
                dispatch(updateUserCategoriesRequested(newCategories))
                return fetch('/userBase/'+userId+'/categories', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        newCategories: newCategories
            })}).then(() => {
                dispatch(updateUserCategoriesFinished());
                  })
                };
            };

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
            return fetch(apiURL+'/'+userId+'/deleteAll', {
                method: 'delete'
        })
        .then(response => response.text())
        .then(textResponse => dispatch(deleteAllFinished(textResponse)))
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
        
        export const deleteEntries = (date, category, amount) => {
            return dispatch => {
                dispatch(deleteEntriesRequested())
                return fetch(`${apiURL}/${userId}/deleteEntries/${date}/${category}/${amount}`,
                {
                    method: 'delete'
            })
            .then(response => response.text())
            .then(textResponse => dispatch(deleteEntriesFinished(textResponse)))
                };
            };

        export const userInfoRequested = () => {
            return {
                type: USER_INFO_REQUESTED,
                loading: true
            };
        };
        
        export const userInfoReceived = (jsonResponse) => {
            console.log('monthStartDayreceived');
            //console.log(jsonResponse);
            return {
                type: USER_INFO_RECEIVED,
                loading: false,
                json: jsonResponse
            };
        };
        
        export const fetchUserInfo = () => {
            return dispatch => {
                dispatch(userInfoRequested());
                return fetch('/userBase/'+userId,
                    {
                        method: 'GET'
                })
                .then(response => response.json())
                .then(jsonResponse => dispatch(userInfoReceived(jsonResponse)));
            };
        };
        
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
                return fetch('/userBase/'+userId+'/monthStartDay', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        monthStartDay: monthStartDay
            })}).then(() => {
                dispatch(updateMonthStartDayFinished())
            })
                };
            };
     