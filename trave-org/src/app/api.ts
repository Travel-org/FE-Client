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
  };
  users: IUserResponse[];
}
interface IPaginationResponse<T> {
  page: number | null;
  size: number | null;
  data: T[];
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
        headers.set("Authentication", `Bearer ${token}`);
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
        kakaoId: string;
      },
      string
    >({
      query: (authorizationCode) => ({
        url: "/v1/oauth2/authorization/kakao",
        method: "GET",
        params: { code: authorizationCode },
      }),
    }),
    signUp: builder.mutation<any, any>({
      query: (signUpData) => ({
        url: "/v1/users/signup",
        method: "POST",
        body: signUpData,
      }),
    }),
    logout: builder.mutation<undefined, void>({
      queryFn: () => {
        return {
          data: undefined,
        };
      },
    }),
    getMyInfo: builder.query<
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
        url: "/v1/users/my-info",
        method: "GET",
      }),
    }),
    /**
     * Travel Apis
     */
    createTravel: builder.mutation<
      any,
      { title: string; startDate: string; endDate: string }
    >({
      query: (arg) => ({
        method: "POST",
        url: "/v1/travels",
        body: {
          ...arg,
          userEmails: [],
        },
      }),
      invalidatesTags: (result, error) => [{ type: "Travel" }],
    }),
    getTravels: builder.query<IPaginationResponse<ITravelResponse>, void>({
      query: () => ({
        url: `/v1/users/travels`,
        method: "GET",
      }),
      providesTags: (result) => [{ type: "Travel" }],
    }),
    getTravel: builder.query<ITravelResponse, string>({
      query: (travelId) => ({
        url: `/v1/travels/${travelId}`,
        method: "GET",
      }),
    }),
    /**
     * Schedule Apis
     */
    createSchedule: builder.mutation<
      any,
      {
        travelId: number;
        endTime: "2022-05-23T13:30:07.247Z";
        place: {
          addressName: string;
          addressRoadName: string;
          kakaoMapId: number;
          phoneNumber: string;
          placeName: string;
          placeUrl: string;
          lat: number;
          lng: number;
        };
        startTime: "2022-05-23T13:30:07.247Z";
        userIds: number[];
      }
    >({
      query: (arg) => ({
        url: `/v1/travels/${arg.travelId}/schedules`,
        method: "POST",
        body: {
          endTime: arg.endTime,
          place: arg.place,
          startTime: arg.startTime,
          userIds: arg.userIds,
        },
      }),
    }),
  }),
});
type AuthState = {
  token: string | null;
};
const initialAuthState = { token: null } as AuthState;
export const authSlice = createSlice({
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