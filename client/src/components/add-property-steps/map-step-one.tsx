import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
//@ts-ignore
import { useMapEvents } from "react-leaflet/hooks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import "leaflet/dist/leaflet.css";

L.Icon.Default.mergeOptions({
  // iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const MapStepOne = (props: any) => {
  const { step, setStep, setProperty } = props;
  const [selectedPosition, setSelectedPosition] = React.useState<
    [number, number]
  >([0, 0]);

  function LocationMarker() {
    const map = useMapEvents({
      click(e: any) {
        setSelectedPosition([e.latlng.lat, e.latlng.lng]);
      },
    });
    return selectedPosition ? (
      <Marker
        key={selectedPosition[0]}
        position={selectedPosition}
        interactive={false}
      />
    ) : null;
  }
  const notify = () => toast.error("vous devez sélectionner la position");
  //add position
  const addPosition = () => {
    if (selectedPosition[0] !== 0) {
      setProperty((prevState: any) => ({
        ...prevState,
        lat: selectedPosition[0],
        lng: selectedPosition[1],
      }));
      setStep(step + 1);
    } else {
      notify();
    }
  };
  return (
    <div>
      <ToastContainer autoClose={3000} style={{ marginTop: "50px" }} />
      <MapContainer
        className="add-property-map"
        center={[34, 10]}
        zoom={6}
        minZoom={6}
        zoomControl={false}
        // scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker />
      </MapContainer>

      <div className=" w-full items-center justify-center flex p-4">
        <button
          className="bg-primary-light hover:bg-primary-dark text-white rounded p-2 px-6 cursor-pointer m-2"
          onClick={addPosition}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MapStepOne;
