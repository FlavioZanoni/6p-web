import { Roles } from "@lib/api"
import { ProductForm } from "../Forms/ProductsForm"
import { SupplierForm } from "../Forms/SupplierForm"
import { ClientForm } from "../Forms/ClientForm"

export const noMenuPaths = []

export type SubMenus = {
  title: string
  component?: React.FC<any>
  icon: string
  link?: string
  roles: Roles[]
  onClick?: () => void
}

export type Menu = {
  title: string
  path: string
  component?: React.FC<any>
  isSubMenu?: boolean
  subMenus?: SubMenus[]
  roles?: Roles[]
}

export const createMenus = (): Menu[] => {
  return [
    {
      title: "Novo Produto",
      path: "^/$",
      component: ProductForm,
      roles: ["exampleRole"],
    }, {
      title: "Novo Fornecedor",
      path: "^/menu/suppliers$",
      component: SupplierForm,
      roles: ["exampleRole"],
    }, {
      title: "Novo Cliente",
      path: "^/menu/clients$",
      component: ClientForm,
      roles: ["exampleRole"],
    },
  ]
}
