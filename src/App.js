import React from 'react';
import ExpensesList from './components/PostList';
import AddExpenseForm from './components/AddPostForm';


const App = () => {
  return (
    <div>
      <h1>CRUD</h1>
      <AddExpenseForm />
      <ExpensesList />
      
    </div>
  );
};

export default App;
