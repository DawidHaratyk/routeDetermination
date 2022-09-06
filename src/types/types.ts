export interface SingleRoute {
  position: {
    latitude: number;
    longitude: number;
  };
  title: string;
}

export interface RouteInfo {
  routeFrom: string;
  routeTo: string;
  firstIntermediateStop: string;
  secondIntermediateStop: string;
  ratePerKilometer: number;
}

export interface HistoryRoute {
  name: string;
  distance: string;
  duration: string;
  cost: string;
}
