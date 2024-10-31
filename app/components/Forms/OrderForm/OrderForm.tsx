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
import { Order, MutateOrder, getOrderById, mutateOrder } from "@api/order" // Ajuste o caminho de importação conforme necessário
import { useUserContext } from "@/app/lib/context/userContext"

type Props = {
  id?: number
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>
}

export const OrderForm = ({ id, setOpenDrawer }: Props) => {
  const queryClient = useQueryClient()
  const { setToast } = useLayoutContext()
  const { userCtx } = useUserContext()
  const schema = validationSchema()
  type FormValues = z.infer<typeof schema>

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

  if (isLoadingOrder && id) return <FormSkeletons inputCount={4} />

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex h-full flex-col justify-between gap-4"
    >
      <div className="flex flex-col gap-4">
        <TextField
          label="Data do Pedido"
          placeholder="data"
          type="data"
          {...register("data")}
          control={control}
        />
        <TextField
          label="ID do Cliente"
          placeholder="clienteId"
          {...register("clienteId")}
          control={control}
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
