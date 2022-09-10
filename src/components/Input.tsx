import React, { memo } from "react";
import { useRouteInfoChange } from "../hooks/useRouteInfoChange";

interface InputI {
  classes: string;
  placeholder: string;
  dataRouteKey: string;
  value: string;
}

export const Input = memo(
  ({ classes, placeholder, dataRouteKey, value }: InputI) => {
    const { handleRouteInfoChange } = useRouteInfoChange();

    return (
      <input
        type="text"
        className={classes}
        placeholder={placeholder}
        data-route-key={dataRouteKey}
        value={value}
        onChange={(e) => handleRouteInfoChange(e)}
      />
    );
  }
);
