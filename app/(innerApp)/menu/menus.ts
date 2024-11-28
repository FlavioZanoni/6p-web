export const getMenus = () => {
  return [
    {
      name: "Pedidos",
      icon: "inventory",
      path: "/menu/orders",
      allowedRoles: ["exampleRole"],
    },
    {
      name: "Produtos",
      icon: "inventory_2",
      path: "/",
      allowedRoles: ["exampleRole"],
    },
    {
      name: "Fornecedores",
      icon: "diversity_2",
      path: "/menu/suppliers",
      allowedRoles: ["exampleRole"],
    },
    {
      name: "Clientes",
      icon: "diversity_3",
      path: "/menu/clients",
      allowedRoles: ["exampleRole"],
    },
    {
      name: "Transações",
      icon: "receipt_long",
      path: "/menu/transations",
      allowedRoles: ["exampleRole"],
    },
  ]
}
