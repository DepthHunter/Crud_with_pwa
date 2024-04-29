import React, { useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { deleteExpense, editExpense } from '../redux/actions';

const ExpensesList = ({ expenses, deleteExpense, editExpense }) => {
  const [editMode, setEditMode] = useState(null);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');

  const handleDelete = (id) => {
    deleteExpense(id);
  };

  const handleEdit = (expense) => {
    setEditMode(expense.id);
    setUpdatedName(expense.name);
    setUpdatedDescription(expense.description);
  };

  const handleSaveEdit = (expense) => {
    editExpense(expense.id, { ...expense, name: updatedName, description: updatedDescription });
    setEditMode(null);
  };

  const handleCancelEdit = () => {
    setEditMode(null);
    setUpdatedName('');
    setUpdatedDescription('');
  };


  const memoizedExpenses = useMemo(() => {
    return expenses.map(expense => (
      <li key={expense.id}>
        {editMode === expense.id ? (
          <>
            <input type="text" value={updatedName} onChange={(e) => setUpdatedName(e.target.value)} />
            <input type="text" value={updatedDescription} onChange={(e) => setUpdatedDescription(e.target.value)} />
            <button onClick={() => handleSaveEdit(expense)}>Save</button>
            <button onClick={handleCancelEdit}>Cancel</button>
          </>
        ) : (
          <>
            <span>{expense.name} - {expense.description}</span>
            <button onClick={() => handleEdit(expense)}>Edit</button>
            <button onClick={() => handleDelete(expense.id)}>Delete</button>
          </>
        )}
      </li>
    ));
  }, [expenses, editMode, updatedName, updatedDescription, handleSaveEdit, handleCancelEdit, handleEdit, handleDelete]);

  return (
    <div>
      <h2>Post List</h2>
      <ul>{memoizedExpenses}</ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  expenses: state.expenses
});

export default connect(mapStateToProps, { deleteExpense, editExpense })(ExpensesList);
