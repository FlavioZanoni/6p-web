import { Roles } from "@/app/lib/api"
import * as z from "zod"

export const validationSchema = (role: Roles) => {
  return z
    .object({
      orderId: z.number().positive({ message: "Pedido ID deve ser positivo" }),
      productId: z.number().positive({ message: "Produto ID deve ser positivo" }),
      quantity: z
        .number()
        .positive({ message: "Quantidade deve ser um valor positivo" })
        .max(1000, { message: "Quantidade máxima é de 1000" }),
      price: z
        .number()
        .min(0.01, { message: "Preço mínimo é de 0.01" })
        .max(100000, { message: "Preço máximo é de 100000" }),
    })
    .strict()
}
