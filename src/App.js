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

// import EntryModal from './components/Modals/EntryModal';

const checkIsAppAvaliable = () => {

  const userInfo = window.navigator.userAgent;

  if (window.innerWidth < 940) return false;
  if (userInfo.match('/Android/')
    || userInfo.match('/webOS/')
    || userInfo.match('/iPhone/')
    || userInfo.match('/iPad/')
    || userInfo.match('/iPod/')
    || userInfo.match('/BlackBerry/')
    || userInfo.match('/Windows Phone/')) return false;
  return true;
}

const App = () => {

  const [appAvalible, setIsAppAvaliable] = useState(true);
  const { setIsMobile } = useAppStore();

  const router = createHashRouter(createRoutesFromElements(
    <Route path='/'>
      <Route index element={<StartApp />} />
      <Route path='/play' element={<Game />} />
    </Route>
  ));

  const appResize = () => {
    if (!appAvalible) {
      if (checkIsAppAvaliable()) {
        setIsAppAvaliable(true);
        setIsMobile(false);
      }
    } else {
      if (!checkIsAppAvaliable()) {
        setIsAppAvaliable(false);
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