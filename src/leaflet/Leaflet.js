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

  console.log(searchableUsers)

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
      {searchableUsers.map((user) => {
        let name =
          user[1][searchType].firstName + " " + user[1][searchType].lastName;
        // let profilePath = `${user[1][searchType].firstName}_${user[1][searchType].lastName}`;
        return (
          <Marker position={user[1][searchType].coordinates} icon={customIcon} key={user[0]}>
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
