import { allLocations, API } from '../constants';
import { useRoute } from '../contexts/RouteContext';

export const useApiUrls = () => {
  const { routeInfo } = useRoute();
  const { routeFrom, routeTo, firstIntermediateStop, secondIntermediateStop } =
    routeInfo;

  // eslint-disable-next-line array-callback-return
  const apiUrlList = allLocations.map((apiLocation) => {
    // creating array of all api url's
    if (apiLocation === 'routeFrom')
      return routeFrom && `${API}${encodeURIComponent(routeFrom)}`;
    if (apiLocation === 'routeTo')
      return routeTo && `${API}${encodeURIComponent(routeTo)}`;
    if (apiLocation === 'firstIntermediateStop')
      return `${API}${encodeURIComponent(firstIntermediateStop)}`;
    if (apiLocation === 'secondIntermediateStop')
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
