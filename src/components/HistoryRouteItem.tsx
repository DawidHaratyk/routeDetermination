import React from "react";
import { HistoryRoute } from "../types";
import { RouteDetail } from "./RouteDetail";

interface HistoryRouteI {
  historyRoute: HistoryRoute;
  index: number;
}

export function HistoryRouteItem({ historyRoute, index }: HistoryRouteI) {
  const { name, distance, duration, cost } = historyRoute as HistoryRoute;
  const currentIndex: number = index + 1;

  return (
    <div className="flex w-3/5 bg-green-50 border-2 border-green-500 rounded-md mb-3">
      <div className="flex justify-center items-center border-r-[1px] border-black border-opacity-40 w-20 h-20">
        <span className="rounded-full bg-green-400 w-10 h-10 text-center leading-10 text-white text-2xl">
          {currentIndex}
        </span>
      </div>
      <div className="py-2 px-10 flex flex-col justify-center">
        <h6 className="font-bold">{name}</h6>
        <div>
          <RouteDetail
            containerClasses="text-xs inline-block w-60"
            detailName="Odległość drogowa:"
            detailValue={distance}
          />
          <RouteDetail
            containerClasses="text-xs inline-block w-60"
            detailName="Czas przejazdu:"
            detailValue={duration}
          />
          <RouteDetail detailName="Koszt przejazdu:" detailValue={cost} />
        </div>
      </div>
    </div>
  );
}
