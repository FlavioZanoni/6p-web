"use client"

import { ListPage } from "@components/pages/ListPage"
import { useUserContext } from "@context/userContext"
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import { getOrders, Order } from "../lib/api/order"
import { OrderForm } from "../components/Forms/OrderForm"

export default function Home() {
  const [currentId, setCurrentId] = useState<number | undefined>(undefined)

  const router = useRouter()
  const { userCtx } = useUserContext()

  useEffect(() => {
    if (!userCtx) router.push("/login")
  }, [userCtx])

  return (
    <ListPage<Order>
      instances={["Orders"]}
      apiFunction={getOrders}
      title={"Pedidos"}
      subtitle={"Lista de Pedidos cadastrados"}
      label={"Pedidos"}
      currentId={currentId}
      setCurrentId={setCurrentId}
      form={OrderForm}
    />
  )
}

