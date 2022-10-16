import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { RootState } from "@src/app/store";
import { createSelector, createSlice } from "@reduxjs/toolkit";
import { TRAVEL_BASE_URL, USER_BASE_URL } from "@utils/type";
import baseApi, { IPaginationResponse } from "@src/app/api/baseApi";

interface IUserResponse {
  userId: number;
  userName: string;
}

export interface IScheduleResponse {
  scheduleId: number;
  startDate: number;
  endDate: number;
  place: {
    placeId: number;
    placeName: string;
    lat: number;
    lng: number;
    phoneNumber: string | undefined;
    addressName: string;
  };
  users: IUserResponse[];
}

export interface ITravelResponse {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  memo: string;
  managerId: number;
  users: IUserResponse[];
  dates: {
    date: string;
    schedules: IScheduleResponse[];
  }[];
}

interface ICostResponse {
  id: number;
  title: string;
  startDate: number;
  endDate: number;
  memo: string;
  managerId: number;
  users: IUserResponse[];
  schedules: IScheduleResponse[];
}

interface AmountPerUserProps {
  [key: number]: number;
}

export const api = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    oauthLogin: builder.mutation<
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
    login: builder.mutation<
      {
        status: number;
        token: string;
        message?: string;
      },
      {
        email: string;
        password: string;
      }
    >({
      query: (arg) => ({
        url: "/v1/login",
        method: "POST",
        body: {
          email: arg.email,
          password: arg.password,
        },
      }),
    }),
    signUp: builder.mutation<any, any>({
      query: (signUpData) => ({
        url: `${USER_BASE_URL}/signup`,
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
        url: `${USER_BASE_URL}/my-info`,
        method: "GET",
      }),
    }),

    /**
     * Travel Apis
     */

    getUsers: builder.query<any, string>({
      query: (travelId) => ({
        url: `${TRAVEL_BASE_URL}/${travelId}/users`,
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
        date: string;
        endTime: "13:30:07";
        startTime: "13:30:07";
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
        userIds: number[];
      }
    >({
      query: (arg) => ({
        url: `${TRAVEL_BASE_URL}/${arg.travelId}/schedules`,
        method: "POST",
        params: {
          date: arg.date,
        },
        body: {
          endTime: arg.endTime,
          place: arg.place,
          startTime: arg.startTime,
          userIds: arg.userIds,
        },
      }),
    }),
    getSchedule: builder.query<any[], string>({
      query: (arg) => ({
        url: `${TRAVEL_BASE_URL}/${arg}/schedules`,
        method: "GET",
      }),
      // providesTags: ["schedule"],
    }),
    updateSchedule: builder.mutation<
      any,
      {
        endTime: "14:49:48";
        startTime: "14:49:48";
        userIds: number[];
        place: {
          addressName: string;
          addressRoadName: string;
          kakaoMapId: number;
          lat: number;
          lng: number;
          phoneNumber: string;
          placeName: string;
          placeUrl: string;
        };
        travelId: string;
        scheduleId: string;
      }
    >({
      query: (arg) => ({
        url: `${TRAVEL_BASE_URL}/${arg.travelId}/schedules/${arg.scheduleId}`,
        method: "PUT",
      }),
    }),
    /**
     * Cost Apis
     */
    getCostById: builder.query<
      any,
      {
        travelId: string;
        costId: string;
      }
    >({
      query: (arg) => ({
        url: `${TRAVEL_BASE_URL}/${arg.travelId}/costs/${arg.costId}`,
        method: "GET",
      }),
    }),
    getCostByTravelId: builder.query<any, string>({
      query: (travelId) => ({
        url: `${TRAVEL_BASE_URL}/${travelId}/costs`,
        method: "GET",
      }),
    }),
    createCost: builder.mutation<
      any,
      {
        amountsPerUser: AmountPerUserProps[];
        content: string;
        payerId: number;
        title: string;
        totalAmount: number;
        travelId: string;
      }
    >({
      query: (arg) => ({
        url: `${TRAVEL_BASE_URL}/${arg.travelId}/costs`,
        method: "POST",
        body: {
          amountsPerUser: arg.amountsPerUser,
          content: arg.content,
          payerId: arg.payerId,
          title: arg.title,
          totalAmount: arg.totalAmount,
        },
      }),
    }),
    /**
     * Invite Apis
     */
    acceptInvite: builder.query<string, string>({
      query: (code) => ({
        url: `${TRAVEL_BASE_URL}/accept/${code}`,
        method: "GET",
      }),
    }),
    rejectInvite: builder.query<string, string>({
      query: (code) => ({
        url: `${TRAVEL_BASE_URL}/reject/${code}`,
        method: "GET",
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
      .addMatcher(
        api.endpoints.oauthLogin.matchFulfilled,
        (state, { payload }) => {
          state.token = payload.token;
        }
      )
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