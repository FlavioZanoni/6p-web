import * as z from "zod"

export const validationSchema = () => {
  return z
    .object({
      data: z
        .string()
        .refine(
          (val) => !isNaN(Date.parse(val)),
          { message: "Data inválida" }
        ),
      tipo: z
        .enum(["Entrada", "Saída"], {
          required_error: "Tipo da transação é obrigatório",
        }),
      valor: z.coerce
        .number()
        .min(0.01, { message: "O valor mínimo é de 0.01" })
        .max(999999, { message: "O valor máximo é de 999999" }),
      produtoId: z
        .number()
        .positive({ message: "Produto ID deve ser positivo" })
        .optional(),
      pedidoId: z
        .number()
        .positive({ message: "Pedido ID deve ser positivo" })
        .optional(),
    })
    .strict()
}
