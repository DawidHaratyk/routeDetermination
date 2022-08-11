import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { NotFound } from "./components/NotFound";
import { RouteContext } from "./contexts/RouteContext";
import RouteDeterminationView from "./pages/RouteDeterminationView";
import { ShowRouteAndInfoView } from "./pages/ShowRouteAndInfoView";
import { RouteInfo } from "./types";

function App() {
  const [routeInfo, setRouteInfo] = useState<RouteInfo>({
    routeFrom: "",
    routeTo: "",
  });

  return (
    <>
      <RouteContext.Provider value={{ routeInfo, setRouteInfo }}>
        <Routes>
          <Route path="/">
            <Route index element={<RouteDeterminationView />} />
            <Route path="foundRoute" element={<ShowRouteAndInfoView />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </RouteContext.Provider>
    </>
  );
}

export default App;
