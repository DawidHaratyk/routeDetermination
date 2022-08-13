import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { useLocation } from "react-router-dom";
// fix problem with these styles above (warning)

interface SingleRoute {
  position: {
    latitude: number;
    longitude: number;
  };
  title: string;
}

interface FetchedRoute {
  routeFrom: SingleRoute;
  routeTo: SingleRoute;
}

export function ShowRouteAndInfoView() {
  const { state } = useLocation();
  const { routeFrom, routeTo } = state as FetchedRoute;

  return (
    <>
      <div className="flex flex-col items-center text-3xl font-semibold">
        <h2 className="my-6">
          {routeFrom.title} - {routeTo.title}
        </h2>
        <MapContainer
          bounds={[
            [routeFrom.position.latitude, routeFrom.position.longitude],
            [routeTo.position.latitude, routeTo.position.longitude],
          ]}
          scrollWheelZoom={true}
          style={{ height: "70vh", width: "80vw", marginBottom: "50px" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={[
              routeFrom.position.latitude,
              routeFrom.position.longitude,
            ]}
            icon={
              new Icon({
                iconUrl: markerIconPng,
                iconSize: [25, 41],
                iconAnchor: [12, 41],
              })
            }
          >
            <Popup>{routeFrom.title}</Popup>
          </Marker>
          <Marker
            position={[routeTo.position.latitude, routeTo.position.longitude]}
            icon={
              new Icon({
                iconUrl: markerIconPng,
                iconSize: [25, 41],
                iconAnchor: [12, 41],
              })
            }
          >
            <Popup>{routeTo.title}</Popup>
          </Marker>
        </MapContainer>
        <div>
          <span className="text-lg">Koszt przejazdu: 155zł</span>
        </div>
      </div>
    </>
  );
}
