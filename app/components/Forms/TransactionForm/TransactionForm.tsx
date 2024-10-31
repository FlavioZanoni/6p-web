import { IError } from "@api/types"
import { useLayoutContext } from "@context/LayoutContext"
import { Button } from "@folhastech/design-system/Button"
import { Select } from "@folhastech/design-system/Select"
import { TextField } from "@folhastech/design-system/TextField"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { FormSkeletons } from "../FormSkeletons"
import { validationSchema } from "./schema"
import { Transaction, MutateTransaction, getTransactionById, mutateTransaction } from "@api/transaction"
import { useUserContext } from "@/app/lib/context/userContext"

type Props = {
  id?: number
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>
}

export const TransactionForm = ({ id, setOpenDrawer }: Props) => {
  const queryClient = useQueryClient()
  const { setToast } = useLayoutContext()
  const { userCtx } = useUserContext()
  const schema = validationSchema()
  type FormValues = z.infer<typeof schema>

  const { register, handleSubmit, control, reset, watch, setValue } =
    useForm<FormValues>({
      resolver: zodResolver(validationSchema()),
    })

  const { data, isLoading: isLoadingTransaction } = useQuery(
    ["getTransaction", id],
    () => getTransactionById(id!),
    {
      enabled: !!id,
    }
  )

  useEffect(() => {
    if (isLoadingTransaction) return
    if (!data) return
  }, [data])

  const { mutate, isLoading } = useMutation(
    ["mutateTransaction"],
    (data: MutateTransaction) => mutateTransaction({ id: id, data: data }),
    {
      onSuccess: () => {
        setToast({
          type: "success",
          title: "Transação atualizada com sucesso",
        })
        queryClient.invalidateQueries({ queryKey: ["getTransaction", id] })
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

  if (isLoadingTransaction && id) return <FormSkeletons inputCount={3} />

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex h-full flex-col justify-between gap-4"
    >
      <div className="flex flex-col gap-4">
        <TextField
          label="Data da Transação"
          type="date"
          {...register("data")}
          control={control}
        />

        <Select
          label="Tipo da Transação"
          options={[
            { value: "Entrada", label: "Entrada" },
            { value: "Saída", label: "Saída" },
          ]}
          {...register("tipo")}
          control={control}
        />

        <TextField
          label="Valor"
          type="number"
          placeholder="valor"
          {...register("valor")}
          control={control}
        />

        <TextField
          label="Produto ID"
          type="number"
          placeholder="produtoId"
          {...register("produtoId")}
          control={control}
        />

        <TextField
          label="Pedido ID"
          type="number"
          placeholder="pedidoId"
          {...register("pedidoId")}
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
