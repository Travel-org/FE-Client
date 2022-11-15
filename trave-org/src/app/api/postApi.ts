import baseApi, { IPaginationResponse } from "@src/app/api/baseApi";
import { POST_BASE_URL } from "@utils/type";
import { IPageRequest, IPostResponse } from "@src/app/api/api";
const postApi = baseApi
  .enhanceEndpoints({
    addTagTypes: ["Post"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getPostsOfFriends: builder.query<
        IPaginationResponse<IPostResponse>,
        IPageRequest
      >({
        query: (pageRequest) => ({
          url:
            POST_BASE_URL +
            `?pageNumber=${pageRequest.pageNumber}&pageSize=${pageRequest.pageSize}`,
          method: "GET",
        }),
        providesTags: (result, error, postId) => [{ type: "Post", id: "LIST" }],
      }),
      createPost: builder.mutation<any, FormData>({
        query: (formData) => ({
          url: POST_BASE_URL,
          method: "POST",
          body: formData,
        }),
      }),
      createNotice: builder.mutation<any, FormData>({
        query: (formData) => ({
          url: "/v1/admin/notices",
          method: "POST",
          body: formData,
        }),
      }),
    }),
  });

export default postApi;