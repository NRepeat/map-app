import { NextUIProvider } from "@nextui-org/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { MapProvider as ReactMapGLProvider } from "react-map-gl";
import { App } from "./App";
import "./index.css";
import MapProvider from "./providers/MapProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      <ReactMapGLProvider>
        <MapProvider>
          <main className="dark light text-foreground bg-background">
            <App />

          </main>
        </MapProvider>
      </ReactMapGLProvider>
    </NextUIProvider>
  </React.StrictMode>
);
