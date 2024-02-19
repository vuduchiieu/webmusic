import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import GlobalStyles from "~/component/GlobalStyles/";
import { Contexts } from "./component/context/AppContext";
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Contexts>
      <GlobalStyles>
        <App />
      </GlobalStyles>
    </Contexts>
  </Provider>
);

reportWebVitals();
