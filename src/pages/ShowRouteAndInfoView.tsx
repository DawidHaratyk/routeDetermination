import React, { useContext, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngBoundsExpression } from "leaflet";
import {
  Location,
  NavigateFunction,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { SingleRoute } from "../types";
import { Routing } from "../components/index";
import { RouteContext } from "../contexts/RouteContext";
import { HistoryRouteItem } from "../components/HistoryRouteItem";
// fix problem with these styles above (warning)

export function ShowRouteAndInfoView() {
  const { routeInfo, routesHistoryList, setRoutesHistoryList } =
    useContext(RouteContext);

  const navigate: NavigateFunction = useNavigate();

  const location: Location = useLocation();
  const state = location.state as SingleRoute[];

  const [
    routeFrom,
    firstIntermediateStop,
    secondIntermediateStop,
    routeTo,
  ]: SingleRoute[] = state;

  let allLocationsInRoute: string = ``;

  for (const [index, place] of state.entries()) {
    place.title &&
      (allLocationsInRoute = allLocationsInRoute.concat(
        `${place.title}${index === 3 ? "" : " - "}`
      ));
  }

  const mapBounds: LatLngBoundsExpression = [
    [routeFrom.position.latitude, routeFrom.position.longitude],
    [routeTo.position.latitude, routeTo.position.longitude],
  ];

  const routingBounds: number[][] = [
    [routeFrom.position.latitude, routeFrom.position.longitude],
    [routeTo.position.latitude, routeTo.position.longitude],
  ];

  firstIntermediateStop.title &&
    mapBounds.push([
      firstIntermediateStop.position.latitude,
      firstIntermediateStop.position.longitude,
    ]);

  firstIntermediateStop.title &&
    routingBounds.splice(1, 0, [
      firstIntermediateStop.position.latitude,
      firstIntermediateStop.position.longitude,
    ]);

  secondIntermediateStop.title &&
    mapBounds.push([
      secondIntermediateStop.position.latitude,
      secondIntermediateStop.position.longitude,
    ]);

  secondIntermediateStop.title &&
    routingBounds.splice(routingBounds.length === 3 ? 2 : 1, 0, [
      secondIntermediateStop.position.latitude,
      secondIntermediateStop.position.longitude,
    ]);

  const firstViaWaypoint: string =
    firstIntermediateStop.title &&
    `&via=${firstIntermediateStop.position.latitude},${firstIntermediateStop.position.longitude}`;
  const secondViaWaypoint: string =
    secondIntermediateStop.title &&
    `&via=${secondIntermediateStop.position.latitude},${secondIntermediateStop.position.longitude}`;

  const handleGoBack = (): void => {
    navigate(-1);
  };

  useEffect(() => {
    fetch(
      `https://router.hereapi.com/v8/routes?&transportMode=car&return=summary&origin=${routeFrom.position.latitude},${routeFrom.position.longitude}&destination=${routeTo.position.latitude},${routeTo.position.longitude}${firstViaWaypoint}${secondViaWaypoint}&apikey=rMOBREZMv1w_dZylksrpQ3ONx6ApOyj6yDh7XCeQdds`
    )
      .then((response) => response.json())
      .then((data) => {
        let seconds: number = 0;
        let kilometers: number = 0;

        for (const partRoute of data.routes[0].sections) {
          const partRouteDistance = partRoute.summary.length;
          const partRouteDuration = partRoute.summary.duration;
          kilometers += partRouteDistance;
          seconds += partRouteDuration;
        }

        kilometers = Number((kilometers / 1000).toFixed());

        const days: number = Math.floor(seconds / 86400);
        const hours: number = Math.floor((seconds / 3600) % 24);
        const minutes: number = Math.floor((seconds / 60) % 60);

        const cost: number = Number(
          (kilometers * routeInfo.ratePerKilometer * 1.1).toFixed()
        );

        setRoutesHistoryList((prevState) => [
          ...prevState,
          {
            name: allLocationsInRoute,
            distance: ` ${kilometers}km`,
            duration: ` ${days ? days + "days" : ""} ${
              hours ? hours + "hours" : ""
            } ${minutes ? minutes + "minutes" : ""}`,
            cost: ` ${cost}zł`,
          },
        ]);
      });
  }, []);

  return (
    <>
      <div className="flex flex-col items-center text-lg font-semibold w-4/5 h-3/5 mx-auto">
        <button
          className="rounded text-green-500 font-bold text-center py-2 px-4 border-2 border-green-500 self-start mt-10"
          onClick={handleGoBack}
        >
          Go back
        </button>
        <h2 className="mt-8 sm:mt-12 mb-6 text-sm sm:text-lg">
          {allLocationsInRoute}
        </h2>
        <MapContainer
          bounds={mapBounds}
          scrollWheelZoom={true}
          style={{ height: "60vh", width: "80vw", marginBottom: "50px" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Routing routingBounds={routingBounds} />
        </MapContainer>
        <div className="flex justify-center">
          <HistoryRouteItem
            historyRoute={{
              name: allLocationsInRoute,
              distance:
                routesHistoryList[routesHistoryList.length - 1].distance,
              duration:
                routesHistoryList[routesHistoryList.length - 1].duration,
              cost: routesHistoryList[routesHistoryList.length - 1].cost,
            }}
            index={0}
            additionalClassNames="w-full"
          />
        </div>
      </div>
    </>
  );
}
