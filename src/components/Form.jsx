import { useEffect, useState } from 'react';
import styles from '../styles/Form.module.css'
import ButtonStyles from '../styles/Button.module.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BackButton from './BackButton';
import { useUrl } from '../cutomhook/useUrl';
import Message from './Message';
import { useCities } from '../context/CitiesContext';
import { useNavigate } from 'react-router-dom';
const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const [cityName, setCityName] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [country, setCountry] = useState("");
  const [emoji, setEmoji] = useState("");
  const [geocodingError, setGeocodingError] = useState("");
  const navigate = useNavigate()
  const [lat, lng] = useUrl()
  const { addNewCity } = useCities()

  

  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // if data exist then create an object with that data
    const newCityData = {
      cityName,
      date,
      notes,
      country,
      position: { lat, lng }
    }
    addNewCity(newCityData)
    // console.log(newCityData);
    navigate('/app/cities')
  }


  useEffect(
    function () {
      if (!lat && !lng) return;

      async function fetchCityData() {
        try {
          setIsLoadingGeocoding(true);
          setGeocodingError("");

          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();
          // console.log(data);

          if (!data.countryCode)
            throw new Error(
              "That doesn't seem to be a city. Click somewhere else 😉"
            );

          setCityName(data.city || data.locality || "");
          setCountry(data.countryName);
        } catch (err) {
          setGeocodingError(err.message);
        } finally {
          setIsLoadingGeocoding(false);
        }
      }
      fetchCityData();
    },
    [lat, lng]
  );

  if (!lat && !lng)
    return <Message message="Start by clicking somewhere on the map" />;

  if (geocodingError) return <Message message={geocodingError} />;


  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <button className={`${ButtonStyles.primary} ${ButtonStyles.btn}`}>Add</button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;