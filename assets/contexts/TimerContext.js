import React, { createContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TimerContext = createContext();

const initialState = {
  timers: [],
  history: [],
};

function timerReducer(state, action) {
  switch (action.type) {
    case 'LOAD_DATA':
      return {
        ...state,
        timers: action.payload.timers || [],
        history: action.payload.history || [],
      };
    case 'ADD_TIMER':
      const newTimers = [...state.timers, action.payload];
      AsyncStorage.setItem('timers', JSON.stringify(newTimers));
      return {
        ...state,
        timers: newTimers,
      };
    case 'UPDATE_TIMER':
      const updatedTimers = state.timers.map((t) =>
        t.id === action.payload.id ? action.payload : t
      );
      AsyncStorage.setItem('timers', JSON.stringify(updatedTimers));
      return {
        ...state,
        timers: updatedTimers,
      };
      case 'DECREMENT_TIMER': {
        const { id } = action.payload;
        const newTimers = state.timers.map(timer => {
          if (timer.id === id) {
            const newRemaining = timer.remaining > 0 ? timer.remaining - 1 : 0;
            return {
              ...timer,
              remaining: newRemaining,
              status: newRemaining === 0 ? 'Completed' : 'Running',
            };
          }
          return timer;
        });
      
        AsyncStorage.setItem('timers', JSON.stringify(newTimers));
      
        return {
          ...state,
          timers: newTimers,
        };
      }
      
    case 'COMPLETE_TIMER':
      const completedTimers = state.timers.filter(t => t.id !== action.payload);
      const newHistoryEntry = action.log;
      const updatedHistory = [...state.history, newHistoryEntry];
      AsyncStorage.setItem('timers', JSON.stringify(completedTimers));
      AsyncStorage.setItem('history', JSON.stringify(updatedHistory));
      return {
        ...state,
        timers: completedTimers,
        history: updatedHistory,
      };
    default:
      return state;
  }
}

export const TimerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(timerReducer, initialState);

  useEffect(() => {
    (async () => {
      const timersString = await AsyncStorage.getItem('timers');
      const historyString = await AsyncStorage.getItem('history');
      dispatch({
        type: 'LOAD_DATA',
        payload: {
          timers: timersString ? JSON.parse(timersString) : [],
          history: historyString ? JSON.parse(historyString) : [],
        },
      });
    })();
  }, []);

  return (
    <TimerContext.Provider value={{ state, dispatch }}>
      {children}
    </TimerContext.Provider>
  );
};
