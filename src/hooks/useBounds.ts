import { LatLngBoundsExpression } from "leaflet";
import { useTransferredState } from "./useTransferredState";

export const useBounds = () => {
  const { routeFrom, firstIntermediateStop, secondIntermediateStop, routeTo } =
    useTransferredState();

  const mapBounds: LatLngBoundsExpression = [
    [routeFrom.position.latitude, routeFrom.position.longitude],
    [routeTo.position.latitude, routeTo.position.longitude],
  ];

  const routingBounds = [
    [routeFrom.position.latitude, routeFrom.position.longitude],
    [routeTo.position.latitude, routeTo.position.longitude],
  ];

  firstIntermediateStop.title &&
    mapBounds.push([
      firstIntermediateStop.position.latitude,
      firstIntermediateStop.position.longitude,
    ]);

  firstIntermediateStop.title &&
    routingBounds.splice(1, 0, [
      firstIntermediateStop.position.latitude,
      firstIntermediateStop.position.longitude,
    ]);

  secondIntermediateStop.title &&
    mapBounds.push([
      secondIntermediateStop.position.latitude,
      secondIntermediateStop.position.longitude,
    ]);

  secondIntermediateStop.title &&
    routingBounds.splice(routingBounds.length === 3 ? 2 : 1, 0, [
      secondIntermediateStop.position.latitude,
      secondIntermediateStop.position.longitude,
    ]);

  return { mapBounds, routingBounds };
};
