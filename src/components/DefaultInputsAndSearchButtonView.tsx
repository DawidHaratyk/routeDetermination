import React, { memo } from "react";
import { getRoute } from "../services/route.service";
import { SingleRoute } from "../types";
import { Input } from "./index";
import { defaultRouteItem } from "../constants";
import { toast } from "react-toastify";
import { useApiUrls } from "../hooks/useApiUrls";

interface DefaultInputsAndSearchButtonViewI {
  handleRouteInfoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  areIntermediateStopsVisible: boolean;
  setFetchedRoute: React.Dispatch<React.SetStateAction<SingleRoute[]>>;
  routeFrom: string;
  routeTo: string;
  firstIntermediateStop: string;
  secondIntermediateStop: string;
}

const customToastId1: string = "toast-id-1";
const customToastId2: string = "toast-id-2";
const customToastId3: string = "toast-id-3";
const customToastId4: string = "toast-id-4";

export const DefaultInputsAndSearchButtonView = memo(
  ({
    handleRouteInfoChange,
    areIntermediateStopsVisible,
    setFetchedRoute,
    routeFrom,
    routeTo,
    firstIntermediateStop,
    secondIntermediateStop,
  }: DefaultInputsAndSearchButtonViewI) => {
    const {
      routeFromAPI,
      routeToAPI,
      firstIntermediateStopAPI,
      secondIntermediateStopAPI,
    } = useApiUrls();

    console.log("render DefaultInputsAndSearchButtonView");

    const handleNotify = async () => {
      const isFetchingFirstIntermediateStop: boolean =
        areIntermediateStopsVisible && firstIntermediateStop.length
          ? true
          : false;
      const isFetchingSecondIntermediateStop =
        areIntermediateStopsVisible && secondIntermediateStop.length
          ? true
          : false;

      try {
        const data = await getRoute(routeFromAPI);

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
      } catch (error) {
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
      }

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

    return (
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
    );
  }
);
