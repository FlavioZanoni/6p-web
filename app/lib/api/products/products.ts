import { makeApiRequest } from "../makeApiRequest"
import { GetApiParams, Pagination } from "../types"
import { MutateProducts, Products } from "./types"

export const getProducts = async ({
  offset,
  limit,
  filter,
}: GetApiParams) => {
  return makeApiRequest<Pagination<Products>>({
    method: "get",
    url: `products?offset=${offset}&limit=${limit}${filter || ""}`,
  })
}

export const getProductsPaginationless = async (): Promise<
  Products
> => {
  return await makeApiRequest({
    method: "get",
    url: `products/list`,
  })
}

export const getProductsById = async (id: number) => {
  return makeApiRequest<Products>({
    method: "get",
    url: `products/${id}`,
  })
}

export const mutateProducts = async ({
  id,
  data,
}: {
  id?: number
  data: MutateProducts
}) => {
  if (id) {
    return makeApiRequest({
      method: "put",
      url: `products/${id}`,
      data: data,
    })
  }
  return makeApiRequest({
    method: "post",
    url: `products`,
    data: data,
  })
}
