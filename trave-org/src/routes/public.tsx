import { ReactElement } from "react";

interface Props {
  children: ReactElement;
}

const PublicRoute = ({ children: Component }: Props) => {
  return Component;
};
export default PublicRoute;