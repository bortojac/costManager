import { createSelector } from 'reselect'; 
import moment from 'moment'; 

// tableData selectors
export const getTableData = (state) => state.tableData.json
export const getTableLoadingFlag= (state) => state.tableData.loading

// tableData reselect function
export const getTableDataState = createSelector(
    [ getTableData ],
    (json) => json.map(
        item => ({
            date: moment(item.date).format('ddd, MMM Do, YYYY'),
            category: item.category,
            amount: item.amount.toLocaleString(),
            notes: item.notes 
        })
)
)

// totalSum selector for the headline. (We will start with the category data and sum it up)
export const getTotalSum = (state) => state.categoryData.json

// totalSum reselect function to actually calculate the sum
export const getTotalSumState = createSelector(
    [getTotalSum],
    (json) => _.sum(_.map(json, element => element.amount))
)

// categoryData selectors
export const getCategoryData = (state) => state.categoryData.json
export const getCategoryLoadingFlag = (state) => state.categoryData.loading

// monthlyData selectors
const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July",
    "Aug", "Sept", "Oct", "Nov", "Dec"];

export const getMonthlyData = (state) => state.monthlyData.json
export const getMonthlyLoadingFlag = (state) => state.monthlyData.loading

export const getMonthlyDataState = createSelector(
    [getMonthlyData],
    json => _.map(json, item => ({
        monthYear: `${months[item.month]} - ${item.year}`,
        amount: item.amount
              })
    )
)
//newExpense selectors
// since we are not manipulating state there is no need for a memoized selector
//export const isExpenseSaved = (state) => state.newExpenseForm.saved;
export const getSaveMessage = (state) => state.newExpenseForm.message;