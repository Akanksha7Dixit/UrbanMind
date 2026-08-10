import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

export default function RoleProtectedRoute({
  allowedRoles,
  children,
}) {
  const user = useAuthStore(
    (state) => state.user
  );

  // User is not logged in
  if (!user) {
    return (
      <Navigate
        to="/auth/login"
        replace
      />
    );
  }

  // User doesn't have permission
  if (!allowedRoles.includes(user.role)) {
    switch (user.role) {
      case "admin":
        return (
          <Navigate
            to="/admin/dashboard"
            replace
          />
        );

      case "planner":
        return (
          <Navigate
            to="/planner/dashboard"
            replace
          />
        );

      case "analyst":
        return (
          <Navigate
            to="/analyst/dashboard"
            replace
          />
        );

      case "citizen":
      default:
        return (
          <Navigate
            to="/citizen/dashboard"
            replace
          />
        );
    }
  }

  return children;
}