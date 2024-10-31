import { Roles } from "@lib/api"
import * as z from "zod"

export const validationSchema = (role: Roles) => {
  return z
    .object({
      active: z.boolean().optional(),
      nome: z
        .string()
        .trim()
        .min(5, { message: "Nome deve conter no minimo 5 caractéres" })
        .max(50, { message: "Nome deve conter no maximo 50 caractéres" }),
      cpf_cnpj: z
        .string()
        .trim()
        .min(11, { message: "CPF deve conter no minimo 11 caractéres" })
        .max(14, { message: "CPF ou CPNJ deve conter no maximo 14 caractéres" }),
      contato: z
        .string()
        .trim()
        .min(5, { message: "Contato deve conter no minimo 5 caractéres" })
        .max(50, { message: "Contato deve conter no maximo 50 caractéres" }),
      endereco: z
        .string()
        .trim()
        .min(5, { message: "Endereço deve conter no minimo 5 caractéres" })
        .max(50, { message: "Endereço deve conter no maximo 50 caractéres" }),

    }).strict()
}
