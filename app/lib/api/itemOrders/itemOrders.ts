import { makeApiRequest } from "../makeApiRequest"
import { GetApiParams, Pagination } from "../types"
import { MutateItemOrders, ItemOrders } from "./types"

export const getItemOrderss = async ({
  offset,
  limit,
  filter,
}: GetApiParams): Promise<Pagination<ItemOrders>> => {
  return makeApiRequest<Pagination<ItemOrders>>({
    method: "get",
    url: `ItemOrders?offset=${offset}&limit=${limit}${filter || ""}`,
  })
}

export const getItemOrderssPaginationless = async (): Promise<ItemOrders[]> => {
  return await makeApiRequest<ItemOrders[]>({
    method: "get",
    url: `ItemOrders/list`,
  })
}

export const getItemOrdersById = async (id: number): Promise<ItemOrders> => {
  return makeApiRequest<ItemOrders>({
    method: "get",
    url: `ItemOrders/${id}`,
  })
}

export const mutateItemOrders = async ({
  id,
  data,
}: {
  id?: number
  data: MutateItemOrders
}) => {
  if (id) {
    return makeApiRequest({
      method: "put",
      url: `ItemOrders/${id}`,
      data: data,
    })
  }
  return makeApiRequest({
    method: "post",
    url: `ItemOrders`,
    data: data,
  })
}
