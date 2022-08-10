import React, { useState } from "react";
import { NavLink } from "react-router-dom";

interface RouteInfo {
  routeFrom: string;
  routeTo: string;
}

export function RouteDetermination() {
  const [routeInfo, setRouteInfo] = useState<RouteInfo>({
    routeFrom: "",
    routeTo: "",
  });
  // replace useState with context

  const { routeFrom, routeTo } = routeInfo;

  const handleRouteInfoChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const currentRouteKey: string = e.target.placeholder === "From where" ? 'routeFrom' : 'routeTo';

    setRouteInfo(prevState => ({
      ...prevState,
      [currentRouteKey]: e.target.value
    }))
  }
  

  return (
    <div className="bg-cyan-100 min-h-48 flex justify-center items-center pt-20 pb-10 mb-20">
      <div className="flex flex-col items-center">
        <h4 className="text-3xl font-bold mb-6 text-center">
          Where do you want to travel today?
        </h4>
        <div className="rounded-lg py-3 px-4 bg-white shadow-lg mb-3">
          <div className="flex">
            <input
              type="text"
              className="border-[1px] border-black rounded-l-lg border-right-[1px] border-r-[0px] py-3 px-4 text-lg w-5/12 border-opacity-40"
              placeholder="From where"
              value={routeFrom}
              onChange={(e) => handleRouteInfoChange(e)}
            />
            <input
              type="text"
              className="border-[1px] border-black border-right-[1px] py-3 px-4 text-lg w-5/12 border-opacity-40"
              placeholder="To where"
              value={routeTo}
              onChange={(e) => handleRouteInfoChange(e)}
            />
            <NavLink
              to="/foundRoute"
              className="bg-green-500 w-2/12 rounded-r-lg uppercase text-white font-bold text-center py-3"
            >
              Search
            </NavLink>
          </div>
        </div>
        <button className="text-cyan-700 font-bold">Add stop on the way</button>
      </div>
    </div>
  );
}
