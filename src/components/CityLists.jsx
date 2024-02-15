import PropTypes from 'prop-types';
import styles from '../styles/CityLists.module.css';
import { Link } from 'react-router-dom';
import { useCities } from '../context/CitiesContext';


const CityLists = () => {
    const { data, loading, currentCity, removeCity } = useCities()

    const formatDate = (date) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',

        };
        const formattedDate = new Date(date).toLocaleString('en-US', options);
        return formattedDate;
    };




    if (loading) return <p>It is loading...</p>;

    return (
        <>
            <ul className={styles.cityList}>
                {data.map((city) => (
                    <>
                        <li key={city?.id}>
                            <Link
                                className={`${styles.cityItem} ${currentCity?.id === city.id ? styles['cityItem--active'] : ''}`}
                                to={`${city?.id}?lat=${city?.position.lat}&lng=${city?.position?.lng}`}
                            >
                                <span className={styles.emoji}>{city?.emoji}</span>
                                <h3 className={styles.name}>{city?.cityName}</h3>
                                <time className={styles.date}>{formatDate(city?.date)}</time>
                                <button className={styles.deleteBtn} onClick={(e) => {
                                    e.preventDefault();
                                    removeCity(city.id)
                                }} >
                                    &times;
                                </button>
                            </Link>
                        </li>
                    </>
                ))}
            </ul>
        </>
    );
};

CityLists.propTypes = {
    cities: PropTypes.array,
    loading: PropTypes.bool,
};

export default CityLists;

