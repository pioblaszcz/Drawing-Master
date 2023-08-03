import React, { useState, Suspense } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route
} from 'react-router-dom';

import StartApp from './pages/StartApp';
import Loading from './pages/Loading';
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

const App = () => {
  const [appAvalible, setIsAppAvaliable] = useState(checkIsAppAvaliable());

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/'>
      <Route index element={<StartApp />} />
    </Route>
  ));

  const appResize = () => {
    if (!appAvalible) checkIsAppAvaliable() && setIsAppAvaliable(true);
    else !checkIsAppAvaliable() && setIsAppAvaliable(false);
  }

  window.addEventListener('resize', appResize);

  const showAppJSX = appAvalible ? <RouterProvider router={router} /> : <EntryModal />;

  return (
    <div className="App">
      {showAppJSX}
    </div>
  );
}

export default () => (
  <Suspense fallback={<Loading />}>
    <App />
  </Suspense>
);
