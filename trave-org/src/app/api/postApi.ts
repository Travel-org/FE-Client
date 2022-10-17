import baseApi, { IPaginationResponse } from "@src/app/api/baseApi";
import { POST_BASE_URL } from "@utils/type";
import { IPostResponse } from "@src/app/api/api";

const postApi = baseApi
  .enhanceEndpoints({
    addTagTypes: ["Post"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getPostsOfFriends: builder.query<IPaginationResponse<IPostResponse>, void>({
        query: () => ({
          url: POST_BASE_URL,
          method: "GET",
        }),
        providesTags: (result, error, postId) => [
          { type: "Post", id: "LIST" },
        ]
      })
    })
  });

export default postApi;