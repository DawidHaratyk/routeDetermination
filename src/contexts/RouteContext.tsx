import { createContext, Dispatch, SetStateAction } from "react";
import { HistoryRoute, RouteInfo } from "../types";

interface RouteContextInterface {
  routeInfo: RouteInfo;
  setRouteInfo: Dispatch<SetStateAction<RouteInfo>>;
  routesHistoryList: HistoryRoute[] | [];
  setRoutesHistoryList: Dispatch<SetStateAction<HistoryRoute[] | []>>;
}

export const RouteContext = createContext({} as RouteContextInterface);
