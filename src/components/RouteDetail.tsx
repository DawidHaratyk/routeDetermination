import classNames from "classnames";
import React from "react";

interface IRouteDetail {
  containerClasses?: string;
  detailName: string;
  detailValue: string | number;
}

export function RouteDetail({
  containerClasses = "text-xs",
  detailName,
  detailValue,
}: IRouteDetail) {
  const className: string = classNames(`${containerClasses}`, {
    "inline-block w-60": containerClasses !== "text-xs",
  });
  return (
    <span className={className}>
      {detailName}
      <span className="font-semibold">{detailValue}</span>
    </span>
  );
}
