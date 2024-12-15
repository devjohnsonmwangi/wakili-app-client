import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Importing all API slices
import { usersAPI } from "../features/users/usersAPI";
import { caseAndPaymentAPI } from "../features/case/caseAPI";
import { paymentAPI } from "../features/payment/paymentAPI";
import { logAPI } from "../features/logs/logsapi";
import { feedbackAPI } from "../features/feedback/feedbackapi";
import { TicketAPI } from "../features/Tickets/AllTickets";
import { eventAndReminderAPI } from "../features/events/events";
import { eventReminderAPI } from "../features/events/eventreminder";
import { locationBranchAPI} from "../features/branchlocation/branchlocationapi";
import { caseDocumentAPI  } from "../features/casedocument/casedocmentapi";
import { appointmentAPI } from "../features/appointment/appointmentapi";
import { loginAPI } from "../features/login/loginAPI"; // Added Login API
import {teamApi} from "../features/team/teamApi"
// import {chatAiApi } from "../features/chatai/chataiApi";


import userSlice from "../features/users/userSlice";


// Persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"], // only the user state will be persisted
};

// Combine reducers
const rootReducer = combineReducers({
  [teamApi.reducerPath]:teamApi.reducer,
  [usersAPI.reducerPath]: usersAPI.reducer,
  [caseAndPaymentAPI.reducerPath]: caseAndPaymentAPI.reducer,
  [paymentAPI.reducerPath]: paymentAPI.reducer,
  [logAPI.reducerPath]: logAPI.reducer,
  [feedbackAPI.reducerPath]: feedbackAPI.reducer,
  [TicketAPI.reducerPath]: TicketAPI.reducer,
  [eventAndReminderAPI.reducerPath]: eventAndReminderAPI.reducer,
  [eventReminderAPI.reducerPath]: eventReminderAPI.reducer,
  [locationBranchAPI.reducerPath]:locationBranchAPI.reducer,
  [caseDocumentAPI .reducerPath]: caseDocumentAPI .reducer,
  [appointmentAPI.reducerPath]: appointmentAPI.reducer,
  [loginAPI.reducerPath]: loginAPI.reducer, // Added Login API Reducer
  // [chatAiApi.reducerPath]: chatAiApi.reducer,
  user: userSlice,


});

// Add persist reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(usersAPI.middleware)
      .concat(caseAndPaymentAPI.middleware)
      .concat(paymentAPI.middleware)
      .concat(logAPI.middleware)
      .concat(feedbackAPI.middleware)
      .concat(TicketAPI.middleware)
      .concat(eventAndReminderAPI.middleware)
      .concat(eventReminderAPI.middleware)
      .concat(locationBranchAPI.middleware)
      .concat(caseDocumentAPI .middleware)
      .concat(appointmentAPI.middleware)
      .concat(loginAPI.middleware) // Added Login API Middleware
      .concat(teamApi.middleware)
      // .concat(chatAiApi.middleware),
});

export const persistedStore = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
