import * as z from "zod";

export const validationSchema = () => {
  return z.object({
    clientId: z.number().positive({ message: "Cliente ID deve ser positivo" }),
    status: z.string().nonempty({ message: "Status é obrigatório" }),
    orderItems: z
      .array(
        z.object({
          productId: z.number().positive({ message: "Produto ID deve ser positivo" }),
          quantity: z.coerce
            .number()
            .min(1, { message: "Quantidade mínima é 1" })
            .max(1000, { message: "Quantidade máxima é 1000" }),
          price: z.coerce
            .number()
            .min(0.01, { message: "Preço mínimo é R$ 0,01" })
            .max(10000, { message: "Preço máximo é R$ 10.000,00" }),
        })
      )
      .nonempty({ message: "Deve haver ao menos um item no pedido" }),
  });
};
