import { createSelector } from 'reselect';  

// tableData selectors
export const getTableData = (state) => state.tableData.json
//console.log(getTableData());
export const getTableLoadingFlag= (state) => state.tableData.loading

// tableData reselect function
export const getTableDataState = createSelector(
    [ getTableData ],
    (json) => json.map(
        item => ({
            date: item.date,
            category: item.category,
            amount: item.amount,
            notes: item.notes 
        })
)
)

//newExpense selectors
// since we are not manipulating state there is no need for a memoized selector
export const isExpenseSaved = (state) => state.newExpenseForm.saved;
export const getSaveMessage = (state) => state.newExpenseForm.message;