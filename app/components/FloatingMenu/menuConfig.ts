import { Roles } from "@lib/api"
import { ProductForm } from "../Forms/ProductsForm"
import { SupplierForm } from "../Forms/SupplierForm"
import { ClientForm } from "../Forms/ClientForm"
import { OrderForm } from "../Forms/OrderForm"
import InventoryReport from "../Report/InventoryReport"
import SalesReport from "../Report/SalesReport"
import FinancialTransactionsReport from "../Report/FinancialTransactionReport"

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
      isSubMenu: true,
      title: "Novo Produto",
      path: "^/menu/products$",
      subMenus: [
        {
          title: "Novo Produto",
          component: ProductForm,
          icon: "add",
          roles: []
        },
        {
          title: "Relatório de Estoque",
          component: InventoryReport,
          icon: "inventory",
          roles: []
        },
      ]
    },
    {
      title: "Novo Fornecedor",
      path: "^/menu/suppliers$",
      component: SupplierForm,
    },
    {
      title: "Novo Cliente",
      path: "^/menu/clients$",
      component: ClientForm,
    },
    {
      isSubMenu: true,
      title: "Novo Pedido",
      path: "^/$",
      subMenus: [
        {
          title: "Novo Pedido",
          component: OrderForm,
          icon: "add",
          roles: []
        },
        {
          title: "Relatório de Vendas",
          component: SalesReport,
          icon: "shopping_cart",
          roles: []
        }
      ]
    },
    {
      isSubMenu: true,
      title: "Transações",
      path: "^/menu/transactions$",
      subMenus: [
        {
          title: "Relatório de Transações Financeiras",
          component: FinancialTransactionsReport,
          icon: "credit_card",
          roles: []
        },
      ]
    }
  ]
}
