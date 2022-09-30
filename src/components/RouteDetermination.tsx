import React, { memo, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastItem } from "react-toastify";
import { SingleRoute } from "../types";
import { useNotificationCenter } from "react-toastify/addons/use-notification-center";
import "react-toastify/dist/ReactToastify.css";
import { defaultRouteItem, defaultFetchedRouteState } from "../constants";
import {
  PricePerKilometerView,
  DefaultInputsAndSearchButtonView,
} from "./index";
import { useRoute } from "../contexts/RouteContext";
import { AdditionalInputs } from "./AdditionalInputs";
import { ToastWrapper } from "./ToastWrapper";

export const RouteDetermination = memo(() => {
  const { routeInfo, setRouteInfo } = useRoute();
  const { firstIntermediateStop, secondIntermediateStop, ratePerKilometer } =
    routeInfo;

  const navigate = useNavigate();

  const { notifications, remove } = useNotificationCenter<{}>();

  const [fetchedRoute, setFetchedRoute] = useState<SingleRoute[]>(
    defaultFetchedRouteState
  );

  const [areIntermediateStopsVisible, setAreIntermediateStopsVisible] =
    useState<boolean>(false);

  const intermediateStopsButtonText = areIntermediateStopsVisible
    ? "Hide intermediate stops"
    : "Add intermediate stops";

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

  const removeNotificationFromNotificationCenter = useCallback(
    () =>
      toast.onChange((payload: ToastItem) => {
        if (payload.status === "added") {
          setTimeout<[]>(() => {
            remove(payload.id);
          }, 3000);
        }
      }),
    []
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
  }, [fetchedRoute, navigate, removeNotificationFromNotificationCenter]);

  useEffect(() => {
    setFetchedRoute(defaultFetchedRouteState);
  }, [notifications]);

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
        <PricePerKilometerView ratePerKilometer={ratePerKilometer} />
        <div className="rounded-lg py-3 px-4 bg-white shadow-lg my-3 w-11/12 sm:w-auto">
          <DefaultInputsAndSearchButtonView
            areIntermediateStopsVisible={areIntermediateStopsVisible}
            setFetchedRoute={setFetchedRoute}
          />
          {areIntermediateStopsVisible && (
            <AdditionalInputs
              firstIntermediateStop={firstIntermediateStop}
              secondIntermediateStop={secondIntermediateStop}
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
