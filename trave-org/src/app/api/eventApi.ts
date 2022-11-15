import baseApi from "@src/app/api/baseApi";
import { IEventResponse } from "./api";

const eventApi = baseApi
  .enhanceEndpoints({
    addTagTypes: ["Events"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
        getEvents: builder.query<any, void>({
            query: () => ({
              url: `v1/admin/events`,
              method: "GET",
            }),
            providesTags: (result, error, travelId) => [
              { type: "Events", id: "LIST" },
            ],
        }),
        getEvent: builder.query<IEventResponse, string>({
            query: (eventId) => ({
                url: `/v1/admin/events/${eventId}`,
                method: "GET",
              }),
              providesTags: (result, error, travelId) => [
                { type: "Events", id: "SINGLE" },
              ],
        })
    }),
  });

export default eventApi;