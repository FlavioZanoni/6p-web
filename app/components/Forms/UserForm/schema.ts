import { z } from "zod"

export const validationSchema = () => {
  return z
    .object({
      name: z
        .string({
          required_error: "Email é obrigatório",
        }).trim()
        .email("Email inválido"),
      email: z
        .string({
          required_error: "Email é obrigatório",
        }).trim()
        .email("Email inválido"),
      password: z
        .string({
          required_error: "Senha é obrigatória",
        })
        .min(5, "A senha deve ter no mínimo 5 caracteres"),
      confirmPassword: z
        .string({
          required_error: "Confirmação de senha é obrigatória",
        })
        .min(5, "A senha deve ter no mínimo 5 caracteres"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "As senhas não coincidem",
      path: ["confirmPassword"],
    })
}
