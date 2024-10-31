import { IError } from "@api/types"
import { useLayoutContext } from "@context/LayoutContext"
import { Button } from "@folhastech/design-system/Button"
import { TextField } from "@folhastech/design-system/TextField"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { FormSkeletons } from "../FormSkeletons"
import { validationSchema } from "./schema"
import { ItemOrders, MutateItemOrders, getItemOrdersById, mutateItemOrders } from "@api/itemOrders"
import { useUserContext } from "@/app/lib/context/userContext"

type Props = {
  id?: number
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>
}

export const ItemForm = ({ id, setOpenDrawer }: Props) => {
  const queryClient = useQueryClient()
  const { setToast } = useLayoutContext()
  const { userCtx } = useUserContext()
  const schema = validationSchema(userCtx?.role!)
  type FormValues = z.infer<typeof schema>

  const { register, handleSubmit, control, reset, watch, setValue } = useForm<FormValues>({
    resolver: zodResolver(validationSchema(userCtx?.role!)),
  })

  const { data, isLoading: isLoadingItem } = useQuery(
    ["getItemOrders", id],
    () => getItemOrdersById(id!),
    {
      enabled: !!id,
    }
  )

  useEffect(() => {
    if (isLoadingItem) return
    if (!data) return
  }, [data])

  const { mutate, isLoading } = useMutation(
    ["mutateItemOrders"],
    (data: MutateItemOrders) => mutateItemOrders({ id: id, data: data }),
    {
      onSuccess: () => {
        setToast({
          type: "success",
          title: "Item do pedido atualizado com sucesso",
        })
        queryClient.invalidateQueries({ queryKey: ["getItemOrders", id] })
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

  if (isLoadingItem && id) return <FormSkeletons inputCount={4} />

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex h-full flex-col justify-between gap-4"
    >
      <div className="flex flex-col gap-4">
        <TextField
          label="Pedido"
          placeholder="pedidoId"
          {...register("pedidoId")}
          control={control}
        />
        <TextField
          label="Produto"
          placeholder="produtoId"
          {...register("produtoId")}
          control={control}
        />
        <TextField
          label="Quantidade"
          placeholder="quantidade"
          {...register("quantidade")}
          control={control}
        />
        <TextField
          label="Preço"
          placeholder="precoUnitario"
          {...register("precoUnitario")}
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
