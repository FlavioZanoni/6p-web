import { makeApiRequest } from "../makeApiRequest"
import { GetApiParams, Pagination } from "../types"
import { MutateClients, Clients } from "./types"

export const getClients = async ({
  page,
  limit,
  filter,
}: GetApiParams) => {
  return makeApiRequest<Pagination<Clients>>({
    method: "get",
    url: `clients?page=${page}&limit=${limit}${filter || ""}`,
  })
}

export const getClientsPaginationless = async (): Promise<
  Clients
> => {
  return await makeApiRequest({
    method: "get",
    url: `clients/list`,
  })
}

export const getClientsById = async (id: number) => {
  return makeApiRequest<Clients>({
    method: "get",
    url: `clients/${id}`,
  })
}

export const mutateClients = async ({
  id,
  data,
}: {
  id?: number
  data: MutateClients
}) => {
  if (id) {
    return makeApiRequest({
      method: "put",
      url: `clients/${id}`,
      data: data,
    })
  }
  return makeApiRequest({
    method: "post",
    url: `clients`,
    data: data,
  })
}
