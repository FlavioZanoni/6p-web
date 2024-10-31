import { Roles } from "@/app/lib/api"
import * as z from "zod"

export const validationSchema = (role: Roles) => {
  return z
    .object({
      pedidoId: z.number().positive({ message: "Pedido ID deve ser positivo" }),
      produtoId: z.number().positive({ message: "Produto ID deve ser positivo" }),
      quantidade: z
        .number()
        .positive({ message: "Quantidade deve ser um valor positivo" })
        .max(1000, { message: "Quantidade máxima é de 1000" }),
      precoUnitario: z
        .number()
        .min(0.01, { message: "Preço mínimo é de 0.01" })
        .max(100000, { message: "Preço máximo é de 100000" }),
    })
    .strict()
}
