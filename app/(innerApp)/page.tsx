"use client"
import { Products, getProducts } from "@api/products"
import { ProductForm } from "@components/Forms/ProductsForm"
import { getMe } from "@api/getMe"
import { ListPage } from "@components/pages/ListPage"
import { useUserContext } from "@context/userContext"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { DefaultPage } from "../components/Skeletons"

export default function Home() {
  const [currentId, setCurrentId] = useState<number | undefined>(undefined)
  const { setUserCtx } = useUserContext()

  // using this instead of the ctx itself because of the access to the loading state, making it an smoothier experience
  const { isLoading: isLoadingCtx } = useQuery(["getMePage"], getMe, {
    onSuccess: (data) => {
      setUserCtx(data)
    },
  })

  if (isLoadingCtx) return <DefaultPage />

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

