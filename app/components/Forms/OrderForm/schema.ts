import * as z from "zod"

export const validationSchema = () => {
  return z
    .object({
      data: z.date().max(new Date(), { message: "Data não pode ser no futuro" }),
      clienteId: z.number().positive({ message: "Cliente ID deve ser positivo" }),
      status: z.string().nonempty({ message: "Status é obrigatório" }),
      total: z
        .number()
        .min(0.01, { message: "Total deve ser maior que 0" })
        .max(1000000, { message: "Total máximo é de 1000000" }),
    })
    .strict()
}
