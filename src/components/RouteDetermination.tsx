import React, { memo, useCallback, useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { toast, ToastItem } from "react-toastify";
import { SingleRoute } from "../types";
import { useNotificationCenter } from "react-toastify/addons/use-notification-center";
import "react-toastify/dist/ReactToastify.css";
import { defaultRouteItem } from "../constants";
import {
  PricePerKilometerView,
  DefaultInputsAndSearchButtonView,
} from "./index";
import { useRoute } from "../contexts/RouteContext";
import { AdditionalInputs } from "./AdditionalInputs";
import { ToastWrapper } from "./ToastWrapper";

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
  const { firstIntermediateStop, secondIntermediateStop, ratePerKilometer } =
    routeInfo;

  const navigate: NavigateFunction = useNavigate();

  const { notifications, remove } = useNotificationCenter<{}>();

  const intermediateStopsButtonText = areIntermediateStopsVisible
    ? "Hide intermediate stops"
    : "Add intermediate stops";

  const handleRouteInfoChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleIntermediateStopsVisibilityAndInputsReset = () => {
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
        <PricePerKilometerView
          ratePerKilometer={ratePerKilometer}
          handleRouteInfoChange={handleRouteInfoChange}
        />
        <div className="rounded-lg py-3 px-4 bg-white shadow-lg my-3 w-11/12 sm:w-auto">
          <DefaultInputsAndSearchButtonView
            handleRouteInfoChange={handleRouteInfoChange}
            areIntermediateStopsVisible={areIntermediateStopsVisible}
            setFetchedRoute={setFetchedRoute}
            {...routeInfo}
          />
          {areIntermediateStopsVisible && (
            <AdditionalInputs
              firstIntermediateStop={firstIntermediateStop}
              secondIntermediateStop={secondIntermediateStop}
              handleRouteInfoChange={handleRouteInfoChange}
            />
          )}
        </div>
        <button
          className="text-cyan-700 font-bold mb-3"
          onClick={handleIntermediateStopsVisibilityAndInputsReset}
        >
          {intermediateStopsButtonText}
        </button>
      </div>
      <ToastWrapper />
    </div>
  );
});
