import { Outlet } from "react-router";
import Nav from "../shared/Nav";

const AppLayout = () => {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
};

export default AppLayout;
