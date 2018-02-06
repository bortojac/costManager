import { createSelector } from 'reselect';  

// tableData selectors
export const getTableData = (state) => state.tableData.json
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

// categoryData selectors
export const getCategoryData = (state) => state.categoryData.json
export const getCategoryLoadingFlag= (state) => state.categoryData.loading

// monthlyData selectors
export const getMonthlyData = (state) => state.monthlyData.json
export const getMonthlyLoadingFlag= (state) => state.monthlyData.loading

//newExpense selectors
// since we are not manipulating state there is no need for a memoized selector
export const isExpenseSaved = (state) => state.newExpenseForm.saved;
export const getSaveMessage = (state) => state.newExpenseForm.message;