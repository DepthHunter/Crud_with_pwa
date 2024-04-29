
import { createSelector } from 'reselect';

const getExpenses = state => state.expenses;
const getFilter = state => state.filter;
const getSort = state => state.sort;

export const getFilteredAndSortedExpenses = createSelector(
  [getExpenses, getFilter, getSort],
  (expenses, filter, sort) => {
  
    const filteredExpenses = expenses.filter(expense => expense.name.includes(filter));

 
    const sortedExpenses = filteredExpenses.sort((a, b) => {
   
      if (sort === 'date') {
        return new Date(a.date) - new Date(b.date);
      } 
      return 0;
    });

    return sortedExpenses;
  }
);
