import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ExpensesList } from './ExpensesList';


const mockExpenses = [
  { id: 1, name: 'Expense 1', description: 'Description 1' },
  { id: 2, name: 'Expense 2', description: 'Description 2' },
];

test('renders list of expenses', () => {
  const { getByText } = render(<ExpensesList expenses={mockExpenses} />);
  

  expect(getByText('Expense 1 - Description 1')).toBeInTheDocument();
  expect(getByText('Expense 2 - Description 2')).toBeInTheDocument();
});

test('allows editing an expense', () => {
  const { getByText, getByLabelText } = render(<ExpensesList expenses={mockExpenses} />);


  fireEvent.click(getByText('Edit'));


  expect(getByLabelText('Name')).toBeInTheDocument();
  expect(getByLabelText('Description')).toBeInTheDocument();


  fireEvent.change(getByLabelText('Name'), { target: { value: 'Updated Expense' } });
  fireEvent.change(getByLabelText('Description'), { target: { value: 'Updated Description' } });


  fireEvent.click(getByText('Save'));


  expect(getByText('Updated Expense - Updated Description')).toBeInTheDocument();
});
