import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {Toaster } from "react-hot-toast"
import "./index.css"
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
<div>
<App />
<Toaster/>
</div>
);
