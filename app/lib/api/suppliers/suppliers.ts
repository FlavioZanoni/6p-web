import { makeApiRequest } from "../makeApiRequest"
import { GetApiParams, Pagination } from "../types"
import { MutateSuppliers, Suppliers } from "./types"

export const getSuppliers = async ({
  offset,
  limit,
  filter,
}: GetApiParams) => {
  return makeApiRequest<Pagination<Suppliers>>({
    method: "get",
    url: `suppliers?offset=${offset}&limit=${limit}${filter || ""}`,
  })
}

export const getSuppliersPaginationless = async (): Promise<
  Suppliers
> => {
  return await makeApiRequest({
    method: "get",
    url: `suppliers/list`,
  })
}

export const getSuppliersById = async (id: number) => {
  return makeApiRequest<Suppliers>({
    method: "get",
    url: `suppliers/${id}`,
  })
}

export const mutateSuppliers = async ({
  id,
  data,
}: {
  id?: number
  data: MutateSuppliers
}) => {
  if (id) {
    return makeApiRequest({
      method: "put",
      url: `suppliers/${id}`,
      data: data,
    })
  }
  return makeApiRequest({
    method: "post",
    url: `suppliers`,
    data: data,
  })
}
