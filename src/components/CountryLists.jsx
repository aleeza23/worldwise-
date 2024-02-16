import { useCities } from '../context/CitiesContext';
import styles from '../styles/CountryList.module.css'
import PropTypes from 'prop-types';

const CountryLists = () => {
    const { data } = useCities()
    // console.log(data);

    //remove duplicate countries from countries array
    const countries = []
    let uniqueElm = data?.map((elm) => {
        if (!countries.map((el) => el.country).includes(elm.country)) {
            return countries.push(elm)
        } else {
            []
        }
    })

    return <>

        <ul className={styles.countryList}>
            {countries?.map((country, i) => (
                <>
                    <li key={i} className={styles.countryItem}>
                        <span>{country.emoji}</span>
                        <span>{country.country}</span>
                    </li>
                </>
            ))}
        </ul>


    </>;
};

CountryLists.propTypes = {
    cities: PropTypes.array
}
export default CountryLists;
