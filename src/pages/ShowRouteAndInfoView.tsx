import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom';
import { Routing, ShowRouteWrapper } from '../components/index';
import { HistoryRouteItem } from '../components/HistoryRouteItem';
import { useRoute } from '../contexts/RouteContext';
import { useTransferredState } from '../hooks/useTransferredState';
import { useBounds } from '../hooks/useBounds';

export const ShowRouteAndInfoView = () => {
  const [canRouteBeCalculated, setCanRouteBeCalculated] = useState(true);

  const navigate = useNavigate();

  const { routeInfo, routesHistoryList, setRoutesHistoryList } = useRoute();

  const {
    routeFrom,
    firstIntermediateStop,
    secondIntermediateStop,
    routeTo,
    state,
  } = useTransferredState();

  const { mapBounds, routingBounds } = useBounds();

  let allLocationsInRoute = ``;

  const lastElemenentOfRoutesHistoryList =
    routesHistoryList[routesHistoryList.length - 1];

  const displayHistoryRouteItemIfCanBeCalculated = canRouteBeCalculated ? (
    lastElemenentOfRoutesHistoryList && (
      <HistoryRouteItem
        historyRoute={lastElemenentOfRoutesHistoryList}
        index={0}
        additionalClassNames="w-full"
      />
    )
  ) : (
    <div className="flex w-full h-16 md:px-12 bg-green-50 border-2 border-green-500 rounded-md mb-3 items-center justify-center">
      <h2 className="text-center">This route cannot be traveled by car</h2>
    </div>
  );

  const firstViaWaypoint =
    firstIntermediateStop.title &&
    `&via=${firstIntermediateStop.position.latitude},${firstIntermediateStop.position.longitude}`;
  const secondViaWaypoint =
    secondIntermediateStop.title &&
    `&via=${secondIntermediateStop.position.latitude},${secondIntermediateStop.position.longitude}`;

  for (const [index, place] of state.entries()) {
    place.title &&
      (allLocationsInRoute = allLocationsInRoute.concat(
        `${place.title}${index === 3 ? '' : ' - '}`
      ));
  }

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
              duration: ` ${days ? days + 'days' : ''} ${
                hours ? hours + 'hours' : ''
              } ${minutes ? minutes + 'minutes' : ''}`,
              cost: ` ${cost}zł`,
            },
          ]);
        } else setCanRouteBeCalculated(false);
      });
  }, [
    allLocationsInRoute,
    firstViaWaypoint,
    routeFrom.position.latitude,
    routeFrom.position.longitude,
    routeInfo.ratePerKilometer,
    routeTo.position.latitude,
    routeTo.position.longitude,
    secondViaWaypoint,
    setRoutesHistoryList,
  ]);

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
        style={{ height: '60vh', width: '80vw', marginBottom: '50px' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Routing routingBounds={routingBounds} />
      </MapContainer>
      <div className="flex justify-center">
        {displayHistoryRouteItemIfCanBeCalculated}
      </div>
    </ShowRouteWrapper>
  );
};
