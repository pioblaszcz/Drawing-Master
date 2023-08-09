import React, { useState, Suspense } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route
} from 'react-router-dom';
import StoreProvider from './stores/StoreProvider';

import StartApp from './pages/StartApp';
import Loading from './pages/Loading';
import Game from './pages/Game';

import EntryModal from './components/Modals/EntryModal';

const checkIsAppAvaliable = () => {
  const userInfo = window.navigator.userAgent;

  if (window.innerWidth < 840) return false;
  if (userInfo.match('/Android/')
    || userInfo.match('/webOS/')
    || userInfo.match('/iPhone/')
    || userInfo.match('/iPad/')
    || userInfo.match('/iPod/')
    || userInfo.match('/BlackBerry/')
    || userInfo.match('/Windows Phone/')) return false;
  return true;
}

//pozwol na resizing gdy rozpoczeto gre, potem pomyslimy!

const App = () => {
  const [appAvalible, setIsAppAvaliable] = useState(checkIsAppAvaliable());

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/'>
      <Route index element={appAvalible ? <StartApp /> : <EntryModal />} />
      <Route path='/play' element={<Game />} />
    </Route>
  ));

  const appResize = () => {
    if (!appAvalible) checkIsAppAvaliable() && setIsAppAvaliable(true);
    else !checkIsAppAvaliable() && setIsAppAvaliable(false);
  }

  window.addEventListener('resize', appResize);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default () => (
  <Suspense fallback={<Loading />}>
    <StoreProvider>
      <App />
    </StoreProvider>
  </Suspense>
);
