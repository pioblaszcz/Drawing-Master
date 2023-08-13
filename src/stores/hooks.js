import { useContext } from 'react';
import { configure } from "mobx"

import { StoreContext } from './StoreProvider';

configure({
    enforceActions: "never",
})

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

export const useUserStore = () => {
    const rootStore = useContext(StoreContext);

    if (!rootStore) {
        throw new Error('Nie znoleziono RootStore, sprawdź czy masz poprawny provider')
    }

    return rootStore.userStore;
}