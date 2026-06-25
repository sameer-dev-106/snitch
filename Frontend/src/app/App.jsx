import "./App.css";
import { RouterProvider } from "react-router";
import router from "./app.routes";
import ThemeToggle from "../shared/ThemeToggle";
import { useAuth } from "../features/auth/hook/useAuth";
import { useEffect } from "react";

const App = () => {
  const { handleGetMe } = useAuth();

  useEffect(() => {
    handleGetMe();
  }, []);

  return (
    <>
      <ThemeToggle />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
