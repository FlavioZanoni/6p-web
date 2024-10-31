"use client"
import { Products, getProducts } from "@api/products"
import { ProductForm } from "@components/Forms/ProductsForm"
import { ListPage } from "@components/pages/ListPage"
import { useUserContext } from "@context/userContext"
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'

export default function Home() {
  const [currentId, setCurrentId] = useState<number | undefined>(undefined)

  const router = useRouter()
  const { userCtx } = useUserContext()

  useEffect(() => {
    if (!userCtx) router.push("/login")
  }, [userCtx])

  return (
    <ListPage<Products>
      instances={["Products"]}
      apiFunction={getProducts}
      title={"Products"}
      subtitle={"Lista de Produtos cadastrados"}
      label={"Products"}
      currentId={currentId}
      setCurrentId={setCurrentId}
      form={ProductForm}
    />
  )
}

