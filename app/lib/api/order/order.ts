import { makeApiRequest } from "../makeApiRequest"
import { GetApiParams, Pagination } from "../types"
import { MutateOrder, Order } from "./types"

export const getOrders = async ({
  page,
  limit,
  filter,
}: GetApiParams) => {
  return makeApiRequest<Pagination<Order>>({
    method: "get",
    url: `orders?page=${page}&limit=${limit}${filter || ""}`,
  })
}

export const getOrdersPaginationless = async (): Promise<Order[]> => {
  return await makeApiRequest({
    method: "get",
    url: `orders/list`,
  })
}

export const getOrderById = async (id: number) => {
  return makeApiRequest<Order>({
    method: "get",
    url: `orders/${id}`,
  })
}

export const mutateOrder = async ({
  id,
  data,
}: {
  id?: number
  data: MutateOrder
}) => {
  if (id) {
    return makeApiRequest({
      method: "put",
      url: `orders/${id}`,
      data: data,
    })
  }
  return makeApiRequest({
    method: "post",
    url: `orders`,
    data: data,
  })
}
