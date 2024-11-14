import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RoutesComponent } from "./routes/Routes.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/*", element: <RoutesComponent /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
