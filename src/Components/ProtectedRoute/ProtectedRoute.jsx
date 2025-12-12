// ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
export default function ProtectedRoute({ children }) {
    const admin = Cookies.get("adminName");
    if (!admin) {
        return <Navigate to="/login" replace />;
    }

    return children;
}
