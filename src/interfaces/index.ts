export interface Task {
    id: number;
    text: string;
    completed: boolean;
}

export interface CartItem {
    id: number;
    name: string;
    price: number;
}

// Define types for state and action
export interface State {
    // Define your state properties here
    tasks: Task[];
    shoppingCart: CartItem[]
}

export type Action =
    | { type: 'ADD_TASK'; payload: Task }
    | { type: 'TOGGLE_TASK'; payload: number }
    | { type: 'REMOVE_TASK'; payload: number }
    | { type: 'ADD_TO_CART'; payload: CartItem }
    | { type: 'REMOVE_FROM_CART'; payload: number };

export interface WeatherData {
    temperature: number;
    condition: string;
}

// Create context and provider
export interface AppContextType {
    state: State;
    dispatch: React.Dispatch<Action>;
}