import { useEffect, } from "react";
import { useParams } from "react-router-dom";
import { useCities } from "../context/CitiesContext";
import styles from '../styles/City.module.css'
import BackButton from "./BackButton";
const City = () => {
  
  const { id } = useParams()
  const {currentCity, getCity, loading} = useCities();
  const formatDate = (date) => {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday : 'long'

    };
    const formattedDate = new Date(date).toLocaleString('en-US', options);
    return formattedDate;
};

  // call getCity function on mount
  useEffect(() => {
    getCity(id)
    
  }, [id]);


  const { cityName, emoji, notes, date } = currentCity;

  if (loading) return <p>loading...</p>
  return <div className={styles.city}>
    <div className={styles.row}>
      <h6 >City name</h6>
      <h3>
        <span>{emoji}</span> {cityName}
      </h3>
    </div>

    <div className={styles.row}>
      <h6>You went to {cityName} on</h6>      
      <p className={styles.date}>{formatDate(date)}</p>

    </div>

    {notes && (
      <div className={styles.row}>
        <h6>Your notes</h6>
        <p>{notes}</p>
      </div>
    )}

    <div className={styles.row}>
      <h6>Learn more</h6>
      <a
        href={`https://en.wikipedia.org/wiki/${cityName}`}
        target="_blank"
        rel="noreferrer"
      >
        Check out {cityName} on Wikipedia &rarr;
      </a>
    </div>

    <div>
      <BackButton />
    </div>
  </div>
};

export default City;
