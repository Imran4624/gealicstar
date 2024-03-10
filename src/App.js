import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import RouterComponent from "./navigation/routerComponent";
import { Suspense } from "react";
import { ProvideAuth } from "./authorization/ProvidedAuth";
import FullScreenLoader from "./authorization/FullScreenLoader";
import { Provider } from "react-redux";
import store from "./app/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

let persistor = persistStore(store);

function App() {
  return (
    <PayPalScriptProvider
      options={{
        "client-id": process.env.PAYPAL_CLIENT_ID,
      }}
    >
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Suspense fallback={<FullScreenLoader />}>
          <ProvideAuth>
            <RouterComponent />
          </ProvideAuth>
        </Suspense>
      </PersistGate>
    </Provider>
    </PayPalScriptProvider>
  );
}

export default App;
