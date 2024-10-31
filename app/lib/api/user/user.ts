import { makeApiRequest } from "../makeApiRequest"
import { PostUser, PostUserResponse } from "./types"

export const postUser = async (data: PostUser) => {
  return makeApiRequest<PostUserResponse>({
    method: "post",
    url: `register`,
    data: data,
  })
}
