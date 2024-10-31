"use client"
import { loginUser } from "@auth/authApi"
import { Button } from "@folhastech/design-system/Button"
import { TextField } from "@folhastech/design-system/TextField"
import { zodResolver } from "@hookform/resolvers/zod"
import { IError } from "@lib/api"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import React from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import Cookies from "universal-cookie"
import { validationSchema } from "./schema"
import { TOKEN_COOKIE_NAME } from "@/app/lib/constants"
import { useUserContext } from "@/app/lib/context/userContext"
import { useRouter } from 'next/navigation'

type FormValues = {
  login: string
  password: string
}

type Props = {
  setErrorToast: React.Dispatch<
    React.SetStateAction<AxiosError<IError> | undefined>
  >
}

export const LoginForm = ({ setErrorToast }: Props) => {
  const router = useRouter()
  const cookies = new Cookies()
  const { setUserCtx } = useUserContext()

  const { register, control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(validationSchema()),
  })
  const { mutate, isLoading } = useMutation(["login"], loginUser, {
    onSuccess: (data) => {
      cookies.set(TOKEN_COOKIE_NAME, data.token, {
        path: "/",
      })
      setUserCtx(data)
      router.push("/")
    },
    onError: (error: AxiosError<IError>) => {
      console.log("here")
      console.log("error", error)
      setErrorToast(error)
    },
  })

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    mutate(data)
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-10"
    >
      <TextField
        placeholder="Email"
        {...register("login")}
        control={control}
        autoComplete="username"
      />
      <TextField
        type={"password"}
        placeholder="Senha"
        {...register("password")}
        control={control}
        autoComplete="current-password"
      />

      <Button loading={isLoading} disabled={isLoading} type="submit">
        Entrar
      </Button>
    </form>
  )
}
