import React from "react";
import { Route, Routes } from "react-router-dom";
import { NotFound } from "./components/NotFound";
import RouteDeterminationView from "./pages/RouteDeterminationView";
import { ShowRouteAndInfoView } from "./pages/ShowRouteAndInfoView";
import { RouteContext } from './contexts/RouteContext';
import { useContext } from 'react';

function App() {
  const useRouteContext = useContext(RouteContext);

  console.log(useRouteContext);
  

  return (
    <>
      <Routes>
        <Route path="/">
          <Route index element={<RouteDeterminationView />} />
          <Route path="foundRoute" element={<ShowRouteAndInfoView />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
