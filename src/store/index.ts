import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createApi } from '../services/api';
import { offersSlice } from './slices/offers';
import { offerSlice } from './slices/offer';
import { reviewSlice } from './slices/reviews';

const reducer = combineReducers({
  [offersSlice.name]: offersSlice.reducer,
  [offerSlice.name]: offerSlice.reducer,
  [reviewSlice.name]: reviewSlice.reducer

});


export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument:
          createApi()
      }
    }),
  reducer,
});
