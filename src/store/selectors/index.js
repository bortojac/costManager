import { createSelector } from 'reselect'; 
import moment from 'moment'; 

// tableData selectors
export const getTableData = (state) => state.tableData.json
export const getTableLoadingFlag= (state) => state.tableData.loading

// tableData reselect function
export const getTableDataState = createSelector(
    [ getTableData ],
    (json) => {
        //console.log('TableDataResponse');
        //console.log(json);
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

// totalSum reselect function to actually calculate the sum of the most recent period
// filter to current year, sort descending by month, group by monthStartInterval, sum by amount, grab first amount
export const getTotalSumState = createSelector(
    [getTotalSum],
    (json) => {
        let monthIntervalGrouped = _(json)
        .filter({'year': moment().year()})
        .orderBy(['month'],['desc'])
        .groupBy(item => item.monthStartInterval)
        .map((monthIntervalArray) => ({
            monthStartInterval: monthIntervalArray[0].monthStartInterval,
            amount: _.sumBy(monthIntervalArray, x => x.amount)
        })).value();
        return _.head(_.map(monthIntervalGrouped, item => item.amount))
    }
)

// categoryData selectors
export const getCategoryData = (state) => state.categoryData.json;
export const getCategoryLoadingFlag = (state) => state.categoryData.loading;

// get just the categories for CategorySettings
export const getCategoriesState = createSelector(
    [getCategoryData],
    (json) => _.map(json, item => item.category)
);

// monthlyData selectors
const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July",
    "Aug", "Sept", "Oct", "Nov", "Dec"];

export const getMonthlyData = (state) => state.monthlyData.json
export const getMonthlyLoadingFlag = (state) => state.monthlyData.loading

export const getMonthlyDataState = createSelector(
    [getMonthlyData],
    json => {
        console.log('monthlyDataSelector');
        console.log(_(json)
        .groupBy(item => item.monthStartInterval)
        .map((monthIntervalArray) => ({
            monthStartInterval: monthIntervalArray.monthStartInterval,
            amount: _.sumBy(monthIntervalArray, x => x.amount)
        })).value());
        return _(json)
        .groupBy(item => item.monthStartInterval)
        .map((monthIntervalArray) => ({
            monthStartInterval: monthIntervalArray[0].monthStartInterval,
            amount: _.sumBy(monthIntervalArray, x => x.amount)
        })).value();
        
        
        
        /*_.map(json, item => ({
            monthInterval: item.monthStartInterval,//`${months[item.month]} - ${item.year}`,
            amount: item.amount
        })
        );*/
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