import axios from 'axios'; 


const initialState = {
  expenses: [],
};

export const FETCH_ITEMS = 'FETCH_ITEMS'; 

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return {
        ...state,
        expenses: [...state.expenses, action.payload]
      };
    case 'DELETE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.filter(expense => expense.id !== action.payload)
      };
    case 'EDIT_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.map(expense =>
          expense.id === action.payload.id ? action.payload.updatedExpense : expense
        )
      };
    case 'SORT_EXPENSES':
      return {
        ...state,
        expenses: [...state.expenses].sort((a, b) => {
          
          if (a[action.payload] < b[action.payload]) return -1;
          if (a[action.payload] > b[action.payload]) return 1;
          return 0;
        })
      };
    case 'FILTER_EXPENSES':
      return {
        ...state,
        
        expenses: state.expenses.filter(expense => expense.name.includes(action.payload))
      };
    case FETCH_ITEMS: 
      return {
        ...state,
        expenses: action.payload
      };
    default:
      return state;
  }
};

export function fetchItems() {
  return async function fetchItems(dispatch) {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      dispatch({
        type: FETCH_ITEMS,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error fetching items", error);
    }
  };
}

export default rootReducer;
