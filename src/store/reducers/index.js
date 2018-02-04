import { combineReducers } from 'redux';
import {
    TABLE_DATA_REQUESTED,
    TABLE_DATA_RECEIVED,
    SAVE_NEEDED,
    SAVE_FINISHED
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

export const newExpenseForm = (
    state = {
        message: '',
        saved: false
    }, action) => {
        switch(action.type) {
            case SAVE_NEEDED:
            return Object.assign({}, state, {
                saved: false
            });
        case SAVE_FINISHED:
            return Object.assign({}, state, {
                message: action.message,
                saved: true
            });
        default:
            return state; 
        }
    };


export const graphData = (
    state = {
        data: [],
        loading: false
    }, action) => {
        switch(action.type) {
            default:
                return state;
        }
    }


const rootReducer = combineReducers({tableData, newExpenseForm, graphData});

export default rootReducer; 