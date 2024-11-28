import { IError } from "@api/types"
import { useLayoutContext } from "@context/LayoutContext"
import { Button } from "@folhastech/design-system/Button"
import { Autocomplete } from "@folhastech/design-system/Autocomplete"
import { Switch } from "@folhastech/design-system/Switch"
import { TextField } from "@folhastech/design-system/TextField"
import { zodResolver } from "@hookform/resolvers/zod"
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { FormSkeletons } from "../FormSkeletons"
import { validationSchema } from "./schema"
import { MutateProducts, getProductsById, mutateProducts } from "@api/products"
import { getSuppliers } from "@/app/lib/api/suppliers"
import { filterBuilder } from "@/app/lib/filterBuilder"

type Props = {
  id?: number
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>
}

// keyof the instance, not sure if best, bc if im getting the z.infer type of the schema it starts to get messy when you are using conditional validation logic based on the role

export const ProductForm = ({ id, setOpenDrawer }: Props) => {
  const queryClient = useQueryClient()
  const { setToast } = useLayoutContext()
  const schema = validationSchema()
  type FormValues = z.infer<typeof schema>
  const [querySupplier, setQuerySupplier] = useState<string>("")

  const { register, handleSubmit, control, reset, watch, setValue } =
    useForm<FormValues>({
      resolver: zodResolver(validationSchema()),
    })

  const { data, isLoading: isLoadingProduct } = useQuery(
    ["getProduct", id],
    () => getProductsById(id!),
    {
      enabled: !!id,
    }
  )

  useEffect(() => {
    if (isLoadingProduct) return
    if (!data) return
    reset(data)
  }, [data])

  const { mutate, isLoading } = useMutation(
    ["mutateProducts"],
    (data: MutateProducts) => mutateProducts({ id: id, data: data }),
    {
      onSuccess: () => {
        setToast({
          type: "success",
          title: "Produto atualizada com sucesso",
        })
        queryClient.invalidateQueries({ queryKey: ["getProducts", id] })
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

  const {
    data: suppliers,
    isLoading: isLoadingSupplier,
    fetchNextPage: fetchNextSupplier,
  } = useInfiniteQuery(
    ["getSuppliers", querySupplier],
    ({ pageParam }) => {
      const params = []
      if (querySupplier) {
        params.push({
          key: "search",
          value: querySupplier,
        })
      }
      return getSuppliers({
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

  const onSubmit = async (data: FormValues) => {
    mutate(data)
  }

  if ((isLoadingProduct || isLoadingSupplier) && id) return <FormSkeletons inputCount={3} />

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex h-full flex-col justify-between gap-4"
    >
      <div className="flex flex-col gap-4">
        {id ? (
          <Switch
            onClick={() => {
              setValue("active", !watch("active"))
            }}
            label={"Ativo"}
            {...register("active")}
            control={control}
          />
        ) : null}

        <TextField
          label="Nome"
          placeholder="name"
          {...register("name")}
          control={control}
        />

        <TextField
          label="Descrição"
          placeholder="descricao"
          {...register("descricao")}
          control={control}
        />
        <TextField
          label="Preço"
          placeholder="preco"
          {...register("preco")}
          type="number"
          control={control}
        />
        <TextField
          label="Quantidade"
          placeholder="quantidade"
          {...register("quantidade")}
          type="number"
          control={control}
        />
        <TextField
          label="Imagem"
          placeholder="imagem"
          {...register("imagem")}
          control={control}
        />

        <Autocomplete
          control={control}
          label="Fornecedor"
          {...register("fornecedorId")}
          placeholder={"Selecione o fornecedor"}

          getMoreOptions={fetchNextSupplier}
          options={suppliers}
          filter={(query: string) => {
            setQuerySupplier(query)
          }}
          getOptionLabel={(value: number | string) => {
            const byId = suppliers?.pages
              ?.map((page) =>
                page.content?.filter((item) => {
                  return item.id == value
                })
              )
              .flat()[0]?.name ?? ""
            return byId
          }}
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
