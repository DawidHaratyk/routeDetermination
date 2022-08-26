import React, { useContext, useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { RouteContext } from "../contexts/RouteContext";
import { ToastContainer, toast, ToastItem } from "react-toastify";
import { SingleRoute } from "../types";
import { useNotificationCenter } from "react-toastify/addons/use-notification-center";
import "react-toastify/dist/ReactToastify.css";
import { allLocations, API } from "../constants";

export function RouteDetermination() {
  const [fetchedRoute, setFetchedRoute] = useState<SingleRoute[]>([
    {
      position: {
        latitude: 0,
        longitude: 0,
      },
      title: "",
    },
    {
      position: {
        latitude: 0,
        longitude: 0,
      },
      title: "",
    },
    {
      position: {
        latitude: 0,
        longitude: 0,
      },
      title: "",
    },
    {
      position: {
        latitude: 0,
        longitude: 0,
      },
      title: "",
    },
  ]);
  const [areIntermediateStopsVisible, setAreIntermediateStopsVisible] =
    useState<boolean>(false);

  const { routeInfo, setRouteInfo } = useContext(RouteContext);
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

  // const routeFromAPI =
  //   routeFrom &&
  //   `https://geocode.search.hereapi.com/v1/geocode?apikey=rMOBREZMv1w_dZylksrpQ3ONx6ApOyj6yDh7XCeQdds&q=${encodeURIComponent(
  //     routeFrom
  //   )}`;

  // const routeToAPI =
  //   routeTo &&
  //   `https://geocode.search.hereapi.com/v1/geocode?apikey=rMOBREZMv1w_dZylksrpQ3ONx6ApOyj6yDh7XCeQdds&q=${encodeURIComponent(
  //     routeTo
  //   )}`;

  // const firstIntermediateStopAPI = `https://geocode.search.hereapi.com/v1/geocode?apikey=rMOBREZMv1w_dZylksrpQ3ONx6ApOyj6yDh7XCeQdds&q=${encodeURIComponent(
  //   firstIntermediateStop
  // )}`;

  // const secondIntermediateStopAPI = `https://geocode.search.hereapi.com/v1/geocode?apikey=rMOBREZMv1w_dZylksrpQ3ONx6ApOyj6yDh7XCeQdds&q=${encodeURIComponent(
  //   secondIntermediateStop
  // )}`;

  const handleRouteInfoChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const currentRouteKey: string | null =
      e.target.getAttribute("data-route-key");

    currentRouteKey &&
      setRouteInfo((prevState) => ({
        ...prevState,
        [currentRouteKey]: e.target.value,
      }));
  };
  // find out if it'll be better to use useCallback above

  const handleNotify = (): void => {
    const isFetchingFirstIntermediateStop: boolean =
      areIntermediateStopsVisible && firstIntermediateStop.length
        ? true
        : false;
    const isFetchingSecondIntermediateStop =
      areIntermediateStopsVisible && secondIntermediateStop.length
        ? true
        : false;

    const customToastId1: string = "toast-id-1";
    const customToastId2: string = "toast-id-2";
    const customToastId3: string = "toast-id-3";
    const customToastId4: string = "toast-id-4";

    // can i loop over these fetches somehow? is it worth?
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
            if (key === 0)
              return {
                position: {
                  latitude: 0,
                  longitude: 0,
                },
                title: "",
              };
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
            if (key === 3)
              return {
                position: {
                  latitude: 0,
                  longitude: 0,
                },
                title: "",
              };
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
              if (key === 1)
                return {
                  position: {
                    latitude: 0,
                    longitude: 0,
                  },
                  title: "",
                };
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
              if (key === 2)
                return {
                  position: {
                    latitude: 0,
                    longitude: 0,
                  },
                  title: "",
                };
              else return locationItem;
            });

            return newFetchedRoute;
          });

          toast.warn("Wrong second intermediate stop value entered!", {
            toastId: customToastId4,
          });
        });
  };

  const handleIntermediateStopsVisibility = (): void => {
    setFetchedRoute((prevState) => {
      const newFetchedRoute = prevState.map((locationItem, key) => {
        if (key === 1 || key === 2) {
          return {
            position: {
              latitude: 0,
              longitude: 0,
            },
            title: "",
          };
        } else return locationItem;
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
      navigate("/foundRoute", { state: fetchedRoute });
    }
  }, [fetchedRoute, navigate, notifications]);

  useEffect(() => {
    console.log(routeInfo);

    setRouteInfo((prevState) => ({
      ...prevState,
      routeFrom: "",
      routeTo: "",
      firstIntermediateStop: "",
      secondIntermediateStop: "",
    }));
  }, []);

  return (
    <div className="bg-cyan-100 min-h-48 flex justify-center items-center pt-20 pb-10 mb-20">
      <div className="flex flex-col items-center">
        <h4 className="text-3xl font-bold mb-6 text-center">
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
        <div className="rounded-lg py-3 px-4 bg-white shadow-lg my-3">
          <div className="flex">
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
                value={firstIntermediateStop}
                onChange={(e) => handleRouteInfoChange(e)}
              />
              <input
                type="text"
                className="border-[1px] border-black rounded-r-lg border-right-[1px] py-3 px-4 text-lg w-5/12 border-opacity-40"
                placeholder="Intermediate stop 2"
                data-route-key="secondIntermediateStop"
                value={secondIntermediateStop}
                onChange={(e) => handleRouteInfoChange(e)}
              />
            </div>
          )}
        </div>
        <button
          className="text-cyan-700 font-bold mb-3"
          onClick={handleIntermediateStopsVisibility}
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
}
