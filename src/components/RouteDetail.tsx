import React, { memo } from "react";

interface IRouteDetail {
  containerClasses?: string;
  detailName: string;
  detailValue: string | number;
}

export const RouteDetail = memo(
  ({ containerClasses = "text-xs", detailName, detailValue }: IRouteDetail) => {
    return (
      <span className={containerClasses} data-testid="container">
        {detailName}
        <span className="font-bold" data-testid="value">
          {detailValue}
        </span>
      </span>
    );
  }
);
