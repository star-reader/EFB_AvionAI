import { createBrowserRouter } from "react-router-dom"
import AirportView from "../views/AirportView";
import ErrorPage from "./error-page";

const router = createBrowserRouter([
    {
      path: "/airports",
      element: <AirportView />,
      errorElement: <ErrorPage />
    },
    {
      path: '/',
      element: <ErrorPage />
    },
    {
      path: '/*',
      element: <ErrorPage />
    }
  ]);

export default router