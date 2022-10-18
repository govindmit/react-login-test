// import { createStore, combineReducers, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";

// import { userLoginReducer, userRegisterReducer } from "./reducer/userReducer";

// const reducer = combineReducers({
//   userLoginReducer,
//   userRegisterReducer,
// });

// const initialState = {};

// const middleware = [thunk];

// const store = createStore(
//   reducer,
//   initialState,
//   composeWithDevTools(applyMiddleware(...middleware))
// );

// export default store;

import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import auth from "./reducer/index";

// const rootReducer = combineReducers({
//     register,
//     login
// });

const configureStore = () => {
  return createStore(auth, compose(applyMiddleware(thunk)));
};

export default configureStore;
