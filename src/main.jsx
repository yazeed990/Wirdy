import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./s-css.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import Bootstrap from "./Bootstrap.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Bootstrap />
  </StrictMode>
);
