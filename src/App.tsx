import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { NotFound } from "./components/NotFound";
import { RouteContext } from "./contexts/RouteContext";
import RouteDeterminationView from "./pages/RouteDeterminationView";
import { ShowRouteAndInfoView } from "./pages/ShowRouteAndInfoView";
import { HistoryRoute, RouteInfo } from "./types";
import { BrowserRouter } from "react-router-dom";

function App() {
  const [routeInfo, setRouteInfo] = useState<RouteInfo>({
    routeFrom: "",
    routeTo: "",
    firstIntermediateStop: "",
    secondIntermediateStop: "",
    ratePerKilometer: 0.5,
  });

  const [routesHistoryList, setRoutesHistoryList] = useState<
    HistoryRoute[] | []
  >([
    {
      name: "London - Karaiby",
      distance: "15536km",
      duration: "2h",
      cost: "800zł",
    },
  ]);

  return (
    <BrowserRouter>
      <RouteContext.Provider
        value={{
          routeInfo,
          setRouteInfo,
          routesHistoryList,
          setRoutesHistoryList,
        }}
      >
        <Routes>
          <Route path="/">
            <Route index element={<RouteDeterminationView />} />
            <Route path="foundRoute" element={<ShowRouteAndInfoView />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </RouteContext.Provider>
    </BrowserRouter>
  );
}

export default App;
