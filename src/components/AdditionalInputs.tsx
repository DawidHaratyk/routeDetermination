import React from "react";
import { Input } from "./Input";

interface AdditionalInputsI {
  firstIntermediateStop: string;
  secondIntermediateStop: string;
  handleRouteInfoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AdditionalInputs = ({
  firstIntermediateStop,
  secondIntermediateStop,
  handleRouteInfoChange,
}: AdditionalInputsI) => {
  return (
    <div className="flex mt-3">
      <Input
        classes="border-[1px] border-black rounded-l-lg border-right-[1px] border-r-[0px] py-3 px-4 text-sm sm:text-lg w-1/3 sm:w-5/12 border-opacity-40"
        placeholder="Intermediate stop 1"
        dataRouteKey="firstIntermediateStop"
        value={firstIntermediateStop}
        handleRouteInfoChange={handleRouteInfoChange}
      />
      <Input
        classes="border-[1px] border-black rounded-r-lg border-right-[1px] py-3 px-4 text-sm sm:text-lg w-1/3 sm:w-5/12 border-opacity-40"
        placeholder="Intermediate stop 2"
        dataRouteKey="secondIntermediateStop"
        value={secondIntermediateStop}
        handleRouteInfoChange={handleRouteInfoChange}
      />
    </div>
  );
};
