import React, { useContext, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngBoundsExpression } from "leaflet";
import {
  Location,
  NavigateFunction,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { SingleRoute } from "../types";
import Routing from "../components/Routing";
import { RouteContext } from "../contexts/RouteContext";
// fix problem with these styles above (warning)

export function ShowRouteAndInfoView() {
  const { routeInfo, setRouteInfo, setRoutesHistoryList } =
    useContext(RouteContext);

  const location: Location = useLocation();
  const navigate: NavigateFunction = useNavigate();

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

  const bounds: LatLngBoundsExpression = [
    [routeFrom.position.latitude, routeFrom.position.longitude],
    [routeTo.position.latitude, routeTo.position.longitude],
  ];

  firstIntermediateStop.title &&
    bounds.push([
      firstIntermediateStop.position.latitude,
      firstIntermediateStop.position.longitude,
    ]);
  secondIntermediateStop.title &&
    bounds.push([
      secondIntermediateStop.position.latitude,
      secondIntermediateStop.position.longitude,
    ]);

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    // console.log(double distance);

    fetch(
      `https://router.hereapi.com/v8/routes?legattributes=wp,sm&transportMode=car&origin=${routeFrom.position.latitude.toFixed(
        4
      )},${routeFrom.position.longitude.toFixed(
        4
      )}&destination=${routeTo.position.latitude.toFixed(
        4
      )},${routeTo.position.longitude.toFixed(
        4
      )}&return=summary&apikey=rMOBREZMv1w_dZylksrpQ3ONx6ApOyj6yDh7XCeQdds`
    )
      .then((response) => response.json())
      .then((data) => {
        // change it into days, hours and minutes, not only minutes
        const minutes = (
          data.routes[0].sections[0].summary.duration / 60
        ).toString();

        console.log(data.routes[0].sections[0]);

        setRoutesHistoryList((prevState) => [
          ...prevState,
          {
            name: allLocationsInRoute,
            distance: "15536km",
            duration: minutes,
            cost: "800zł",
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
        <h2 className="mt-12 mb-6">{allLocationsInRoute}</h2>
        <MapContainer
          bounds={bounds}
          scrollWheelZoom={true}
          style={{ height: "60vh", width: "80vw", marginBottom: "50px" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Routing bounds={bounds} />
        </MapContainer>
        <div>
          <span>Koszt przejazdu: {}zł</span>
          <span>Czas przejazdu: {routeInfo.ratePerKilometer} minutes</span>
        </div>
      </div>
    </>
  );
}
