import { createBrowserRouter, Navigate } from "react-router-dom";
import { Painting } from "src/routes";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Painting />
  },
  {
    path: '*',
    element: <Navigate to="/" />
  }
])

export default router