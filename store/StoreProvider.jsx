'use client';

import { Provider } from 'react-redux';
import { store } from './store';

/**
 * Redux Store Provider Component
 * 
 * This component provides Redux store access to all child components.
 * Must be used at the root level of the App.
 */
export default function StoreProvider({ children }) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}
