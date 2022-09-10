import { useCallback } from "react";
import { useRoute } from "../contexts/RouteContext";

export const useRouteInfoChange = () => {
  const { setRouteInfo } = useRoute();

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

  return { handleRouteInfoChange };
};
