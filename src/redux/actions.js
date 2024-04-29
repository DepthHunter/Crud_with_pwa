
export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  payload: expense
});

export const deleteExpense = (id) => ({
  type: 'DELETE_EXPENSE',
  payload: id
});

export const editExpense = (id, updatedExpense) => ({
  type: 'EDIT_EXPENSE',
  payload: { id, updatedExpense }
});
