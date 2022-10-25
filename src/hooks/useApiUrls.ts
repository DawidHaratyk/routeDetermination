import { allLocations, API } from "../constants";
import { useRoute } from "../contexts/RouteContext";

export const useApiUrls = () => {
  const { routeInfo } = useRoute();
  const { routeFrom, routeTo, firstIntermediateStop, secondIntermediateStop } =
    routeInfo;

  const apiUrlList = allLocations.map((apiLocation) => {
    //odpalałbym to w momenciue jak user klikne button
    //dodatkowo  pokwiliłbym czy  nie da sie tego zrobic (podpowiedź: da się) tak aby jak np kiedys bys chciał dodać jeszcze trzeci  przystanek to nie musiał zmieniać tego kodu
    // creating array of all api url's
    if (apiLocation === "routeFrom")
      return routeFrom && `${API}${encodeURIComponent(routeFrom)}`;
    if (apiLocation === "routeTo")
      return routeTo && `${API}${encodeURIComponent(routeTo)}`;
    if (apiLocation === "firstIntermediateStop")
      return `${API}${encodeURIComponent(firstIntermediateStop)}`;
    if (apiLocation === "secondIntermediateStop")
      return `${API}${encodeURIComponent(secondIntermediateStop)}`;
  });

  const [
    routeFromAPI,
    routeToAPI,
    firstIntermediateStopAPI,
    secondIntermediateStopAPI,
  ] = apiUrlList as string[];

  return {
    routeFromAPI,
    routeToAPI,
    firstIntermediateStopAPI,
    secondIntermediateStopAPI,
  };
};
