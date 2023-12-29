import { createBrowserRouter, Navigate } from "react-router-dom";
import { Painting } from "src/routes";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={`/s${(+new Date()).toString(16)}`} />,
  },
  {
    path: "/:id",
    element: <Painting />,
  },
  {
    path: '*',
    element: <Navigate to="/" />
  }
])

export default router