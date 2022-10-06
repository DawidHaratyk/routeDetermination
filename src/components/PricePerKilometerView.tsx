import { memo } from "react";
import { useRouteInfoChange } from "../hooks/useRouteInfoChange";

interface PricePerKilometerViewI {
  ratePerKilometer: number;
}

export const PricePerKilometerView = memo(
  ({ ratePerKilometer }: PricePerKilometerViewI) => {
    const { handleRouteInfoChange } = useRouteInfoChange();

    return (
      <div className="flex justify-center items-center">
        <span className="text-lg font-semibold">Rate per kilometer: </span>
        <input
          type="number"
          className="border-[1px] border-black rounded py-1 px-4 text-lg w-1/4 border-opacity-40 ml-4"
          data-route-key="ratePerKilometer"
          value={ratePerKilometer}
          onChange={(e) => handleRouteInfoChange(e)}
        />
      </div>
    );
  }
);
