import baseApi from "@src/app/api/baseApi";
import { INoticeResponse } from "./api";

const noticeApi = baseApi
  .enhanceEndpoints({
    addTagTypes: ["Notices"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
        getNotices: builder.query<any, void>({
            query: () => ({
              url: `/v1/admin/notices`,
              method: "GET",
            }),
            providesTags: (result, error, travelId) => [
              { type: "Notices", id: "LIST" },
            ],
        }),
        getNotice: builder.query<INoticeResponse, string>({
            query: (noticeId) => ({
                url: `/v1/admin/notices/${noticeId}`,
                method: "GET",
              }),
              providesTags: (result, error, travelId) => [
                { type: "Notices", id: "SINGLE" },
              ],
        })
    }),
  });

export default noticeApi;