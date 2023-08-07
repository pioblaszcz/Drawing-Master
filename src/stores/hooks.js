import { useContext } from 'react';

import { StoreContext } from './StoreProvider';

export const useAppStore = () => {
    const rootStore = useContext(StoreContext);

    if (!rootStore) {
        throw new Error('Nie znoleziono RootStore, sprawdź czy masz poprawny provider')
    }

    return rootStore.appStore;
}

export const useDrawingStore = () => {
    const rootStore = useContext(StoreContext);

    if (!rootStore) {
        throw new Error('Nie znoleziono RootStore, sprawdź czy masz poprawny provider')
    }

    return rootStore.drawingStore;
}