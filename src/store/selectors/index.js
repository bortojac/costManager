import { createSelector } from 'reselect'; 
import moment from 'moment'; 

// tableData selectors
export const getTableData = (state) => state.tableData.json
export const getTableLoadingFlag= (state) => state.tableData.loading

// tableData reselect function
export const getTableDataState = createSelector(
    [ getTableData ],
    (json) => {
        console.log('TableDataResponse');
        console.log(json);
       return json.map(
        item => ({
            date: moment(item.date).format('ddd, MMM Do, YYYY'),
            category: item.category,
            amount: item.amount.toLocaleString(),
            notes: item.notes
        })
);
    }
)

// totalSum selector for the headline. (We will start with the category data and sum it up)
export const getTotalSum = (state) => state.monthlyData.json

// totalSum reselect function to actually calculate the sum. 
// filter to current year, sort descending by month and grab the first one
export const getTotalSumState = createSelector(
    [getTotalSum],
    (json) => {
        console.log('getTotalSumState');
        console.log(json);
        console.log(_.head(_.map(json, element => element.amount)));
       return _.head(_.map(_.orderBy(_.filter(json, {'year': moment().year()}),['month'],['desc']), element => element.amount));
    }
)

// categoryData selectors
export const getCategoryData = (state) => state.categoryData.json
export const getCategoryLoadingFlag = (state) => state.categoryData.loading

// get just the categories for CategorySettings
export const getCategoriesState = createSelector(
    [getCategoryData],
    (json) => _.map(json, item => item.category)
)

// monthlyData selectors
const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July",
    "Aug", "Sept", "Oct", "Nov", "Dec"];

export const getMonthlyData = (state) => state.monthlyData.json
export const getMonthlyLoadingFlag = (state) => state.monthlyData.loading

export const getMonthlyDataState = createSelector(
    [getMonthlyData],
    json => {
        return _.map(json, item => ({
            monthYear: `${months[item.month]} - ${item.year}`,
            amount: item.amount
        })
        );
    }
);
//newExpense selectors
// since we are not manipulating state there is no need for a memoized selector
//export const isExpenseSaved = (state) => state.newExpenseForm.saved;
export const getSaveMessage = (state) => state.newExpenseForm.message;

export const getDeletedAllMessage = (state) => state.deleteAll.message;

export const getUpdatedCategories = (state) => state.updateCategories.newCategories;

export const getUserInfo = (state) => state.userInfo.json;

export const getMonthStartDayState = createSelector(
    [getUserInfo],
    json => json.monthStartDay
);