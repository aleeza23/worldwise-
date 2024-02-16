import { createContext, useCallback, useContext, useEffect, useReducer } from "react";
import PropTypes from 'prop-types';

//create context
const CityContext = createContext()

//set initial state
const initialState = {
    data: [],
    loading: false,
    currentCity: {},
    error: ""
}

//reducer function
const reducer = (state, action) => {
    const { type, payload } = action
    switch (type) {
        case 'loading':
            return {
                ...state,
                loading: true
            };

        case 'cities/loaded':
            return {
                ...state,
                loading: false,
                data: payload
            };

        case 'city/loaded':
            return {
                ...state,
                loading: false,
                currentCity: payload
            }
        case 'city/created':
            return {
                ...state,
                loading: false,
                data: [...state.data, payload]
            }

        case 'city/deleted':
            return {
                ...state,
                loading: false,
                data: state.data.filter(city => city.id !== payload)
            }

        case 'error':
            return {
                ...state,
                loading: false,
                error: payload
            }

        default:
            throw new Error('Unknown action type');
    }
}



const BASE_URL = 'http://localhost:9000'
const CitiesProvider = ({ children }) => {
    // const [loading, setloading] = useState(false);
    // const [data, setdata] = useState([]);
    // const [currentCity, setCurrentCity] = useState({})

    const [state, dispatch] = useReducer(reducer, initialState);
    const { data, loading, currentCity } = state



    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch({ type: 'loading' })
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json()
                dispatch({ type: 'cities/loaded', payload: data })
                console.log(data);
            } catch (error) {
                dispatch({ type: 'error', payload: error })
            }
        }

        fetchData()
    }, []);

    //get single city data
    const getCity = useCallback(async (id) => {
        try {
            dispatch({ type: 'loading' })
            const res = await fetch(`${BASE_URL}/cities/${id}`);
            const data = await res.json()
            dispatch({ type: 'city/loaded', payload: data })
            // console.log(data);
        } catch (error) {
            dispatch({ type: 'error', payload: error })
        }
    }, [])

    //update the city
    const addNewCity = async (city) => {
        try {
            dispatch({ type: 'loading' })
            const res = await fetch(`${BASE_URL}/cities`, {
                method: 'POST',
                body: JSON.stringify(city),
                headers: {
                    "Content-Type": "application/json"
                },
            });
            const apiData = await res.json()
            dispatch({ type: 'city/created', payload: apiData })
            console.log(data);
        } catch (error) {
            dispatch({ type: 'error', payload: error })
        }
    }

    //remove the city
    const removeCity = async (id) => {
        try {
            dispatch({ type: 'loading' })
            await fetch(`${BASE_URL}/cities/${id}`, {
                method: 'DELETE',
            });

            dispatch({ type: 'city/deleted', payload: id })
            console.log(data);
        } catch (error) {
            dispatch({ type: 'error', payload: error })

        }
    }






    return <CityContext.Provider value={{
        data, loading, currentCity, getCity, addNewCity, removeCity
    }}>{children}</CityContext.Provider>



};

CitiesProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

//custom hook
const useCities = () => {
    const context = useContext(CityContext);
    if (context === undefined) throw new Error('Using context outside')
    return context

}
export { CitiesProvider, useCities };




