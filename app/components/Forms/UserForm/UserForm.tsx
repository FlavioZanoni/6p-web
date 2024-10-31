import { IError } from "@api/types"
import { postUser } from "@api/user"
import { useLayoutContext } from "@context/LayoutContext"
import { Button } from "@folhastech/design-system/Button"
import { TextField } from "@folhastech/design-system/TextField"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { validationSchema } from "./schema"

type Props = {
  id?: number
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>
  shouldRedirect?: boolean
}

export const UserForm: React.FC<Props> = ({ setOpenDrawer }) => {
  const { setToast } = useLayoutContext()
  const schema = validationSchema()
  type FormValues = z.infer<typeof schema>

  const form = useForm<FormValues>({
    resolver: zodResolver(validationSchema()),
    shouldUnregister: false,
  })

  const { register, handleSubmit, control, trigger, watch } = form

  const { mutate, isLoading } = useMutation(["mutateUser"], postUser, {
    onSuccess: () => {
      setToast({
        type: "success",
        title: "Usuário criado com sucesso",
      })
      setOpenDrawer(false)
    },
    onError: (error: IError) => {
      setToast({
        type: "error",
        title: error.messages[0],
      })
    },
  })

  const onSubmit = async (data: FormValues) => {
    const { confirmPassword, ...newData } = data
    mutate(newData)
  }

  useEffect(() => {
    if (!watch("password") || !watch("confirmPassword")) return
    trigger("confirmPassword")
  }, [watch("password"), watch("confirmPassword")])

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex min-h-full flex-col justify-between gap-4"
    >
      <div className="flex flex-col gap-4">
        <TextField
          label="Nome"
          placeholder="Digite seu nome"
          {...register("name")}
          control={control}
        />

        <TextField
          label="Email"
          placeholder="Digite seu email"
          {...register("email")}
          control={control}
        />

        <TextField
          label="Senha"
          placeholder="Digite sua senha"
          type={"password"}
          {...register("password")}
          control={control}
        />

        <TextField
          label="Confirmar senha"
          placeholder={"Digite sua senha novamente"}
          type={"password"}
          {...register("confirmPassword", { required: true })}
          control={control}
        />
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex justify-end gap-4">
          <Button
            variant="text"
            text={"Cancelar"}
            onClick={() => {
              setOpenDrawer(false)
            }}
          />
          <Button
            type={"submit"}
            variant="primary"
            loading={isLoading}
            disabled={isLoading}
            text={"Próximo"}
          />
        </div>
      </div>
    </form>
  )
}
