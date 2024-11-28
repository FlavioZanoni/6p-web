import { Roles } from "@lib/api"
import * as z from "zod"

export const validationSchema = () => {
  return z
    .object({
      active: z.boolean().optional(),
      name: z
        .string()
        .trim()
        .min(5, { message: "Nome deve conter no minimo 5 caracteres" })
        .max(50, { message: "Nome deve conter no maximo 50 caracteres" }),
      preco: z.coerce
        .number()
        .min(0.01, { message: "Preço minimo é de 0.01 centavos" })
        .max(999999, { message: "Preço maximo é de 999999" }),
      quantidade: z.coerce
        .number()
        .min(1, { message: "Quantidade minima é de 1" })
        .max(999999, { message: "Quantidade maxima é de 999999" }),
      descricao: z
        .string()
        .trim()
        .min(5, { message: "Descrição deve conter no minimo 5 caracteres" })
        .max(50, { message: "Descrição deve conter no maximo 50 caracteres" }),
      fornecedorId: z.coerce
        .number()
        .int()
        .positive({ message: "Fornecedor deve ser um número positivo" })
        .max(999999, { message: "Fornecedor maximo é de 999999" }),
      imagem: z
        .string()
        .url({ message: "Imagem deve ser uma URL válida" })
        .max(50, { message: "A URL da imagem deve conter no maximo 255 caractéres" }),

    }).strict()
}
