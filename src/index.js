import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import NativeSelect from "./NativeSelect";
import MultipleSelectNative from "./MultipleSelectNative";
import reportWebVitals from "./reportWebVitals";
import CustomMultiSelect from "./CustomMultiSelect";

const root = ReactDOM.createRoot(document.getElementById("root"));
const options = ["Option 1", "Option 2", "Option 3", "Option 4","Option 5","Option 6","Option 7"];
root.render(
  <React.StrictMode>
    <CustomMultiSelect options={options} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
