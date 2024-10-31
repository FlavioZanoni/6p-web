"use client"
import { Clients, getClients } from "@api/clients"
import { ClientForm } from "@/app/components/Forms/ClientForm"
import { ListPage } from "@components/pages/ListPage"
import { useState } from "react"

const Clients = () => {
  const [currentId, setCurrentId] = useState<number | undefined>(undefined)

  return (
    <ListPage<Clients>
      instances={["Clients"]}
      apiFunction={getClients}
      title={"Clientes"}
      subtitle={"Lista de clientes cadastrados"}
      label={"Clientes"}
      currentId={currentId}
      setCurrentId={setCurrentId}
      form={ClientForm}
    />
  )
}

export default Clients
