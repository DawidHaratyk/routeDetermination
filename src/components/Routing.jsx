import { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";

L.Marker.prototype.options.icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
});

export function Routing({ routingBounds }) {
  const currentBounds = routingBounds.map((bound) =>
    L.latLng(bound[0], bound[1])
  );

  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const routingControl = L.Routing.control({
      serviceUrl: "http://my-osrm/route/v1",
      waypoints: currentBounds,
      routeWhileDragging: false,
      draggableWaypoints: false,
      lineOptions: {
        addWaypoints: false,
      },
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [map, currentBounds]);

  return null;
}
