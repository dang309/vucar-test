// i18n
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
// material
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { PersistGate } from "redux-persist/lib/integration/react";

import "./locales/i18n";
// highlight
import "./utils/highlight";
// lazy image
import "lazysizes";
import "lazysizes/plugins/attrchange/ls.attrchange";
import "lazysizes/plugins/object-fit/ls.object-fit";
import "lazysizes/plugins/parent-fit/ls.parent-fit";

// components
import LoadingScreen from "./components/LoadingScreen";
import { CollapseDrawerProvider } from "./contexts/CollapseDrawerContext";
import { AuthProvider } from "./contexts/JWTContext";
// contexts
import { SettingsProvider } from "./contexts/SettingsContext";
import { SocketIOProvider } from "./contexts/SocketIOContext";
// redux
import { persistor, store } from "./redux/store";
// Entry
import App from "./App";

// scroll bar
import "simplebar-react/dist/simplebar.min.css";

// ----------------------------------------------------------------------

ReactDOM.createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <ReduxProvider store={store}>
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <SettingsProvider>
            <CollapseDrawerProvider>
              <BrowserRouter>
                <SocketIOProvider>
                  <AuthProvider>
                    <App />
                  </AuthProvider>
                </SocketIOProvider>
              </BrowserRouter>
            </CollapseDrawerProvider>
          </SettingsProvider>
        </LocalizationProvider>
      </PersistGate>
    </ReduxProvider>
  </HelmetProvider>
);
