import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { RootState } from "@src/app/store";
import { createSlice } from "@reduxjs/toolkit";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.dev.travely.guide",
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const { token } = (getState() as RootState).auth;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<
      {
        expiration: string;
        sessionUser: { name: string; userId: number };
        status: number;
        token: string;
      },
      string
    >({
      query: (authorizationCode) => ({
        url: "/v1/oauth2/authorization/kakao",
        method: "GET",
        params: { code: authorizationCode },
      }),
    }),
    logout: builder.mutation<undefined, void>({
        queryFn: () => {
          return {
            data: undefined,
          };
        },
      }),
  }),
});

type AuthState = {
  user: { name: string; userId: number } | null;
  token: string | null;
};

const initialAuthState = { user: null, token: null } as AuthState;
export const slice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.login.matchFulfilled, (state, { payload }) => {
        state.token = payload.token;
        state.user = payload.sessionUser;
      })
      .addMatcher(api.endpoints.logout.matchFulfilled, (state) => {
        return initialAuthState;
      });
  },
});

export const selectCurrentUser = (state: RootState) => state.auth.user;