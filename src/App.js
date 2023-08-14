import React, { useState, useEffect, Suspense } from 'react';
import {
  createHashRouter,
  RouterProvider,
  createRoutesFromElements,
  Route
} from 'react-router-dom';
import StoreProvider from './stores/StoreProvider';
import { useAppStore } from './stores/hooks';
import StartApp from './pages/StartApp';
import Loading from './pages/Loading';
import Game from './pages/Game';

import EntryModal from './components/Modals/EntryModal';

const checkIsMobile = () => {

  const userInfo = window.navigator.userAgent;

  if (window.innerWidth < 940) return true;
  if (userInfo.match('/Android/')
    || userInfo.match('/webOS/')
    || userInfo.match('/iPhone/')
    || userInfo.match('/iPad/')
    || userInfo.match('/iPod/')
    || userInfo.match('/BlackBerry/')
    || userInfo.match('/Windows Phone/')) return true;
  return false;
}

const App = () => {

  const [appMobile, setIsAppMobile] = useState(false);
  const [block, setBlock] = useState(false);
  const { setIsMobile } = useAppStore();

  const router = createHashRouter(createRoutesFromElements(
    <Route path='/'>
      <Route index element={block ? <EntryModal /> : <StartApp />} />
      <Route path='/play' element={<Game />} />
    </Route>
  ));

  const appResize = () => {
    if (window.innerHeight < 480) {
      setBlock(true);
      return;
    } else setBlock(false);
    if (appMobile) {
      if (!checkIsMobile()) {
        setIsAppMobile(false);
        setIsMobile(false);
      }
    } else {
      if (checkIsMobile()) {
        setIsAppMobile(true);
        setIsMobile(true);
      }
    };
  }

  useEffect(() => appResize());

  window.addEventListener('resize', appResize);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

const AppWrapped = () => (
  <Suspense fallback={<Loading />}>
    <StoreProvider>
      <App />
    </StoreProvider>
  </Suspense>
);


export default AppWrapped;