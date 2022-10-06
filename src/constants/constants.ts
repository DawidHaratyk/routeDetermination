import { SingleRoute } from "../types";

export const allLocations = [
  "routeFrom",
  "routeTo",
  "firstIntermediateStop",
  "secondIntermediateStop",
];

export const API = `https://geocode.search.hereapi.com/v1/geocode?apikey=${process.env.REACT_APP_API_KEY}&q=`;

export const defaultRouteItem: SingleRoute = {
  position: {
    latitude: 0,
    longitude: 0,
  },
  title: "",
};



// Jakieś dziwne rzeczy z tym robisz - nie wiem czy to jest celowe czy nie.
export const defaultFetchedRouteState = [
  defaultRouteItem,
  defaultRouteItem,
  defaultRouteItem,
  defaultRouteItem,
];


// Nie ogarniam po co  to tutaj jest a nawet jeśli jest potrzebne żeby było w tym pliku to nazwy są beznadziejne 
// imo lepiej do  array to zamknać 
export const customToastId1 = "toast-id-1";
export const customToastId2 = "toast-id-2";
export const customToastId3 = "toast-id-3";
export const customToastId4 = "toast-id-4";
