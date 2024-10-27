"use client"
import { getMe } from "@api/getMe"
import { ListPage } from "@components/pages/ListPage"
import { useUserContext } from "@context/userContext"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { DefaultPage } from "../components/Skeletons"
import { Example, getExample } from "../lib/api/example"

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
    <ListPage<Example>
      instances={["Example"]}
      apiFunction={getExample}
      title={"Example"}
      subtitle={"Lista de Example cadastradas"}
      label={"Example"}
      currentId={currentId}
      setCurrentId={setCurrentId}
      search
    />
  )
}

