export const getMenus = () => {
  return [
    {
      name: "Produtos",
      icon: "diversity_3",
      path: "/",
      allowedRoles: ["exampleRole"],
    }, {
      name: "Fornecedores",
      icon: "diversity_3",
      path: "/menu/suppliers",
      allowedRoles: ["exampleRole"],
    }, {
      name: "Clientes",
      icon: "diversity_3",
      path: "/menu/clients",
      allowedRoles: ["exampleRole"],
    },
  ]
}
