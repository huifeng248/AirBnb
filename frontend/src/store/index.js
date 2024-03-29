import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from './session';
import spotReducer from './spot.js'
import reviewReducer from './review.js'
import bookingReducer from './booking'
import imageReducer from './image'

const rootReducer = combineReducers({
  // add reducer functions here
  session: sessionReducer,
  spots: spotReducer,
  reviews:reviewReducer,
  bookings: bookingReducer,
  images: imageReducer,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
