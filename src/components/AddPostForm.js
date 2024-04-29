import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addExpense, editExpense as updateExpense } from '../redux/actions';

const AddExpenseForm = ({ addExpense, editMode, setEditMode, editExpense, updateExpense }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (editMode && editExpense) {
      setName(editExpense.name);
      setDescription(editExpense.description);
    }
  }, [editMode, editExpense]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newExpense = {
      id: editMode ? editExpense.id : Date.now(),
      name,
      description,
    };
    if (editMode) {
      updateExpense(newExpense);
      setEditMode(false);
    } else {
      addExpense(newExpense);
    }
    setName('');
    setDescription('');
  };

  return (
    <div>
      <h2>{editMode ? 'Edit Post' : 'Add Post'}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <button type="submit">{editMode ? 'Update Post' : 'Add Post'}</button>
      </form>
    </div>
  );
};

const mapDispatchToProps = {
  addExpense,
  updateExpense
};

export default connect(null, mapDispatchToProps)(AddExpenseForm);
