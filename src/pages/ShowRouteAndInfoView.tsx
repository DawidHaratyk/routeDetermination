import React, { useEffect, useState } from "react";
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
import { Routing, ShowRouteWrapper } from "../components/index";
import { HistoryRouteItem } from "../components/HistoryRouteItem";
import { useRoute } from "../contexts/RouteContext";
// fix problem with these styles above (warning)

export const ShowRouteAndInfoView = () => {
  const [canRouteBeCalculated, setCanRouteBeCalculated] = useState(true);

  const { routeInfo, routesHistoryList, setRoutesHistoryList } = useRoute();

  const navigate: NavigateFunction = useNavigate();

  const location: Location = useLocation();
  const state = location.state as SingleRoute[];

  const [routeFrom, firstIntermediateStop, secondIntermediateStop, routeTo] =
    state;

  let allLocationsInRoute = ``;
  const lastElemenentOfRoutesHistoryList =
    routesHistoryList[routesHistoryList.length - 1];

  console.log(lastElemenentOfRoutesHistoryList);

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

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    fetch(
      `https://router.hereapi.com/v8/routes?&transportMode=car&return=summary&origin=${routeFrom.position.latitude},${routeFrom.position.longitude}&destination=${routeTo.position.latitude},${routeTo.position.longitude}${firstViaWaypoint}${secondViaWaypoint}&apikey=rMOBREZMv1w_dZylksrpQ3ONx6ApOyj6yDh7XCeQdds`
    )
      .then((response) => response.json())
      .then((data) => {
        let seconds = 0;
        let kilometers = 0;

        // check if route can be calculated
        if (data.notices.length < 2) {
          for (const partRoute of data.routes[0].sections) {
            const partRouteDistance: number = partRoute.summary.length;
            const partRouteDuration: number = partRoute.summary.duration;
            kilometers += partRouteDistance;
            seconds += partRouteDuration;
          }

          kilometers = Number((kilometers / 1000).toFixed());

          const days = Math.floor(seconds / 86400);
          const hours = Math.floor((seconds / 3600) % 24);
          const minutes = Math.floor((seconds / 60) % 60);

          const cost = Number(
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
        } else setCanRouteBeCalculated(false);

        // do I want to not display fetched route(but can't be done driving by car)? In the history routes
      });
  }, []);

  return (
    <ShowRouteWrapper>
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
        {canRouteBeCalculated ? (
          lastElemenentOfRoutesHistoryList && (
            <HistoryRouteItem
              historyRoute={lastElemenentOfRoutesHistoryList}
              index={0}
              additionalClassNames="w-full"
            />
          )
        ) : (
          <h3>The route can't be done driving by car</h3>
        )}
      </div>
    </ShowRouteWrapper>
  );
};
