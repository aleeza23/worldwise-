import { useNavigate, useSearchParams } from "react-router-dom";
import styles from '../styles/Map.module.css'
import { Marker, Popup, TileLayer, MapContainer, useMapEvent } from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../context/CitiesContext";
import ChangeMap from "./ChangeMap";
import { useGeolocation } from "../cutomhook/useGeolocation";
import { useUrl } from "../cutomhook/useUrl";


const Map = () => {
  const [position, setposition] = useState([40, 0]);
  const { data } = useCities()
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();
  const [lat, lng] = useUrl()

  useEffect(() => {
    if (lat && lng) setposition([lat, lng])
  }, [lat, lng])


  useEffect(
    function () {
      if (geolocationPosition)
        setposition([geolocationPosition.lat, geolocationPosition.lng]);
    },
    [geolocationPosition]
  );
  return <>
    <div className={styles.mapContainer} >
      {!geolocationPosition && (
        <button className={`${styles.position} ${styles.btn}`} onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your position"}
        </button>
      )}
      <MapContainer className={styles.map} center={position} zoom={6} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data.map((city) => {
          return <Marker position={[city?.position?.lat, city?.position?.lng]} key={city.id}>
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        })}
        <ChangeMap position={position} />
        <DetectClick />
      </MapContainer>
    </div>
  </>
};

function DetectClick() {

  const navigate = useNavigate()
  useMapEvent({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
  })
}
export default Map;
