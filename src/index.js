import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import GlobalStyles from "~/component/GlobalStyles/";
import { Contexts } from "./component/context/AppContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Contexts>
      <GlobalStyles>
        <App />
      </GlobalStyles>
    </Contexts>
  </React.StrictMode>
);

reportWebVitals();
