//import UserAuth from '../../hooks/userAuth';
import User from '../../hooks/User';
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute({ children }) {
    const auth = User();
    console.log(auth);
    return auth ? <Outlet /> : <Navigate to="/" />
}

export default PrivateRoute;