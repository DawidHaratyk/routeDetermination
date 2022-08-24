import React, { useContext, useEffect } from "react";
import { RouteContext } from "../contexts/RouteContext";
import { HistoryRouteItem } from "./HistoryRouteItem";

export function RoutesHistory() {
  const { routesHistoryList } = useContext(RouteContext);

  const currentRoutesHistoryList = routesHistoryList.map(
    (historyRoute, key) => {
      console.log(historyRoute);

      return <HistoryRouteItem historyRoute={historyRoute} index={key} />;
    }
  );

  useEffect(() => {
    console.log(currentRoutesHistoryList);
  }, []);

  return (
    <div>
      <h5 className="text-2xl font-bold mb-6 text-center">Routes history</h5>
      <div className="flex flex-col items-center">
        {currentRoutesHistoryList}
      </div>
    </div>
  );
}
