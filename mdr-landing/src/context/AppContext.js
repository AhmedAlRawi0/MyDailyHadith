import React, { createContext, useContext, useReducer } from 'react';

const AppContext = createContext();

// Define initial state
const initialState = {
    theme: 'light',
    features: [],
    isLoading: false,
    // TODO: Add as needed
};

// Define reducer
function appReducer(state, action) {
    switch (action.type) {
        case 'SET_THEME':
            return {
                ...state,
                theme: action.payload
            };
        case 'SET_FEATURES':
            return {
                ...state,
                features: action.payload
            };
        case 'SET_LOADING':
            return {
                ...state,
                isLoading: action.payload
            };
        default:
            return state;
    }
}

// Create provider component
export function AppProvider({ children }) {
    const [state, dispatch] = useReducer(appReducer, initialState);

    // You can create custom actions here
    const setTheme = (theme) => {
        dispatch({ type: 'SET_THEME', payload: theme });
    };

    const setFeatures = (features) => {
        dispatch({ type: 'SET_FEATURES', payload: features });
    };

    const value = {
        ...state,
        setTheme,
        setFeatures,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Custom hook to use the context
export function useApp() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
} 