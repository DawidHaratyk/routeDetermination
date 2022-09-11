import React from "react";
import { useRoute } from "../contexts/RouteContext";
import { HistoryRouteItem } from "./index";

export function RoutesHistory() {
  const { routesHistoryList } = useRoute();

  const currentRoutesHistoryList = routesHistoryList.map(
    (historyRoute, key) => (
      <HistoryRouteItem historyRoute={historyRoute} index={key} />
    )
  );

  return (
    <div>
      <h5 className="text-2xl font-bold mb-6 text-center">Routes history</h5>
      <div className="flex flex-col items-center">
        {currentRoutesHistoryList}
      </div>
    </div>
  );
}
