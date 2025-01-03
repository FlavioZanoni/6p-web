import { DefType, GetApiParams, Pagination } from "@api/types"
import { Icon } from "@components/Icon"
import { Button } from "@folhastech/design-system/Button"
import { Drawer } from "@folhastech/design-system/Drawer"
import { filterBuilder } from "@lib/filterBuilder"
import Link from "next/link"
import { useInfiniteQuery } from "@tanstack/react-query"
import React, { useState } from "react"
import Skeleton from "react-loading-skeleton"
import { OnClickProps } from "../../pages/ListPage"
import { Content } from "./Content"
import dayjs from "dayjs"

type ApiFunction<T> = (params?: GetApiParams) => Promise<Pagination<T>>

type PageListProps<T> = {
  form?: ({
    id,
    setOpenDrawer,
  }: {
    id: number | undefined
    setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>
  }) => JSX.Element
  title: string
  label: string
  apiFunction: ApiFunction<T>
  currentId: number | undefined
  setCurrentId: React.Dispatch<React.SetStateAction<number | undefined>>
  onClick?: ({ e, id }: OnClickProps) => void
  instance: string
  query?: string
  filterValues?: { [key: string]: string }
  param?: {
    [key: string]: string
  }
  children?: React.ReactNode
  path?: string
}

function PaginatedList<T extends DefType>({
  form,
  title,
  label,
  apiFunction,
  currentId,
  setCurrentId,
  onClick,
  instance,
  query,
  filterValues = {},
  param,
  children,
  path,
}: PageListProps<T>) {
  const [openDrawer, setOpenDrawer] = useState(false)
  const { data, isLoading, fetchNextPage, isFetching, hasNextPage } =
    useInfiniteQuery(
      [`get${instance}`, param, query, filterValues],
      ({ pageParam }) => {
        const params = []
        if (param) {
          params.push({
            key: param.key,
            value: param.value,
          })
        }
        if (query) {
          params.push({
            key: "search",
            value: query,
          })
        }

        Object.keys(filterValues || {}).forEach((item) => {
          params.push({
            key: item,
            value: filterValues[item]
          })
        })

        return apiFunction({
          page: pageParam?.page ?? 0,
          limit: 10,
          filter: filterBuilder(params),
        })
      },
      {
        getNextPageParam: (lastPage) => {
          if (lastPage?.meta?.last) {
            return undefined
          }
          return {
            page: lastPage?.meta?.page + 1,
            limit: lastPage?.meta?.limit,
          }
        },
        keepPreviousData: false,
      }
    )
  console.log(isLoading)
  if (isLoading) {
    return (
      <Skeleton height={57} count={4} className="mt-6 first:mt-0" />
    )
  }

  return (
    <>
      <div>
        {data?.pages?.[0]?.content?.length === 0 ? (
          <h2 className="text-center text-sm text-primary-0">
            Item não encontrado
          </h2>
        ) : (
          <div className="flex flex-col gap-6 ">
            {data?.pages?.map((page, index) => {
              if (children) {
                return React.cloneElement(children as React.ReactElement, {
                  data: page.content,
                  key: index,
                })
              }
              return page?.content?.map((item, index) => {
                return (
                  <div
                    key={index}
                    onClick={(
                      e: React.MouseEvent<HTMLDivElement, MouseEvent>
                    ) => {
                      if (path) return

                      setCurrentId(item?.id)
                      if (onClick) {
                        onClick({ e, id: item?.id })
                        return
                      }
                      setOpenDrawer?.(true)
                    }}
                  >
                    {path ? (
                      <Link href={`${path}/${item?.id}`}>
                        <Content label={item?.name ?? item?.date} isArrow />
                      </Link>
                    ) : (
                      console.log(item),
                      <Content label={item?.name ?? item.id + " - " + (item?.productId != null ? "Produto" : "Pedido") + " - " + dayjs(item?.date).format("DD/MM/YYYY")} />
                    )}
                  </div>
                )
              })
            })}
          </div>
        )}
      </div>

      {(hasNextPage || isLoading) && !!data && (
        <Button
          className="w-full p-2 text-center"
          variant="text"
          disabled={isFetching || isLoading}
          onClick={() => fetchNextPage()}
        >
          {isFetching && !isLoading && data ? (
            <div className="flex animate-spin items-center justify-center">
              <Icon name="progress_activity" />
            </div>
          ) : (
            `Carregar mais ${title.toLocaleLowerCase()}`
          )}
        </Button>
      )}

      {setOpenDrawer && (
        <Drawer
          open={openDrawer ?? false}
          setOpen={setOpenDrawer}
          title={currentId ? `Editar ${label}` : `Novo ${label}`}
        >
          {React.createElement(form ?? (() => <></>), {
            id: currentId,
            setOpenDrawer,
          })}
        </Drawer>
      )}
    </>
  )
}

export { PaginatedList }
