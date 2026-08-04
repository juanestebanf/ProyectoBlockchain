import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";


export default function ProtectedRoute({

    children,
    roles = []

}) {

    const {

        usuario,
        token

    } = useAuth();

    // No existe sesión

    if (!token || !usuario) {

        return <Navigate to="/login" replace />;

    }

    // El rol no tiene permisos

    if (

        roles.length > 0 &&
        !roles.includes(usuario.rol)

    ) {

        return <Navigate to="/login" replace />;

    }

    return children;

}