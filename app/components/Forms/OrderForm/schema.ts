import * as z from "zod"

export const validationSchema = () => {
  return z
    .object({
      date: z.string(),
      clientId: z.number().positive({ message: "Cliente ID deve ser positivo" }),
      status: z.string().nonempty({ message: "Status é obrigatório" }),
      total: z.coerce
        .number()
        .min(0.01, { message: "Total deve ser maior que 0" })
        .max(1000000, { message: "Total máximo é de 1000000" }),
    })

}
