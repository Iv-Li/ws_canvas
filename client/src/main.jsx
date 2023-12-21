import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/main.scss'

import { RouterProvider } from "react-router-dom";
import router from "src/router.jsx";
import StoreProvider from "src/store/provider";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StoreProvider>
      <RouterProvider router={router} />
    </StoreProvider>
  </React.StrictMode>,
)
