import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/leaflet.css";
import L, { Icon, LatLngBoundsExpression } from "leaflet";
import { useLocation } from "react-router-dom";
import { FetchedRoute } from "../types";
import Routing from "../components/Routing";
// fix problem with these styles above (warning)

export function ShowRouteAndInfoView() {
  const { state } = useLocation();

  const { routeFrom, routeTo, firstIntermediateStop, secondIntermediateStop } =
    state as FetchedRoute;

  const bounds: LatLngBoundsExpression = [
    [routeFrom.position.latitude, routeFrom.position.longitude],
    [routeTo.position.latitude, routeTo.position.longitude],
  ];

  firstIntermediateStop.title &&
    bounds.push([
      firstIntermediateStop.position.latitude,
      firstIntermediateStop.position.longitude,
    ]);
  secondIntermediateStop.title &&
    bounds.push([
      secondIntermediateStop.position.latitude,
      secondIntermediateStop.position.longitude,
    ]);

  return (
    <>
      <div className="flex flex-col items-center text-lg font-semibold">
        <h2 className="my-6">
          {`${routeFrom.title} - ${firstIntermediateStop.title} - ${secondIntermediateStop.title} - ${routeTo.title}`}
        </h2>
        <MapContainer
          bounds={bounds}
          scrollWheelZoom={true}
          style={{ height: "70vh", width: "80vw", marginBottom: "50px" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* <Marker
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
          {firstIntermediateStop && (
            <Marker
              position={[
                firstIntermediateStop.position.latitude,
                firstIntermediateStop.position.longitude,
              ]}
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
          )}
          {secondIntermediateStop && (
            <Marker
              position={[
                secondIntermediateStop.position.latitude,
                secondIntermediateStop.position.longitude,
              ]}
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
          )} */}
          <Routing bounds={bounds} />
        </MapContainer>
        <div>
          <span>Koszt przejazdu: 155zł</span>
        </div>
      </div>
    </>
  );
}
