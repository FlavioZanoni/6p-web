"use client"
import { Suppliers, getSuppliers } from "@api/suppliers"
import { SuppliersForm } from "@components/Forms/SuppliersForm"
import { ListPage } from "@components/pages/ListPage"
import { useState } from "react"

const Suppliers = () => {
  const [currentId, setCurrentId] = useState<number | undefined>(undefined)

  return (
    <ListPage<Suppliers>
      instances={["Admin"]}
      apiFunction={getSuppliers}
      title={"Suppliers"}
      subtitle={"Lista de Fornecedores cadastrados"}
      label={"Suppliers"}
      currentId={currentId}
      setCurrentId={setCurrentId}
      form={SuppliersForm}
      apiParams={[
        { key: "role", value: "Admin" },
      ]}
      dividerLabel={["Admin"]}
      search
    />
  )
}

export default Suppliers
