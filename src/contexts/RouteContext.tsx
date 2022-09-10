import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { HistoryRoute, RouteInfo } from "../types";

interface RouteContextInterface {
  routeInfo: RouteInfo;
  setRouteInfo: Dispatch<SetStateAction<RouteInfo>>;
  routesHistoryList: HistoryRoute[];
  setRoutesHistoryList: Dispatch<SetStateAction<HistoryRoute[]>>;
}

interface RouteProviderI {
  children: ReactNode;
}

const RouteContext = createContext<RouteContextInterface | null>(null);

export const RouteProvider = ({ children }: RouteProviderI) => {
  const [routeInfo, setRouteInfo] = useState<RouteInfo>({
    routeFrom: "",
    routeTo: "",
    firstIntermediateStop: "",
    secondIntermediateStop: "",
    ratePerKilometer: 0.5,
  });

  const [routesHistoryList, setRoutesHistoryList] = useState<HistoryRoute[]>(
    []
  );

  return (
    <RouteContext.Provider
      value={{
        routeInfo,
        setRouteInfo,
        routesHistoryList,
        setRoutesHistoryList,
      }}
    >
      {children}
    </RouteContext.Provider>
  );
};

export const useRoute = () => {
  const routeContext = useContext(RouteContext);

  if (!routeContext) {
    throw new Error("useRoute must be use inside RouteProvider!");
  }

  return routeContext;
};
