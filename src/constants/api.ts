export const allLocations: string[] = [
  "routeFrom",
  "routeTo",
  "firstIntermediateStop",
  "secondIntermediateStop",
];

export const API: string = `https://geocode.search.hereapi.com/v1/geocode?apikey=${process.env.REACT_APP_API_KEY}&q=`;
