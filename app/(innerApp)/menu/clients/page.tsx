"use client"
import { Clients, getClients } from "@api/clients"
import { ClientsForm } from "@components/Forms/ClientsForm"
import { ListPage } from "@components/pages/ListPage"
import { useState } from "react"

const Clients = () => {
  const [currentId, setCurrentId] = useState<number | undefined>(undefined)

  return (
    <ListPage<Clients>
      instances={["Admin"]}
      apiFunction={getClients}
      title={"Clients"}
      subtitle={"Lista de Clientes cadastrados"}
      label={"Clients"}
      currentId={currentId}
      setCurrentId={setCurrentId}
      form={ClientsForm}
      apiParams={[
        { key: "role", value: "Admin" },
      ]}
      dividerLabel={["Admin"]}
      search
    />
  )
}

export default Clients
