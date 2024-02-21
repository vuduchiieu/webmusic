import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import GlobalStyles from "~/component/GlobalStyles/";
import { Contexts } from "./component/context/AppContext";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

export const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Contexts>
        <GlobalStyles>
          <App />
        </GlobalStyles>
      </Contexts>
    </PersistGate>
  </Provider>
);

reportWebVitals();
