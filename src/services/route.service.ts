interface ReturnedElementStructure {
  // wydzieliłbym to do osobnego interfejsu

  address: {
    city: string;
    countryCode: string;
    countryName: string;
    county: string;
    label: string;
    postalCode: string;
    state: string;
  };
  id: string;
  localityType: string;
  // wydzieliłbym to do osobnego interfejsu

  mapView: {
    west: number;
    south: number;
    east: number;
    north: number;
  };
  // wydzieliłbym to do osobnego interfejsu
  position: {
    lat: number;
    lng: number;
  };
  resultType: number;
  scoring: {
    fieldScore: {
      city: number;
    };
    queryScore: number;
  };
  title: string;
}

interface ReturnedDataStructure {
  items: ReturnedElementStructure[];
}

export const getRoute = async (api: string): Promise<ReturnedDataStructure> => {
  // raz robisz then a raz async await używaj jednego
  const data = (await fetch(api)).json();

  return data;
};
