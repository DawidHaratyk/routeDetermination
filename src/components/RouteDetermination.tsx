import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RouteContext } from "../contexts/RouteContext";
import { ToastContainer, toast, ToastItem } from "react-toastify";
import { FetchedRoute } from "../types";
import { useNotificationCenter } from "react-toastify/addons/use-notification-center";
import "react-toastify/dist/ReactToastify.css";

export function RouteDetermination() {
  // try to change the fetchedRoute into an array of objects to have less code in ShowRouteAndInfoView component
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
    firstIntermediateStop: {
      position: {
        latitude: 0,
        longitude: 0,
      },
      title: "",
    },
    secondIntermediateStop: {
      position: {
        latitude: 0,
        longitude: 0,
      },
      title: "",
    },
  });
  const [areIntermediateStopsVisible, setAreIntermediateStopsVisible] =
    useState<boolean>(false);

  const { routeInfo, setRouteInfo } = useContext(RouteContext);
  const { routeFrom, routeTo, firstIntermediateStop, secondIntermediateStop } =
    routeInfo;

  const navigate = useNavigate();

  const { notifications, remove } = useNotificationCenter();

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

  const firstIntermediateStopAPI = `https://geocode.search.hereapi.com/v1/geocode?apikey=rMOBREZMv1w_dZylksrpQ3ONx6ApOyj6yDh7XCeQdds&q=${encodeURIComponent(
    firstIntermediateStop
  )}`;

  const secondIntermediateStopAPI = `https://geocode.search.hereapi.com/v1/geocode?apikey=rMOBREZMv1w_dZylksrpQ3ONx6ApOyj6yDh7XCeQdds&q=${encodeURIComponent(
    secondIntermediateStop
  )}`;

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
    // try to loop over these fetches
    const customToastId1: string = "toast-id-1";
    const customToastId2: string = "toast-id-2";
    const customToastId3: string = "toast-id-3";
    const customToastId4: string = "toast-id-4";

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

        console.log(title);

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
          : toast.warn("Wrong from where value entered!", {
              toastId: customToastId1,
            });
      })
      .catch(() => {
        setFetchedRoute((prevState) => ({
          ...prevState,
          routeFrom: {
            position: {
              latitude: 0,
              longitude: 0,
            },
            title: "",
          },
        }));
        toast.warn("Wrong from where value entered!", {
          toastId: customToastId1,
        });
      });

    fetch(routeToAPI)
      .then((response) => response.json())
      .then((data) => {
        const { position, title } = data.items[0];

        console.log(title);

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
          : toast.warn("Wrong from where value entered!", {
              toastId: customToastId2,
            });
      })
      .catch(() => {
        setFetchedRoute((prevState) => ({
          ...prevState,
          routeTo: {
            position: {
              latitude: 0,
              longitude: 0,
            },
            title: "",
          },
        }));
        toast.warn("Wrong from to value entered!", {
          toastId: customToastId2,
        });
      });

    isFetchingFirstIntermediateStop &&
      fetch(firstIntermediateStopAPI)
        .then((response) => response.json())
        .then((data) => {
          const { position, title } = data.items[0];

          console.log(title, data.items.length);

          data.items.length &&
            setFetchedRoute((prevState) => ({
              ...prevState,
              firstIntermediateStop: {
                position: {
                  latitude: position.lat,
                  longitude: position.lng,
                },
                title,
              },
            }));
        })
        .catch(() => {
          setFetchedRoute((prevState) => ({
            ...prevState,
            firstIntermediateStop: {
              position: {
                latitude: 0,
                longitude: 0,
              },
              title: "",
            },
          }));

          toast.warn("Wrong first intermediate stop value entered!", {
            toastId: customToastId3,
          });
        });

    isFetchingSecondIntermediateStop &&
      fetch(secondIntermediateStopAPI)
        .then((response) => response.json())
        .then((data) => {
          const { position, title } = data.items[0];

          console.log(title);

          data.items.length &&
            setFetchedRoute((prevState) => ({
              ...prevState,
              secondIntermediateStop: {
                position: {
                  latitude: position.lat,
                  longitude: position.lng,
                },
                title,
              },
            }));
        })
        .catch(() => {
          setFetchedRoute((prevState) => ({
            ...prevState,
            secondIntermediateStop: {
              position: {
                latitude: 0,
                longitude: 0,
              },
              title: "",
            },
          }));

          toast.warn("Wrong second intermediate stop value entered!", {
            toastId: customToastId4,
          });
        });

    // fetch("https://tourplanning.hereapi.com/v3/problems")
    //   .then((response) => response.json())
    //   .then((data) => console.log(data));

    fetch(
      `https://router.hereapi.com/v8/routes?transportMode=car&origin=52.5308,13.3847&destination=52.5264,13.3686&return=summary&apikey=rMOBREZMv1w_dZylksrpQ3ONx6ApOyj6yDh7XCeQdds`
    )
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  const handleIntermediateStopsVisibility = (): void =>
    setAreIntermediateStopsVisible((prevState) => !prevState);

  const unsubscribe = toast.onChange((payload: ToastItem) => {
    if (payload.status === "added") {
      setTimeout(() => {
        remove(payload.id);
      }, 3000);
    }
  });

  useEffect(() => {
    console.log(fetchedRoute);

    unsubscribe();

    if (
      fetchedRoute.routeFrom.title !== "" &&
      fetchedRoute.routeTo.title !== "" &&
      !notifications.length &&
      (firstIntermediateStop
        ? Boolean(fetchedRoute.firstIntermediateStop.title)
        : true) &&
      (secondIntermediateStop
        ? Boolean(fetchedRoute.secondIntermediateStop.title)
        : true)
    ) {
      navigate("/foundRoute", { state: fetchedRoute });
    }
  }, [fetchedRoute, navigate, notifications]);

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
