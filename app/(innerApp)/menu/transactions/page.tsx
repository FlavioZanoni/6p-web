"use client"
import { TransactionForm } from "@/app/components/Forms/TransactionForm"
import { getTransactions, Transaction } from "@/app/lib/api/transaction"
import { ListPage } from "@components/pages/ListPage"
import { useState } from "react"

const Transactions = () => {
  const [currentId, setCurrentId] = useState<number | undefined>(undefined)

  return (
    <ListPage<Transaction>
      instances={["Transactions"]}
      apiFunction={getTransactions}
      title={"Transações"}
      subtitle={"Lista de transações"}
      label={"Transações"}
      currentId={currentId}
      setCurrentId={setCurrentId}
      form={TransactionForm}
    />
  )
}

export default Transactions
