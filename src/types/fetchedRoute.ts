interface SingleRoute {
  position: {
    latitude: number;
    longitude: number;
  };
  title: string;
}

export interface FetchedRoute {
  routeFrom: SingleRoute;
  routeTo: SingleRoute;
  firstIntermediateStop: SingleRoute;
  secondIntermediateStop: SingleRoute;
}
