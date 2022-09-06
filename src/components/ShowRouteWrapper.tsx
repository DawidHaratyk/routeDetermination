import React, { ReactNode } from "react";

interface ShowRouteWrapperI {
  children: ReactNode;
}

export function ShowRouteWrapper({ children }: ShowRouteWrapperI) {
  return (
    <div className="flex flex-col items-center text-lg font-semibold w-4/5 h-3/5 mx-auto">
      {children}
    </div>
  );
}
