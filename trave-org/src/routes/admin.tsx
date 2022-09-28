import { ReactElement } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: ReactElement;
}

const AdminRoute = ({ children: Component }: Props) => {
  const admin = true;
  return admin ? Component : <Navigate to="/" />;
};
export default AdminRoute;