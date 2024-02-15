import PropTypes from 'prop-types';
import { useAuth } from '../context/FakeAuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isAuthenticated) navigate('/')

    }, [isAuthenticated, navigate])

    return isAuthenticated && children
};
ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};
export default ProtectedRoute;
