import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { RootState } from "@src/app/store";
import { createSelector, createSlice } from "@reduxjs/toolkit";
import { TRAVEL_BASE_URL, USER_BASE_URL } from "@utils/type";
import baseApi, { IPaginationResponse } from "@src/app/api/baseApi";
import travelApi from "./travelApi";

export interface IUserResponse {
  userId: number;
  userName: string;
  profilePath: string;
  email: string;
}

export interface IScheduleResponse {
  photos: any[];
  scheduleId: number;
  startTime: number;
  endTime: number;
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

export interface IPostResponse {
  postId: number;
  scheduleId: number;
  placeName: string;
  placeUrl: string;
  userInfo: IUserResponse;
  title: string;
  text: string;
  createdAt: number;
  comments: ICommentResponse[];
  photoInfos: IPhotoResponse[];
}

export interface IPageRequest {
  pageSize: number;
  pageNumber: number;
}

interface ICommentResponse {
  commentId: number;
  userInfo: IUserResponse;
  content: string;
}

interface IPhotoResponse {
  photoId: number;
  name: string;
}

interface AmountPerUserProps {
  [key: number]: number;
}

export interface INoticeResponse {
  noticeId: number;
  title: string;
  content: string;
  authorInfo: IUserResponse;
  createdAt: string;
  photoInfos: IPhotoResponse[];
}

export interface IEventResponse {
  eventId: number;
  title: string;
  content: string;
  authorInfo: IUserResponse;
  createdAt: string;
  photoInfos: IPhotoResponse[];
}

export const api = baseApi
  .enhanceEndpoints({
    addTagTypes: ["UserInfo"],
  })
  .injectEndpoints({
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
          profilePath: string;
          posts: [
            {
              postId: number;
              scheduleId: number;
              placeName: string;
              placeUrl: string;
              title: string;
              text: string;
              createdAt: number;
              photoInfos: [
                {
                  photoId: number;
                  name: string;
                }
              ];
            }
          ];
        },
        void
      >({
        query: () => ({
          url: `${USER_BASE_URL}/my-info`,
          method: "GET",
        }),
        providesTags: (result, error, postId) => [
          { type: "UserInfo", id: "LIST" },
        ],
      }),
      updateMyInfo: builder.mutation<void, any>({
        query: (args) => ({
          url: USER_BASE_URL,
          method: "PUT",
          body: args,
        }),
        invalidatesTags: () => [{ type: "UserInfo", id: "LIST" }],
      }),
      updateMyAvatar: builder.mutation<FormData, any>({
        query: (args) => ({
          url: `${USER_BASE_URL}/photo`,
          method: "PUT",
          body: args,
        }),
        invalidatesTags: () => [{ type: "UserInfo", id: "LIST" }],
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

      getTravelsByUser: builder.query<any, void>({
        query: () => ({
          url: `${TRAVEL_BASE_URL}`,
          method: "GET",
        }),
      }),
      /**
       * Schedule Apis
       */
      updateSchedule: builder.mutation<
        any,
        {
          endTime: "00:00:00";
          startTime: "00:00:00";
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
        onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
          const updateResponse = await queryFulfilled;
          dispatch(
            travelApi.util.updateQueryData(
              "getTravel",
              arg.travelId,
              (draft) => {
                draft.costs.push(updateResponse.data);
              }
            )
          );
        },
      }),
      deleteCost: builder.mutation<
        string,
        { travelId: string; costId: string }
      >({
        query: (args) => ({
          url: `/v1/travels/${args.travelId}/costs/${args.costId}`,
          method: "DELETE",
        }),
        onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
          const updateResponse = await queryFulfilled;
          dispatch(
            travelApi.util.updateQueryData(
              "getTravel",
              arg.travelId,
              (draft) => {
                draft.costs = draft.costs.filter(
                  ({ costId }) => updateResponse.data !== costId
                );
              }
            )
          );
        },
      }),
      updateCost: builder.mutation<
        string,
        {
          amountsPerUser: AmountPerUserProps[];
          content: string;
          payerId: number;
          title: string;
          totalAmount: number;
          travelId: string;
          costId: string;
        }
      >({
        query: (args) => ({
          url: `/v1/travels/${args.travelId}/costs/${args.costId}`,
          method: "PUT",
          body: {
            amountsPerUser: args.amountsPerUser,
            content: args.content,
            payerId: args.payerId,
            title: args.title,
            totalAmount: args.totalAmount,
          },
          onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
            const updateResponse = await queryFulfilled;
            dispatch(
              travelApi.util.updateQueryData(
                "getTravel",
                arg.travelId,
                (draft) => {
                  draft.costs = draft.costs.filter(
                    ({ costId }) => updateResponse.data !== costId
                  );
                }
              )
            );
          },
        }),
      }),
      /**
       * Invite Apis
       */
      acceptInvite: builder.mutation<string, string>({
        query: (code) => ({
          url: `${TRAVEL_BASE_URL}/accept/${code}`,
          method: "POST",
        }),
      }),
      rejectInvite: builder.mutation<string, string>({
        query: (code) => ({
          url: `${TRAVEL_BASE_URL}/reject/${code}`,
          method: "DELETE",
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

export const isAdminLoginSelector = createSelector(
  (state: RootState) => state.auth.token,
  (token) => token !== null
);