import React from "react";
import { NavLink } from "react-router-dom";

export function RouteDetermination() {
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
            />
            <input
              type="text"
              className="border-[1px] border-black border-right-[1px] py-3 px-4 text-lg w-5/12 border-opacity-40"
              placeholder="To where"
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
