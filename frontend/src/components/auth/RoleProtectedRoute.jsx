import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

export default function RoleProtectedRoute({
  allowedRoles,
  children,
}) {
  const user = useAuthStore(
    (state) => state.user
  );

  if (
    !allowedRoles.includes(user?.role)
  ) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  return children;
}