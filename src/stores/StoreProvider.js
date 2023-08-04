import React, { createContext } from 'react';
import RootStore from './RootStore';

export const StoreContext = createContext();

const StoreProvider = ({ children }) => (
    <StoreContext.Provider value={new RootStore()}>
        {children}
    </StoreContext.Provider>
);

export default StoreProvider;