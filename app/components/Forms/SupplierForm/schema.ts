import * as z from "zod"

export const validationSchema = () => {
  return z
    .object({
      active: z.boolean().optional(),
      name: z
        .string()
        .trim()
        .min(5, { message: "Nome deve conter no minimo 5 caractéres" })
        .max(50, { message: "Nome deve conter no maximo 50 caractéres" }),
      cnpj: z
        .string()
        .trim()
        .min(14, { message: "CNPJ deve conter no minimo 14 caractéres" })
        .max(14, { message: "CNPJ deve conter no maximo 14 caractéres" }),
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
