import { makeApiRequest } from "../makeApiRequest"
import { GetApiParams, Pagination } from "../types"
import { MutateTransaction, Transaction } from "./types"

export const getTransactions = async ({
  offset,
  limit,
  filter,
}: GetApiParams) => {
  return makeApiRequest<Pagination<Transaction>>({
    method: "get",
    url: `transactions?offset=${offset}&limit=${limit}${filter || ""}`,
  })
}

export const getTransactionsPaginationless = async (): Promise<Transaction[]> => {
  return await makeApiRequest({
    method: "get",
    url: `transactions/list`,
  })
}

export const getTransactionById = async (id: number) => {
  return makeApiRequest<Transaction>({
    method: "get",
    url: `transactions/${id}`,
  })
}

export const mutateTransaction = async ({
  id,
  data,
}: {
  id?: number
  data: MutateTransaction
}) => {
  if (id) {
    return makeApiRequest({
      method: "put",
      url: `transactions/${id}`,
      data: data,
    })
  }
  return makeApiRequest({
    method: "post",
    url: `transactions`,
    data: data,
  })
}
