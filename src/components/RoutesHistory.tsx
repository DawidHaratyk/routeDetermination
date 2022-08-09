import React from "react";
import { HistoryRouteItem } from "./HistoryRouteItem";

export function RoutesHistory() {
  return (
    <div>
      <h5 className="text-2xl font-bold mb-6 text-center">Routes history</h5>
      <div className="flex flex-col items-center">
        <HistoryRouteItem />
        <HistoryRouteItem />
        <HistoryRouteItem />
      </div>
    </div>
  );
}
