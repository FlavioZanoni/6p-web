"use client"
import { Products, getProducts } from "@api/products"
import { ProductsForm } from "@components/Forms/ProductsForm"
import { ListPage } from "@components/pages/ListPage"
import { useState } from "react"

const Products = () => {
  const [currentId, setCurrentId] = useState<number | undefined>(undefined)

  return (
    <ListPage<Products>
      instances={["Admin"]}
      apiFunction={getProducts}
      title={"Products"}
      subtitle={"Lista de Produtos cadastrados"}
      label={"Products"}
      currentId={currentId}
      setCurrentId={setCurrentId}
      form={ProductsForm}
      apiParams={[
        { key: "role", value: "Admin" },
      ]}
      dividerLabel={["Admin"]}
      search
    />
  )
}

export default Products
