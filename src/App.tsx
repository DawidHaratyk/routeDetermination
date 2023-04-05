import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { NotFound } from './components/index';
import RouteDeterminationView from './pages/RouteDeterminationView';
import { ShowRouteAndInfoView } from './pages/ShowRouteAndInfoView';
import { BrowserRouter } from 'react-router-dom';
import { RouteProvider } from './contexts/RouteContext';
import axe from 'axe-core';

function App() {
  // comment and uncomment it to make it work
  axe
    .run()
    .then((results) => {
      if (results.violations.length) {
        console.log(results.violations);
        throw new Error('Accessibility issues found');
      }
    })
    .catch((err) => {
      console.error('Something bad happened:', err.message);
    });

  return (
    <BrowserRouter>
      <RouteProvider>
        <Routes>
          <Route path="/">
            <Route index element={<RouteDeterminationView />} />
            <Route path="foundRoute" element={<ShowRouteAndInfoView />} />
            <Route path="bike" element={<h1>Bike details</h1>} />
            <Route path="car" element={<h1>Car details</h1>} />
            <Route path="doll" element={<h1>Doll details</h1>} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </RouteProvider>
    </BrowserRouter>
  );
}

export default App;
