import baseApi, { IPaginationResponse } from "@src/app/api/baseApi";
import { TRAVEL_BASE_URL } from "@utils/type";
import { IScheduleResponse, IUserResponse } from "@src/app/api/api";
import socketClient, { Socket } from "socket.io-client";
import { RootState } from "@src/app/store";

interface IDateData {
  date: string;
  scheduleOrders: number[];
  schedules: IScheduleResponse[];
}

export interface ITravelResponse {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  memo: string;
  managerId: number;
  costs: any[];
  users: IUserResponse[];
  dates: IDateData[];
}

let socket: Socket;

const travelApi = baseApi
  .enhanceEndpoints({
    addTagTypes: ["Travel"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getTravels: builder.query<IPaginationResponse<ITravelResponse>, void>({
        query: () => ({
          url: TRAVEL_BASE_URL,
          method: "GET",
        }),
        providesTags: (result, error, travelId) => [
          { type: "Travel", id: "LIST" },
        ],
      }),

      getTravel: builder.query<ITravelResponse, string>({
        query: (travelId) => ({
          url: `${TRAVEL_BASE_URL}/${travelId}`,
          method: "GET",
        }),
        providesTags: (result, error, travelId) => [
          { type: "Travel", id: travelId },
        ],
      }),

      getSchedule: builder.query<
        IScheduleResponse,
        { travelId: string; scheduleId: string }
      >({
        query: (args) => ({
          url: `${TRAVEL_BASE_URL}/${args.travelId}/schedules/${args.scheduleId}`,
          method: "GET",
        }),
        // providesTags: ["schedule"],
      }),
      createTravel: builder.mutation<
        any,
        {
          title: string;
          userEmails: string[];
          startDate: string;
          endDate: string;
        }
      >({
        query: (arg) => ({
          method: "POST",
          url: TRAVEL_BASE_URL,
          body: {
            ...arg,
          },
        }),
        invalidatesTags: (result, error, travelId) => [
          { type: "Travel", id: "LIST" },
        ],
      }),
      changeTravelScheduleOrder: builder.mutation<
        number[],
        {
          travelId: string;
          date: string;
          scheduleOrder: number[];
        }
      >({
        query: ({ travelId, date, scheduleOrder }) => ({
          url: `${TRAVEL_BASE_URL}/${travelId}/change`,
          method: "POST",
          body: {
            scheduleOrder: scheduleOrder,
          },
          params: {
            date: date,
          },
        }),
      }),

      createTravelDate: builder.mutation<
        any,
        { travelId: string; date: string; title: string }
      >({
        query: ({ travelId, date, title }) => ({
          url: `${TRAVEL_BASE_URL}/${travelId}/travelDates`,
          method: "POST",
          body: {
            date: date,
            title: title,
          },
        }),
      }),
      updateTravelDate: builder.mutation<
        any,
        { startDate: string; endDate: string; travelId: string }
      >({
        query: (args) => ({
          url: `${TRAVEL_BASE_URL}/${args.travelId}/dates`,
          method: "PUT",
          body: {
            startDate: args.startDate,
            endDate: args.endDate,
          },
        }),
        invalidatesTags: (args) => [{ type: "Travel", id: args.travelId }],
      }),
      createSchedule: builder.mutation<
        any,
        {
          travelId: string;
          date: string;
          endTime: "00:00:00";
          startTime: "00:00:00";
          place: {
            addressName: string;
            addressRoadName: string;
            kakaoMapId: number;
            phoneNumber: string;
            placeName: string;
            placeUrl: string;
            lat: string;
            lng: string;
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
        invalidatesTags: (args) => [{ type: "Travel", id: args.travelId }],
      }),
      uploadSchedulePhotos: builder.mutation<
        string[],
        {
          travelId: string;
          scheduleId: string;
          photos: any;
        }
      >({
        query: (args) => ({
          url: `${TRAVEL_BASE_URL}/${args.travelId}/schedules/${args.scheduleId}/photos`,
          method: "POST",
          body: args.photos,
        }),
        onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
          const updateResponse = await queryFulfilled;
          dispatch(
            travelApi.util.updateQueryData(
              "getTravel",
              args.travelId,
              (draft) => {
                draft.dates = draft.dates.map((v) => {
                  v.schedules.map((s) => {
                    if (s.scheduleId === Number(args.scheduleId))
                      s.photos = [...s.photos, ...updateResponse.data];
                    return s;
                  });
                  return v;
                });
              }
            )
          );
        },
      }),
    }),
  });
export default travelApi;