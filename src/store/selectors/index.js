import { createSelector } from 'reselect';
import moment from 'moment';

// tableData selectors
export const getTableData = (state) => state.tableData.json
export const getTableLoadingFlag = (state) => state.tableData.loading

// tableData reselect function
export const getTableDataState = createSelector(
    [getTableData],
    (json) => {
        return json.map(
            item => ({
                date: moment.utc(item.date).format('ddd, MMM Do, YYYY'),
                category: item.category,
                amount: item.amount.toLocaleString(),
                notes: item.notes
            })
        );
    }
)

export const getDBDataState = createSelector(
    [getTableData],
    (json) => {
        return json.map(
            item => ({
                date: moment.utc(item.date),
                category: item.category,
                amount: item.amount.toLocaleString(),
                notes: item.notes
            })
        );
    }
)

// totalSum selector for the headline. (We will start with the monthly data and sum it up)
export const getTotalSum = (state) => state.monthlyData.json

// totalSum reselect function to actually calculate the sum of the most recent period
// filter to current year, sort descending by month and day, group by monthStartInterval, sum by amount, grab first amount
export const getTotalSumState = createSelector(
    [getTotalSum],
    (json) => {
        let monthIntervalGrouped = _(json)
            .filter({ 'year': moment().year() })
            .orderBy(['month', 'day'], ['desc', 'desc'])
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

export const getCategoryDataState = createSelector(
    [getCategoryData],
    (json) => _.map(json, item => ({
        category: item.category,
        amount: item.amount
    }))
)

// get just the categories for CategorySettings
export const getCategoriesState = createSelector(
    [getCategoryData],
    (json) => _.map(json, item => item.category
    )
);

// monthlyData selectors
const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July",
    "Aug", "Sept", "Oct", "Nov", "Dec"];

export const getMonthlyData = (state) => state.monthlyData.json
export const getMonthlyLoadingFlag = (state) => state.monthlyData.loading

const formatMonthInterval = (monthInterval) => {
    let firstMonthNumber = Number(monthInterval.match(/[^\/]*/)[0]);
    let firstMonth = months[firstMonthNumber];
    let firstDay = monthInterval.match(/\/([^-]*)/)[1];
    let lastMonthNumber = Number(monthInterval.match(/[^\/]*/)[0]) + 1;
    let lastMonth = firstMonthNumber == 11 ? 'Jan' : months[firstMonthNumber + 1];
    let lastDay = firstDay == 1 ?
        (
            [0, 2, 4, 6, 7, 9, 11].includes(firstMonthNumber) ? 31 : firstMonthNumber == 1 ? 28 : 30
        )
        :
        (
            firstDay - 1
        )
    if (firstDay == 1) {
        lastMonth = firstMonth;
    }
    return `${firstMonth} ${firstDay} - ${lastMonth} ${lastDay}`;
}

export const getMonthlyDataState = createSelector(
    [getMonthlyData],
    json => {
        return _(json)
            .groupBy(item => item.monthStartInterval)
            .map((monthIntervalArray) => ({
                monthStartInterval: monthIntervalArray[0].monthStartInterval,
                monthIntervalTooltip: formatMonthInterval(monthIntervalArray[0].monthStartInterval),
                monthStartXAxis: months[Number(monthIntervalArray[0].monthStartInterval.match(/[^\/]*/)[0])],
                amount: _.sumBy(monthIntervalArray, x => x.amount)
            })).value();
    }
);

//newExpense selectors
export const getSaveMessage = (state) => state.newExpenseForm.message;

export const getUpdatedCategories = (state) => state.updateCategories.newCategories;

export const getUserInfo = (state) => state.userInfo.json;

export const getMonthStartDayState = createSelector(
    [getUserInfo],
    json => json.monthStartDay
);

export const getUserCategoriesState = createSelector(
    [getUserInfo],
    json => json.categories
);

// deleteEntries selectors
export const getDeleteMessage = (state) => state.deleteEntries.message;
export const getDeleteBool = (state) => state.deleteEntries.deleted;
