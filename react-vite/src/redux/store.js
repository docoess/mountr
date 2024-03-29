import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import postsReducer from './post';
import mountsReducer from "./mount";
import ownedMountsReducer from "./owned";
import wantedMountsReducer from "./wanted";

const rootReducer = combineReducers({
  session: sessionReducer,
  posts: postsReducer,
  mounts: mountsReducer,
  wanted: wantedMountsReducer,
  owned: ownedMountsReducer
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
