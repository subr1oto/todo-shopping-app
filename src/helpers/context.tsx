// context.tsx
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { State, Action, AppContextType } from '../interfaces';

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialState: State = {
  // Initial state properties
  tasks: [],
  shoppingCart: [],
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'TOGGLE_TASK':
      // Implement toggle logic
      const updatedTasks = state.tasks.map((task) =>
        task.id === action.payload
          ? { ...task, completed: !task.completed }
          : task
      );
      return { ...state, tasks: updatedTasks };
    case 'REMOVE_TASK':
      // Implement remove logic
      const filteredTasks = state.tasks.filter(
        (task) => task.id !== action.payload
      );
      return { ...state, tasks: filteredTasks };
    case 'ADD_TO_CART':
      return { ...state, shoppingCart: [...state.shoppingCart, action.payload] };
    case 'REMOVE_FROM_CART':
      const updatedCart = state.shoppingCart.filter(item => item.id !== action.payload);
      return { ...state, shoppingCart: updatedCart };
    default:
      return state;
  }
};

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export { AppProvider, useAppContext };