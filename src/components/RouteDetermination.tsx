import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RouteContext } from "../contexts/RouteContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface SingleRoute {
  position: {
    latitude: number;
    longitude: number;
  };
  title: string;
}

interface FetchedRoute {
  routeFrom: SingleRoute;
  routeTo: SingleRoute;
}

export function RouteDetermination() {
  const [fetchedRoute, setFetchedRoute] = useState<FetchedRoute>({
    routeFrom: {
      position: {
        latitude: 0,
        longitude: 0,
      },
      title: "",
    },
    routeTo: {
      position: {
        latitude: 0,
        longitude: 0,
      },
      title: "",
    },
  });
  const [areIntermediateStopsVisible, setAreIntermediateStopsVisible] =
    useState<boolean>(false);

  const navigate = useNavigate();

  const { routeInfo, setRouteInfo } = useContext(RouteContext);
  const { routeFrom, routeTo } = routeInfo;

  const routeFromAPI =
    routeFrom &&
    `https://geocode.search.hereapi.com/v1/geocode?apikey=rMOBREZMv1w_dZylksrpQ3ONx6ApOyj6yDh7XCeQdds&q=${encodeURIComponent(
      routeFrom
    )}`;

  const routeToAPI =
    routeTo &&
    `https://geocode.search.hereapi.com/v1/geocode?apikey=rMOBREZMv1w_dZylksrpQ3ONx6ApOyj6yDh7XCeQdds&q=${encodeURIComponent(
      routeTo
    )}`;

  const handleRouteInfoChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const currentRouteKey: string =
      e.target.placeholder === "From where" ? "routeFrom" : "routeTo";

    setRouteInfo((prevState) => ({
      ...prevState,
      [currentRouteKey]: e.target.value,
    }));
  };
  // find out if it'll be better to use useCallback above

  const handleNotify = () => {
    fetch(routeFromAPI)
      .then((response) => response.json())
      .then((data) => {
        const { position, title } = data.items[0];

        data.items.length
          ? setFetchedRoute((prevState) => ({
              ...prevState,
              routeFrom: {
                position: {
                  latitude: position.lat,
                  longitude: position.lng,
                },
                title,
              },
            }))
          : toast.warn("Wrong from where value entered!");
      })
      .catch(() => toast.warn("Wrong from where value entered!"));

    fetch(routeToAPI)
      .then((response) => response.json())
      .then((data) => {
        const { position, title } = data.items[0];

        data.items.length
          ? setFetchedRoute((prevState) => ({
              ...prevState,
              routeTo: {
                position: {
                  latitude: position.lat,
                  longitude: position.lng,
                },
                title,
              },
            }))
          : toast.warn("Wrong from where value entered!");
      })
      .catch(() => toast.warn("Wrong from to value entered!"));

    fetch(`https://route.ls.hereapi.com/routing/7.2/calculateroute.xml
      ?apiKey=rMOBREZMv1w_dZylksrpQ3ONx6ApOyj6yDh7XCeQdds
      &waypoint0=geo!50.8857,14.81589
      &waypoint1=geo!50.8681536,14.8308207
      &routeattributes=wp,sm,sh,sc
      &mode=fastest;car`)
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  const handleIntermediateStopsVisibility = () =>
    setAreIntermediateStopsVisible((prevState) => !prevState);

  useEffect(() => {
    if (
      fetchedRoute.routeFrom.title !== "" &&
      fetchedRoute.routeTo.title !== ""
    ) {
      navigate("/foundRoute", { state: fetchedRoute });
    }
  }, [fetchedRoute, navigate]);

  return (
    <div className="bg-cyan-100 min-h-48 flex justify-center items-center pt-20 pb-10 mb-20">
      <div className="flex flex-col items-center">
        <h4 className="text-3xl font-bold mb-6 text-center">
          Where do you want to travel today?
        </h4>
        <div className="rounded-lg py-3 px-4 bg-white shadow-lg mb-3">
          <div className="flex">
            {/* make this input a component */}
            <input
              type="text"
              className="border-[1px] border-black rounded-l-lg border-right-[1px] border-r-[0px] py-3 px-4 text-lg w-5/12 border-opacity-40"
              placeholder="From where"
              data-route-key="routeFrom"
              value={routeFrom}
              onChange={(e) => handleRouteInfoChange(e)}
            />
            <input
              type="text"
              className="border-[1px] border-black border-right-[1px] py-3 px-4 text-lg w-5/12 border-opacity-40"
              placeholder="To where"
              data-route-key="routeTo"
              value={routeTo}
              onChange={(e) => handleRouteInfoChange(e)}
            />
            <button
              className="bg-green-500 w-2/12 rounded-r-lg uppercase text-white font-bold text-center py-3"
              onClick={handleNotify}
            >
              Search
            </button>
          </div>
          {areIntermediateStopsVisible && (
            <div className="flex mt-3">
              <input
                type="text"
                className="border-[1px] border-black rounded-l-lg border-right-[1px] border-r-[0px] py-3 px-4 text-lg w-5/12 border-opacity-40"
                placeholder="Intermediate stop 1"
                data-route-key="firstIntermediateStop"
                value={routeFrom}
                onChange={(e) => handleRouteInfoChange(e)}
              />
              <input
                type="text"
                className="border-[1px] border-black rounded-r-lg border-right-[1px] py-3 px-4 text-lg w-5/12 border-opacity-40"
                placeholder="Intermediate stop 2"
                data-route-key="secondIntermediateStop"
                // value={routeTo}
                // onChange={(e) => handleRouteInfoChange(e)}
              />
            </div>
          )}
        </div>
        <button
          className="text-cyan-700 font-bold"
          onClick={handleIntermediateStopsVisibility}
        >
          {areIntermediateStopsVisible
            ? "Hide intermediate stops"
            : "Add intermediate stops"}
        </button>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
