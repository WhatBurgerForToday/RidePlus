import { useAtomValue, useSetAtom } from "jotai";

import { LocationPicker } from "~/components/LocationPicker";
import { addLocationAtom, createLocationsAtom, type Location } from "./home";

const locationToRegion = (location: Location) => ({
  latitude: location.latitude,
  longitude: location.longitude,
  latitudeDelta: 0.09,
  longitudeDelta: 0.09,
});

const SetLocationPage = () => {
  const setAddLocation = useSetAtom(addLocationAtom);
  const locations = useAtomValue(createLocationsAtom);
  const regions = locations.map(locationToRegion);

  return <LocationPicker setLocation={setAddLocation} locations={regions} />;
};

export default SetLocationPage;
