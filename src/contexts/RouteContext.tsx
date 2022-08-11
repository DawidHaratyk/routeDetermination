import { createContext, Dispatch, SetStateAction } from "react";
import { RouteInfo } from "../types";

interface RouteContextInterface {
  routeInfo: RouteInfo;
  setRouteInfo: Dispatch<SetStateAction<RouteInfo>>;
}

export const RouteContext = createContext({} as RouteContextInterface);
