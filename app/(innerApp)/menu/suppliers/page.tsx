"use client"
import { Suppliers, getSuppliers } from "@api/suppliers"
import { SupplierForm } from "@components/Forms/SupplierForm"
import { ListPage } from "@components/pages/ListPage"
import { useState } from "react"

const Suppliers = () => {
  const [currentId, setCurrentId] = useState<number | undefined>(undefined)

  return (
    <ListPage<Suppliers>
      instances={["Suppliers"]}
      apiFunction={getSuppliers}
      title={"Fornecedores"}
      subtitle={"Lista de fornecedores cadastrados"}
      label={"Fornecedores"}
      currentId={currentId}
      setCurrentId={setCurrentId}
      form={SupplierForm}
    />
  )
}

export default Suppliers
