import React, { memo, useCallback, useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { ToastContainer, toast, ToastItem } from "react-toastify";
import { RouteInfo, SingleRoute } from "../types";
import { useNotificationCenter } from "react-toastify/addons/use-notification-center";
import "react-toastify/dist/ReactToastify.css";
import { allLocations, API } from "../constants";
import { Input } from "./index";
import { useRoute } from "../contexts/RouteContext";

const defaultRouteItem: SingleRoute = {
  position: {
    latitude: 0,
    longitude: 0,
  },
  title: "",
};

const customToastId1: string = "toast-id-1";
const customToastId2: string = "toast-id-2";
const customToastId3: string = "toast-id-3";
const customToastId4: string = "toast-id-4";

export const RouteDetermination = memo(() => {
  const [fetchedRoute, setFetchedRoute] = useState<SingleRoute[]>([
    defaultRouteItem,
    defaultRouteItem,
    defaultRouteItem,
    defaultRouteItem,
  ]);
  const [areIntermediateStopsVisible, setAreIntermediateStopsVisible] =
    useState<boolean>(false);

  const { routeInfo, setRouteInfo } = useRoute();
  const {
    routeFrom,
    routeTo,
    firstIntermediateStop,
    secondIntermediateStop,
    ratePerKilometer,
  } = routeInfo;

  const navigate: NavigateFunction = useNavigate();

  const { notifications, remove } = useNotificationCenter<{}>();

  const apiUrlList = allLocations.map((apiLocation) => {
    // creating array of all api url's
    if (apiLocation === "routeFrom")
      return routeFrom && `${API}${encodeURIComponent(routeFrom)}`;
    if (apiLocation === "routeTo")
      return routeTo && `${API}${encodeURIComponent(routeTo)}`;
    if (apiLocation === "firstIntermediateStop")
      return `${API}${encodeURIComponent(firstIntermediateStop)}`;
    if (apiLocation === "secondIntermediateStop")
      return `${API}${encodeURIComponent(secondIntermediateStop)}`;
  });

  const [
    routeFromAPI,
    routeToAPI,
    firstIntermediateStopAPI,
    secondIntermediateStopAPI,
  ] = apiUrlList as string[];

  const handleRouteInfoChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const currentRouteKey: string | null =
        e.target.getAttribute("data-route-key");

      currentRouteKey &&
        setRouteInfo((prevState) => ({
          ...prevState,
          [currentRouteKey]: e.target.value,
        }));
    },
    [setRouteInfo]
  );

  const handleNotify = () => {
    const isFetchingFirstIntermediateStop: boolean =
      areIntermediateStopsVisible && firstIntermediateStop.length
        ? true
        : false;
    const isFetchingSecondIntermediateStop =
      areIntermediateStopsVisible && secondIntermediateStop.length
        ? true
        : false;

    fetch(routeFromAPI)
      .then((response) => response.json())
      .then((data) => {
        const { position, title } = data.items[0];

        data.items.length
          ? setFetchedRoute((prevState) => {
              const newFetchedRoute = prevState.map((locationItem, key) => {
                if (key === 0)
                  return {
                    position: {
                      latitude: position.lat,
                      longitude: position.lng,
                    },
                    title,
                  };
                else return locationItem;
              });

              return newFetchedRoute;
            })
          : toast.warn("Wrong from where value entered!", {
              toastId: customToastId1,
            });
      })
      .catch(() => {
        setFetchedRoute((prevState) => {
          const newFetchedRoute = prevState.map((locationItem, key) => {
            if (key === 0) return defaultRouteItem;
            else return locationItem;
          });

          return newFetchedRoute;
        });
        toast.warn("Wrong from where value entered!", {
          toastId: customToastId1,
        });
      });

    fetch(routeToAPI)
      .then((response) => response.json())
      .then((data) => {
        const { position, title } = data.items[0];

        data.items.length
          ? setFetchedRoute((prevState) => {
              const newFetchedRoute = prevState.map((locationItem, key) => {
                if (key === 3)
                  return {
                    position: {
                      latitude: position.lat,
                      longitude: position.lng,
                    },
                    title,
                  };
                else return locationItem;
              });

              return newFetchedRoute;
            })
          : toast.warn("Wrong from where value entered!", {
              toastId: customToastId2,
            });
      })
      .catch(() => {
        setFetchedRoute((prevState) => {
          const newFetchedRoute = prevState.map((locationItem, key) => {
            if (key === 3) return defaultRouteItem;
            else return locationItem;
          });

          return newFetchedRoute;
        });
        toast.warn("Wrong from to value entered!", {
          toastId: customToastId2,
        });
      });

    isFetchingFirstIntermediateStop &&
      fetch(firstIntermediateStopAPI)
        .then((response) => response.json())
        .then((data) => {
          const { position, title } = data.items[0];

          data.items.length &&
            setFetchedRoute((prevState) => {
              const newFetchedRoute = prevState.map((locationItem, key) => {
                if (key === 1)
                  return {
                    position: {
                      latitude: position.lat,
                      longitude: position.lng,
                    },
                    title,
                  };
                else return locationItem;
              });

              return newFetchedRoute;
            });
        })
        .catch(() => {
          setFetchedRoute((prevState) => {
            const newFetchedRoute = prevState.map((locationItem, key) => {
              if (key === 1) return defaultRouteItem;
              else return locationItem;
            });

            return newFetchedRoute;
          });

          toast.warn("Wrong first intermediate stop value entered!", {
            toastId: customToastId3,
          });
        });

    isFetchingSecondIntermediateStop &&
      fetch(secondIntermediateStopAPI)
        .then((response) => response.json())
        .then((data) => {
          const { position, title } = data.items[0];

          data.items.length &&
            setFetchedRoute((prevState) => {
              const newFetchedRoute = prevState.map((locationItem, key) => {
                if (key === 2)
                  return {
                    position: {
                      latitude: position.lat,
                      longitude: position.lng,
                    },
                    title,
                  };
                else return locationItem;
              });

              return newFetchedRoute;
            });
        })
        .catch(() => {
          setFetchedRoute((prevState) => {
            const newFetchedRoute = prevState.map((locationItem, key) => {
              if (key === 2) return defaultRouteItem;
              else return locationItem;
            });

            return newFetchedRoute;
          });

          toast.warn("Wrong second intermediate stop value entered!", {
            toastId: customToastId4,
          });
        });
  };

  const handleIntermediateStopsVisibilityAndInputsReset = (): void => {
    setFetchedRoute((prevState) => {
      const newFetchedRoute = prevState.map((locationItem, key) => {
        if (key === 1 || key === 2) return defaultRouteItem;
        else return locationItem;
      });

      return newFetchedRoute;
    });

    setRouteInfo((prevState) => ({
      ...prevState,
      firstIntermediateStop: "",
      secondIntermediateStop: "",
    }));

    setAreIntermediateStopsVisible((prevState) => !prevState);
  };

  const removeNotificationFromNotificationCenter = toast.onChange(
    (payload: ToastItem): void => {
      if (payload.status === "added") {
        setTimeout<[]>(() => {
          remove(payload.id);
        }, 3000);
      }
    }
  );

  useEffect(() => {
    removeNotificationFromNotificationCenter();

    if (
      fetchedRoute[0].title !== "" &&
      fetchedRoute[3].title !== "" &&
      !notifications.length &&
      (firstIntermediateStop ? Boolean(fetchedRoute[1].title) : true) &&
      (secondIntermediateStop ? Boolean(fetchedRoute[2].title) : true)
    ) {
      navigate(`/foundRoute`, { state: fetchedRoute });
    }
  }, [fetchedRoute, navigate, notifications]);

  useEffect(() => {
    setRouteInfo((prevState) => ({
      ...prevState,
      routeFrom: "",
      routeTo: "",
      firstIntermediateStop: "",
      secondIntermediateStop: "",
    }));
  }, [setRouteInfo]);

  return (
    <div className="bg-cyan-100 min-h-48 flex justify-center items-center pt-20 pb-10 mb-20">
      <div className="flex flex-col items-center">
        <h4 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
          Where do you want to travel today?
        </h4>
        <div className="flex justify-center items-center">
          <span className="text-lg font-semibold">Rate per kilometer: </span>
          <input
            type="number"
            className="border-[1px] border-black rounded py-1 px-4 text-lg w-1/4 border-opacity-40 ml-4"
            data-route-key="ratePerKilometer"
            value={ratePerKilometer}
            onChange={(e) => handleRouteInfoChange(e)}
          />
        </div>
        <div className="rounded-lg py-3 px-4 bg-white shadow-lg my-3 w-11/12 sm:w-auto">
          <div className="flex">
            <Input
              classes="border-[1px] border-black rounded-l-lg border-right-[1px] border-r-[0px] py-3 px-4 text-sm sm:text-lg w-1/3 sm:w-5/12 border-opacity-40"
              placeholder="From where"
              dataRouteKey="routeFrom"
              value={routeFrom}
              handleRouteInfoChange={handleRouteInfoChange}
            />
            <Input
              classes="border-[1px] border-black border-right-[1px] py-3 px-4 text-sm sm:text-lg w-1/3 sm:w-5/12 border-opacity-40"
              placeholder="To where"
              dataRouteKey="routeTo"
              value={routeTo}
              handleRouteInfoChange={handleRouteInfoChange}
            />
            <button
              className="bg-green-500 w-1/3 sm:w-1/6 rounded-r-lg uppercase text-white font-bold text-center py-3 px-1 text-sm sm:text-lg"
              onClick={handleNotify}
            >
              Search
            </button>
          </div>
          {areIntermediateStopsVisible && (
            <div className="flex mt-3">
              <Input
                classes="border-[1px] border-black rounded-l-lg border-right-[1px] border-r-[0px] py-3 px-4 text-sm sm:text-lg w-1/3 sm:w-5/12 border-opacity-40"
                placeholder="Intermediate stop 1"
                dataRouteKey="firstIntermediateStop"
                value={firstIntermediateStop}
                handleRouteInfoChange={handleRouteInfoChange}
              />
              <Input
                classes="border-[1px] border-black rounded-r-lg border-right-[1px] py-3 px-4 text-sm sm:text-lg w-1/3 sm:w-5/12 border-opacity-40"
                placeholder="Intermediate stop 2"
                dataRouteKey="secondIntermediateStop"
                value={secondIntermediateStop}
                handleRouteInfoChange={handleRouteInfoChange}
              />
            </div>
          )}
        </div>
        <button
          className="text-cyan-700 font-bold mb-3"
          onClick={handleIntermediateStopsVisibilityAndInputsReset}
        >
          {areIntermediateStopsVisible
            ? "Hide intermediate stops"
            : "Add intermediate stops"}
        </button>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
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
});
