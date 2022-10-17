import baseApi, { IPaginationResponse } from "@src/app/api/baseApi";
import { TRAVEL_BASE_URL } from "@utils/type";
import { ITravelResponse } from "@src/app/api/api";
import socketClient, { Socket } from "socket.io-client";
import { RootState } from "@src/app/store";

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
        onCacheEntryAdded: async function (
            travelId,
            { updateCachedData, cacheDataLoaded, cacheEntryRemoved, getState }
          ) {
            socket = socketClient("http://123.214.75.32:9999/", {
              transports: ["websocket"],
              auth: {
                token: (getState() as RootState).auth.token,
              },
              query: {
                travelId: travelId,
                userId: 1,
              },
            });

            socket.on("scheduleOrderChanged", (message) => {
              console.log("scheduleOrderChanged", message);
              updateCachedData((draft) => {
                draft.dates.find(
                  (date) => date.date === message.date
                )!.scheduleOrders = message.scheduleOrder;
              });
            });

            socket.on("scheduleAdded", (message) => {
              console.log("scheduleAdded", message);
            });
  
            await cacheEntryRemoved;
  
            socket.close();
          },
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
        onQueryStarted: async (
          args,
          {
            dispatch,
            getState,
            extra,
            requestId,
            queryFulfilled,
            getCacheEntry,
          }
        ) => {
          const response = await queryFulfilled;
          socket.emit("scheduleOrderChange", {
            travelId: args.travelId,
            data: {
              date: args.date,
              scheduleOrder: args.scheduleOrder,
            },
          });
          dispatch(
            travelApi.util.updateQueryData(
              "getTravel",
              args.travelId,
              (draft) => {
                draft.dates.find(
                  (date) => date.date === args.date
                )!.scheduleOrders = response.data;
              }
            )
          );
        }
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
      createSchedule: builder.mutation<
        any,
        {
          travelId: string;
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
        onQueryStarted: async (
          args,
          {
            dispatch,
            getState,
            extra,
            requestId,
            queryFulfilled,
            getCacheEntry,
          }
        ) => {
          const response = await queryFulfilled;

          socket.emit("scheduleAdd", {
            travelId: args.travelId,
            data: response,
          });
        },
      }),
    }),
  });

export default travelApi;