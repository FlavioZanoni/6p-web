import { IError, Roles } from "@api/types"
import { useLayoutContext } from "@context/LayoutContext"
import { Button } from "@folhastech/design-system/Button"
import { Select } from "@folhastech/design-system/Select"
import { Autocomplete } from "@folhastech/design-system/Autocomplete"
import { Switch } from "@folhastech/design-system/Switch"
import { TextField } from "@folhastech/design-system/TextField"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { FormSkeletons } from "../FormSkeletons"
import { validationSchema } from "./schema"
import { Suppliers, MutateSuppliers, getSuppliersById, mutateSuppliers } from "@api/suppliers"
import { useUserContext } from "@/app/lib/context/userContext"

type Props = {
  id?: number
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>
}

// keyof the instance, not sure if best, bc if im getting the z.infer type of the schema it starts to get messy when you are using conditional validation logic based on the role

export const SupplierForm = ({ id, setOpenDrawer }: Props) => {
  const queryClient = useQueryClient()
  const { setToast } = useLayoutContext()
  const { userCtx } = useUserContext()
  const schema = validationSchema(userCtx?.role!)
  type FormValues = z.infer<typeof schema>

  const { register, handleSubmit, control, reset, watch, setValue } =
    useForm<FormValues>({
      resolver: zodResolver(validationSchema(userCtx?.role!)),
    })

  const { data, isLoading: isLoadingProduct } = useQuery(
    ["getProduct", id],
    () => getSuppliersById(id!),
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
    ["mutateProduct"],
    (data: MutateSuppliers) => mutateSuppliers({ id: id, data: data }),
    {
      onSuccess: () => {
        setToast({
          type: "success",
          title: "Product atualizada com sucesso",
        })
        queryClient.invalidateQueries({ queryKey: ["getProduct", id] })
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

  if (isLoadingProduct && id) return <FormSkeletons inputCount={3} />

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