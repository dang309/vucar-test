import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// slices
import workerReducer from "./slices/worker";

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "DANG",
  whitelist: ["worker"],
};

const rootReducer = combineReducers({
  worker: workerReducer,
});

export { rootPersistConfig, rootReducer };
