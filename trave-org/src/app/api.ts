import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { RootState } from "@src/app/store";
import { createSelector, createSlice } from "@reduxjs/toolkit";

interface IUserResponse {
  userId: number;
  userName: string;
}

interface IScheduleResponse {
  scheduleId: number;
  startDate: number;
  endDate: number;
  place: {
    placeId: number;
    placeName: string;
  }[];
  users: IUserResponse[];
}
interface ITravelResponse {
  id: number;
  title: string;
  startDate: number;
  endDate: number;
  memo: string;
  managerId: number;
  users: IUserResponse[];
  schedules: IScheduleResponse[];
}

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.dev.travely.guide",
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const { token } = (getState() as RootState).auth;
      if (token) {
        headers.set("Authentication", `${token}`);
      }
      return headers;
    },
  }),
  keepUnusedDataFor: 0,
  tagTypes: ["Travel"],
  endpoints: (builder) => ({
    login: builder.mutation<
      {
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
    myInfo: builder.query<
      {
        email: string;
        name: string;
        phoneNumber: string;
        userId: string;
        userType: string;
      },
      void
    >({
      query: () => ({
        url: "/v1/users",
        method: "GET",
      }),
    }),
    createTravel: builder.mutation<
      any,
      { title: string; startDate: number; endDate: number }
    >({
      query: (arg) => ({
        method: "POST",
        url: "/v1/travels",
        body: {
          ...arg,
          userEmails: [],
        },
      }),
      onQueryStarted: async (arg, {}) => {},
    }),
    getTravels: builder.query<ITravelResponse[], void>({
      query: () => ({
        url: `/v1/users/travels`,
        method: "GET",
      }),
      // queryFn: () => {
      //   return {
      //     data: Array.from({ length: 10 }, (_, i) => ({
      //       id: i,
      //       startDate: Date.now(),
      //       endDate: Date.now(),
      //       managerId: 1,
      //       memo: "",
      //       schedules: [
      //         {
      //           startDate: Date.now(),
      //           endDate: Date.now(),
      //           place: [{ placeId: 1, placeName: "test" }],
      //           scheduleId: 1,
      //           users: [
      //             { userId: 1, userName: "userA" },
      //             { userId: 2, userName: "userB" },
      //           ],
      //         },
      //       ],
      //       users: [
      //         { userId: 1, userName: "userA" },
      //         { userId: 2, userName: "userB" },
      //       ],
      //       title: "Test Travel",
      //     })),
      //   };
      // },
    }),
    getTravel: builder.query<ITravelResponse, number>({
      query: (travelId) => ({
        url: `/v1/travels/${travelId}`,
        method: "GET",
      }),
    }),
  }),
});

type AuthState = {
  token: string | null;
};
const initialAuthState = { token: null } as AuthState;
export const slice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.login.matchFulfilled, (state, { payload }) => {
        state.token = payload.token;
      })
      .addMatcher(api.endpoints.logout.matchFulfilled, (state) => {
        return initialAuthState;
      });
  },
});
export const isLoginSelector = createSelector(
  (state: RootState) => state.auth.token,
  (token) => token !== null
);