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
  return (
    <span className={containerClasses}>
      {detailName}
      <span className="font-semibold"> {detailValue}</span>
    </span>
  );
}
