interface ReturnedElementStructure {
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
  mapView: {
    west: number;
    south: number;
    east: number;
    north: number;
  };
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

export const getRoute = async (Api: string): Promise<ReturnedDataStructure> => {
  const data = (await fetch(Api)).json();
  // find out how to type fetch in ts :D

  return data;
};
