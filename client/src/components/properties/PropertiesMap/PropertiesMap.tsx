import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { API_URL } from "../../../env";
//import "leaflet/dist/leaflet.css";
import axios from "axios";
import PropertyMapModal from "../../modals/propertyMapModal";

const PropertiesMap = (props: any) => {
  const { categories, type, city } = props;

  const [data, setData] = React.useState([]);

  //get getAllProperties from api axios
  //zoom map

  React.useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `${API_URL}/getAllProperties?category=${categories}&city=${city}&type=${type}`
      );
      setData(res.data.properties);
    };
    fetchData();
  }, [categories, city, type]);

  return (
    <MapContainer
      className="leaflet-container"
      center={[34, 10]}
      zoom={5}
      minZoom={7}
      zoomControl={false}
      scrollWheelZoom={false}
      touchZoom={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      {data &&
        data.map((item: any) => {
          return (
            <Marker key={item._id} position={[item.lat, item.lng]}>
              <Popup className="bg-primary">
                <PropertyMapModal id={item._id} property={item} />
              </Popup>
            </Marker>
          );
        })}
    </MapContainer>
  );
};

export default PropertiesMap;
