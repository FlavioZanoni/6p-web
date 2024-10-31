"use client"
import { useSize } from "@folhastech/design-system/useSize"
import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const Links = () => {
  const size = useSize()
  const isMobile = size === "md" || size === "sm"
  const pathname = usePathname()

  const menus = [
    {
      title: "Produtos",
      icon: "home",
      link: "/",
      alt: "Início",
      roles: []
    },
    {
      title: "Clientes",
      icon: "diversity_3",
      link: "/menu/clients",
      roles: []
    },
    {
      title: "Fornecedores",
      icon: "diversity_2",
      link: "/menu/suppliers",
      roles: []
    },
  ]
  const desktopMenus = [
    {
      title: "Produtos",
      isLogo: true,
      icon: "home",
      link: "/",
      alt: "Início",
      roles: []
    },
    {
      title: "Clientes",
      icon: "diversity_3",
      link: "/menu/clients",
      roles: []
    },
    {
      title: "Fornecedores",
      icon: "diversity_2",
      link: "/menu/suppliers",
      roles: []
    },
  ]

  if (!isMobile) {
    return (
      <>
        {desktopMenus.map((menu) => {
          return (
            <Link
              key={menu.link}
              href={menu.link}
              className={clsx(
                (menu.link === "/menu" && "mt-auto")
              )}
            >
              <div
                className={clsx(
                  "flex h-12 w-12 flex-col items-center justify-center gap-1",
                  pathname === menu.link &&
                  "rounded-full bg-primary-40 shadow-[0px_2px_14px_rgba(8,112,217,0.25)]"
                )}
              >
                {menu.isLogo ? (
                  <Image
                    src={
                      "/logo.svg"
                    }
                    alt="Logo"
                    width={24}
                    height={24}
                    className={`h-full w-full ${pathname !== menu.link ? "" : "brightness-[0] invert"
                      }`}
                  />
                ) : (
                  <span
                    className={clsx(
                      "material-symbols-outlined ",
                      pathname === menu.link ? "text-white" : "text-gray-10",
                      "flex w-full items-center text-center"
                    )}
                  >
                    {menu.icon}
                  </span>
                )}
                {pathname !== menu.link && (
                  <span className="text-xs text-gray-10">{menu.title}</span>
                )}
              </div>
            </Link>
          )
        })}
      </>
    )
  }

  return (
    <>
      {menus.map((menu) => {
        return (
          <Link key={menu.link} href={menu.link}>
            <div
              className={clsx(
                "flex h-12 w-12 flex-col items-center justify-center gap-1",
                pathname === menu.link &&
                "rounded-full bg-primary-40 shadow-[0px_2px_14px_rgba(8,112,217,0.25)] "
              )}
            >
              <span
                className={clsx(
                  "material-symbols-outlined ",
                  pathname === menu.link ? "text-white" : "text-gray-10",
                  "text-center"
                )}
              >
                {menu.icon}
              </span>

              {pathname !== menu.link && (
                <span className="text-xs text-gray-10">{menu.title}</span>
              )}
            </div>
          </Link>
        )
      })}
    </>
  )
}
