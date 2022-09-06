import React from "react";
import { Route, Routes } from "react-router-dom";
import { NotFound } from "./components/index";
import RouteDeterminationView from "./pages/RouteDeterminationView";
import { ShowRouteAndInfoView } from "./pages/ShowRouteAndInfoView";
import { BrowserRouter } from "react-router-dom";
import { RouteProvider } from "./contexts/RouteContext";

function App() {
  return (
    <BrowserRouter>
      <RouteProvider>
        <Routes>
          <Route path="/">
            <Route index element={<RouteDeterminationView />} />
            <Route path="foundRoute" element={<ShowRouteAndInfoView />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </RouteProvider>
    </BrowserRouter>
  );
}

export default App;
