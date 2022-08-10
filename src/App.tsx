import React from "react";
import { Route, Routes } from "react-router-dom";
import { NotFound } from "./components/NotFound";
import RouteDeterminationView from "./pages/RouteDeterminationView";
import { ShowRouteAndInfoView } from "./pages/ShowRouteAndInfoView";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RouteDeterminationView />} />
        <Route path="/foundRoute" element={<ShowRouteAndInfoView />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
