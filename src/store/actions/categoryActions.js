import {
    CATEGORY_DATA_RECEIVED,
    CATEGORY_DATA_REQUESTED,
    UPDATE_CATEGORIES_FINISHED,
    UPDATE_CATEGORIES_REQUESTED,
    ADD_USER_CATEGORY_REQUESTED,
    ADD_USER_CATEGORY_FINISHED,
    UPDATE_USER_CATEGORIES_FINISHED,
    UPDATE_USER_CATEGORIES_REQUESTED,
    DELETE_USER_CATEGORY_REQUESTED,
    DELETE_USER_CATEGORY_FINISHED
} from './types';
import { fetchUserInfo } from './userInfoActions';
import { fetchTableData } from './tableActions';
import { userId } from './userInfoActions';

export const categoryDataRequested = () => {
    return {
        type: CATEGORY_DATA_REQUESTED,
        loading: true
    };
};

export const categoryDataReceived = (jsonResponse) => {
    return {
        type: CATEGORY_DATA_RECEIVED,
        loading: false,
        json: jsonResponse
    };
};

export const fetchCategoryData = () => {
    return dispatch => {
        dispatch(categoryDataRequested());
        return fetch('/expenseBase/' + userId + '/categoryGraph',
            {
                method: 'GET'
            })
            .then(response => response.json())
            .then(jsonResponse => dispatch(categoryDataReceived(jsonResponse)));
    };
};


export const updateCategoriesRequested = (newCategories) => {
    return {
        type: UPDATE_CATEGORIES_REQUESTED,
        fetching: true,
        newCategories: newCategories
    };
};

export const updateCategoriesFinished = (textResponse) => {
    return {
        type: UPDATE_CATEGORIES_FINISHED,
        fetching: false,
        textResponse: textResponse
    };
};

export const updateCategories = (newCategories) => {
    return dispatch => {
        dispatch(updateCategoriesRequested(newCategories))
        return fetch('/expenseBase/' + userId + '/newCategories', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                newCategories: newCategories
            })
        })
        .then(response => response.text())
        .then(textResponse => {
            dispatch(updateCategoriesFinished(textResponse));
            dispatch(fetchTableData());
            dispatch(fetchCategoryData());
            dispatch(fetchUserInfo());
        })
    };
};

export const addUserCategoryRequested = (newCategory) => {
    return {
        type: ADD_USER_CATEGORY_REQUESTED,
        fetching: true,
        newCategory: newCategory
    };
};

export const addUserCategoryFinished = (textResponse) => {
    return {
        type: ADD_USER_CATEGORY_FINISHED,
        fetching: false,
        textResponse: textResponse
    };
};

export const addUserCategory = (newCategory) => {
    return dispatch => {
        dispatch(addUserCategoryRequested(newCategory))
        return fetch('/userBase/' + userId + '/addCategory', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                category: newCategory
            })
        }).then(response => response.text())
        .then(textResponse => {
            dispatch(addUserCategoryFinished(textResponse));
            dispatch(fetchUserInfo());
        })
    };
};

export const updateUserCategoriesRequested = (newCategories) => {
    return {
        type: UPDATE_USER_CATEGORIES_REQUESTED,
        fetching: true,
        newCategories: newCategories
    };
};

export const updateUserCategoriesFinished = (textResponse) => {
    return {
        type: UPDATE_USER_CATEGORIES_FINISHED,
        fetching: false,
        textResponse
    };
};

export const updateUserCategories = (newCategories) => {
    return dispatch => {
        dispatch(updateUserCategoriesRequested(newCategories))
        return fetch('/userBase/' + userId + '/categories', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                newCategories: newCategories
            })
        }).then((response) => response.text())
        .then(textResponse => {
            dispatch(updateUserCategoriesFinished(textResponse));
            dispatch(fetchTableData());
            dispatch(fetchCategoryData());
            dispatch(fetchUserInfo());
        }
        )
    };
};

export const deleteUserCategoryRequested = (category) => {
    return {
        type: DELETE_USER_CATEGORY_REQUESTED,
        fetching: true,
        category: category
    };
};

export const deleteUserCategoryFinished = (textResponse) => {
    return {
        type: DELETE_USER_CATEGORY_FINISHED,
        fetching: false,
        textResponse
    };
};

export const deleteUserCategory = (category) => {
    return dispatch => {
        dispatch(deleteUserCategoryRequested(category))
        return fetch('/userBase/' + userId + '/deleteCategory', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                category: category
            })
        })
            .then(response => response.text())
            .then(textResponse => {
                dispatch(deleteUserCategoryFinished(textResponse));
                dispatch(fetchCategoryData());
                dispatch(fetchTableData());
                dispatch(fetchUserInfo());
            })
    };
};