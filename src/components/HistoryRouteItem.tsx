import React from "react";
import { RouteDetail } from "./RouteDetail";

export function HistoryRouteItem() {
  return (
    <div className="flex w-3/5 bg-green-50 border-2 border-green-500 rounded-md mb-3">
      <div className="flex justify-center items-center border-r-[1px] border-black border-opacity-40 w-20 h-20">
        <span className="rounded-full bg-green-400 w-10 h-10 text-center leading-10 text-white text-2xl">
          1
        </span>
      </div>
      <div className="py-4 px-10">
        <h6 className="font-bold">Wisła - Ustroń</h6>
        <div>
          <RouteDetail
            containerClasses="text-xs inline-block w-60"
            detailName="Odległość drogowa:"
            detailValue=" 18.19 km"
          />
          <RouteDetail
            containerClasses="text-xs inline-block w-60"
            detailName="Czas przejazdu:"
            detailValue=" 0 h 18 min"
          />
          <RouteDetail detailName="Koszt przejazdu:" detailValue=" 156zł" />
        </div>
      </div>
    </div>
  );
}
