import { IError } from "@api/types"
import { useLayoutContext } from "@context/LayoutContext"
import { Button } from "@folhastech/design-system/Button"
import { TextField } from "@folhastech/design-system/TextField"
import { DatePicker } from "@folhastech/design-system/DatePicker"
import { zodResolver } from "@hookform/resolvers/zod"
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { FormSkeletons } from "../FormSkeletons"
import { validationSchema } from "./schema"
import { Order, MutateOrder, getOrderById, mutateOrder } from "@api/order" // Ajuste o caminho de importação conforme necessário
import { Autocomplete } from "@folhastech/design-system/Autocomplete"
import { filterBuilder } from "@/app/lib/filterBuilder"
import { getClients } from "@/app/lib/api/clients"

type Props = {
  id?: number
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>
}

export const OrderForm = ({ id, setOpenDrawer }: Props) => {
  const queryClient = useQueryClient()
  const { setToast } = useLayoutContext()
  const schema = validationSchema()
  type FormValues = z.infer<typeof schema>
  const [queryClients, setQueryClients] = useState<string>("")

  const { register, handleSubmit, control, reset } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const { data, isLoading: isLoadingOrder } = useQuery(
    ["getOrder", id],
    () => getOrderById(id!),
    {
      enabled: !!id,
    }
  )

  useEffect(() => {
    if (isLoadingOrder) return
    if (!data) return
    reset(data)
  }, [data, isLoadingOrder, reset])

  const { mutate, isLoading } = useMutation(
    ["mutateOrder"],
    (data: MutateOrder) => mutateOrder({ id: id, data: data }),
    {
      onSuccess: () => {
        setToast({
          type: "success",
          title: "Pedido atualizado com sucesso",
        })
        queryClient.invalidateQueries({ queryKey: ["getOrder", id] })
        setOpenDrawer(false)
      },
      onError: (error: IError) => {
        setToast({
          type: "error",
          title: error.messages[0],
        })
      },
    }
  )

  const onSubmit = async (data: FormValues) => {
    mutate(data)
  }

  const {
    data: client,
    isLoading: isLoadingClient,
    fetchNextPage: fetchNextClient,
  } = useInfiniteQuery(
    ["getClient", queryClients],
    ({ pageParam }) => {
      const params = []
      if (queryClient) {
        params.push({
          key: "search",
          value: queryClients,
        })
      }
      return getClients({
        page: pageParam?.page ?? 0,
        limit: 10,
        filter: filterBuilder(params),
      })
    },
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.meta.last) {
          return undefined
        }
        return {
          offset: lastPage.meta.page + 1,
          limit: lastPage.meta.limit,
        }
      },
    }
  )

  if (isLoadingOrder && id) return <FormSkeletons inputCount={4} />

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex h-full flex-col justify-between gap-4"
    >
      <div className="flex flex-col gap-4">
        <DatePicker
          label="Data"
          placeholder="Clique para selecionar a data"
          control={control}
          {...register("date")}
        />
        <Autocomplete
          control={control}
          label="Cliente"
          {...register("clientId")}
          placeholder={"Selecione o Cliente"}
          getMoreOptions={fetchNextClient}
          options={client}
          filter={(query: string) => {
            setQueryClients(query)
          }}
          getOptionLabel={(value: number | string) => {
            const byId = client?.pages
              ?.map((page) =>
                page.content?.filter((item) => {
                  return item.id == value
                })
              )
              .flat()[0]?.nome ?? ""
            return byId
          }}
        />
        <TextField
          label="Status"
          placeholder="status"
          {...register("status")}
          control={control}
        />
        <TextField
          label="Total"
          placeholder="total"
          type="number"
          {...register("total")}
          control={control}
        />
      </div>
      <div className="flex justify-end gap-4">
        <Button
          variant="text"
          text={"Cancelar"}
          onClick={() => setOpenDrawer(false)}
        />
        <Button
          type="submit"
          variant="primary"
          disabled={isLoading}
          loading={isLoading}
          text={"Salvar"}
        />
      </div>
    </form>
  )
}
