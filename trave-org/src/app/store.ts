import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { api } from "@src/services/schedule";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },

  middleware: (gDM) => gDM().concat(api.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;