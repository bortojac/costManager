import { combineReducers } from 'redux';
import {
    TABLE_DATA_REQUESTED,
    TABLE_DATA_RECEIVED,
    SAVE_NEEDED,
    SAVE_FINISHED,
    CATEGORY_DATA_RECEIVED,
    CATEGORY_DATA_REQUESTED,
    MONTHLY_DATA_RECEIVED,
    MONTHLY_DATA_REQUESTED,
    UPDATE_CATEGORIES_REQUESTED,
    UPDATE_CATEGORIES_FINISHED
}
    from '../actions/types';


export const tableData = (
    state = {
        json: [],
        loading: false,
    }, action) => {
    switch (action.type) {
        case TABLE_DATA_REQUESTED:
            return Object.assign({}, state, {
                loading: true
            });
        case TABLE_DATA_RECEIVED:
            return Object.assign({}, state, {
                json: action.json,
                loading: false
            });
        default:
            return state;
    }
};

export const categoryData = (
    state = {
        json: [],
        loading: false,
    }, action) => {
    switch (action.type) {
        case CATEGORY_DATA_REQUESTED:
            return Object.assign({}, state, {
                loading: true
            });
        case CATEGORY_DATA_RECEIVED:
            return Object.assign({}, state, {
                json: action.json,
                loading: false
            });
        default:
            return state;
    }
};

export const monthlyData = (
    state = {
        json: [],
        loading: false,
    }, action) => {
    switch (action.type) {
        case MONTHLY_DATA_REQUESTED:
            return Object.assign({}, state, {
                loading: true
            });
        case MONTHLY_DATA_RECEIVED:
            return Object.assign({}, state, {
                json: action.json,
                loading: false
            });
        default:
            return state;
    }
};

export const newExpenseForm = (
    state = {
        message: ''
    }, action) => {
        switch(action.type) {
            case SAVE_NEEDED:
            return Object.assign({}, state, {
            });
        case SAVE_FINISHED:
            return Object.assign({}, state, {
                message: action.message
            });
        default:
            return state; 
        }
    };

    export const updateCategories = (
        state = {
            message: ''
        }, action) => {
            switch(action.type) {
                case UPDATE_CATEGORIES_REQUESTED:
                return Object.assign({}, state, {
                });
            case UPDATE_CATEGORIES_FINISHED:
                return Object.assign({}, state, {
                
                });
            default:
                return state; 
            }
        };
    

const rootReducer = combineReducers(
    {
    tableData,
     categoryData,
      monthlyData,
       newExpenseForm
        }
    );

export default rootReducer; 