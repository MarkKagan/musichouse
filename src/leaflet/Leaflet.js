import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Link } from "react-router-dom";
import { useFilteredUsersContext } from "../filtered-users-context/FilteredUsersContextProvider";

const center = [52.517501, 13.400554];

const customIcon = L.icon({
  iconUrl: require("../assets/treble-clef-red-icon.png"),
  iconSize: [40, 40],
});

function Leaflet() {

  const {searchableUsers} = useFilteredUsersContext();

  return (
    <MapContainer
      center={center}
      zoom={12}
      style={{ width: "50vw", height: "50vh" }}
    >
      <TileLayer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {Object.entries(searchableUsers).map(([key, val]) => {
        let name =
          val.firstName + " " + val.lastName;
        return (
          <Marker position={val.coordinates} icon={customIcon} key={key}>
            <Popup>
              <button          
                style={{ backgroundColor: "light-blue" }}
                onClick={() => {
                  console.log("test");
                }}
              >
                {name}
              </button>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}

export default Leaflet;
