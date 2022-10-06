import { useLocation } from "react-router-dom";
import { SingleRoute } from "../types";

export const useTransferredState = () => {
  const location = useLocation();
  const state = location.state as SingleRoute[];

  const [routeFrom, firstIntermediateStop, secondIntermediateStop, routeTo] =
    state;

  // nie ogarniam po co to jest

  return {
    routeFrom,
    firstIntermediateStop,
    secondIntermediateStop,
    routeTo,
    state,
  };
};
