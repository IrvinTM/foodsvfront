import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import AddFood from './components/AddFood.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { GoogleOAuthProvider} from "@react-oauth/google"



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/submit",
    element: <AddFood />,
  },
]);
createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  </GoogleOAuthProvider>
)
