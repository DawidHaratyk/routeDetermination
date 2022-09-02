import React, { memo } from "react";

interface InputI {
  classes: string;
  placeholder: string;
  dataRouteKey: string;
  value: string;
  handleRouteInfoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = memo(
  ({
    classes,
    placeholder,
    dataRouteKey,
    value,
    handleRouteInfoChange,
  }: InputI) => {
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
