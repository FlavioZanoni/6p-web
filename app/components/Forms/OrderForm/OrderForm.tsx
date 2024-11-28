import { IError } from "@api/types"
import { useLayoutContext } from "@context/LayoutContext"
import { Button } from "@folhastech/design-system/Button"
import { TextField } from "@folhastech/design-system/TextField"
import { DatePicker } from "@folhastech/design-system/DatePicker"
import { zodResolver } from "@hookform/resolvers/zod"
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { z } from "zod"
import { FormSkeletons } from "../FormSkeletons"
import { validationSchema } from "./schema"
import { Order, MutateOrder, getOrderById, mutateOrder } from "@api/order"
import { Autocomplete } from "@folhastech/design-system/Autocomplete"
import { filterBuilder } from "@/app/lib/filterBuilder"
import { getClients } from "@/app/lib/api/clients"
import { Icon } from "@folhastech/design-system/Icon"
import { getProducts } from "@/app/lib/api/products"
import { Select } from "@folhastech/design-system/Select"

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
  const [queryProducts, setQueryProducts] = useState<string>("")
  const [query, setQuery] = useState<string>("")

  const { register, handleSubmit, control, reset, watch, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "orderItems",
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
    reset({
      ...data,
      status: data.status || "Pendente",
    })
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
      if (queryClients) {
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

  const {
    data: product,
    isLoading: isLoadingProduct,
    fetchNextPage: fetchNextProduct,
  } = useInfiniteQuery(
    ["getProducts", queryProducts],
    ({ pageParam }) => {
      const params = []
      if (queryProducts) {
        params.push({
          key: "search",
          value: queryProducts,
        })
      }
      return getProducts({
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
        {id && (
          <DatePicker
            label="Data"
            placeholder="Clique para selecionar a data"
            control={control}
            onChange={() => { }}
            name="date"
            disabled
          />
        )}
        <Autocomplete
          control={control}
          label="Cliente"
          {...register("clientId")}
          placeholder={"Selecione o Cliente"}
          getMoreOptions={fetchNextClient}
          options={client}
          filter={(query: string) => setQueryClients(query)}
          getOptionLabel={(value: number | string) => {
            if (!client?.pages) return "";

            const byId = client?.pages
              ?.map((page) =>
                page.content?.filter((item) => {
                  return item.id == value
                })
              )
              .flat()[0]?.name ?? ""
            return byId
          }}
        />
        <Select
          label="Status"
          placeholder="Selecione o status"
          {...register("status")}
          control={control}
          options={[
            { value: "Pendente", label: "Pendente" },
            { value: "Concluído", label: "Concluído" },
          ]}
        />
      </div>
      {id && (
        <div className="flex flex-col gap-4">
          <TextField
            label="Total"
            placeholder="Total do pedido"
            type="number"
            disabled
            control={control}
            name="total"
            onChange={() => { }}
          />
        </div>
      )}
      <div className="flex min-w-full flex-col gap-8 rounded-lg border border-gray-30 bg-white px-5 py-4 text-primary-0">
        {fields.map((field, index) => (
          <div key={field.id} className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-light">Produto {index + 1}</p>
              <Button
                variant="text"
                onClick={() => {
                  if (fields.length === 1) return
                  remove(index)
                }}
              >
                <Icon name="delete" className="text-error-10" />
              </Button>
            </div>
            <Autocomplete
              control={control}
              {...register(`orderItems.${index}.productId`)} // Corrigido para o name correto do campo
              placeholder="Selecione o produto"
              isLoading={isLoadingProduct}
              getMoreOptions={fetchNextProduct}
              options={product}
              filter={(query: string) => setQuery(query)}
              getOptionLabel={(value: number | string) => "Produto " + value}
            />
            <TextField
              label="Quantidade"
              type="number"
              placeholder="Insira a quantidade"
              {...register(`orderItems.${index}.quantity`)} // Corrigido para o name correto do campo
              control={control}
            />
            <TextField
              label="Preço"
              type="number"
              placeholder="Insira o preço"
              {...register(`orderItems.${index}.price`,
                {
                  valueAsNumber: true,
                }
              )}
              control={control}
            />
            {errors?.orderItems?.[index]?.quantity && (
              <span className="text-error-10">{errors?.orderItems?.[index]?.quantity?.message}</span>
            )}
            {errors?.orderItems?.[index]?.price && (
              <span className="text-error-10">{errors?.orderItems?.[index]?.price?.message}</span>
            )}
          </div>
        ))}
        <div className="flex items-center justify-center">
          <Button
            variant="text"
            onClick={() => append({ productId: "", quantity: 1, price: 0 })}
          >
            <div className="flex gap-4">
              <Icon name="add" />
              <p>Adicionar Produto</p>
            </div>
          </Button>
        </div>
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
