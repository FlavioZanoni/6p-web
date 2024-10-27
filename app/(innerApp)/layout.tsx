import { FloatingMenu } from "@components/FloatingMenu"
import { Footer } from "@components/Footer"
import { Header } from "@components/Header"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <>
      <main className="flex items-center justify-center overflow-y-auto bg-primary-40 lg:h-[100dvh] lg:border-gray-20 lg:py-8">
        <div className="flex w-screen flex-col items-center overflow-y-clip lg:max-w-[1032px] lg:flex-row-reverse lg:gap-2 xl:max-w-[1280px]">
          <div className="flex w-full flex-col bg-white lg:h-[calc(100dvh-64px)] lg:rounded-xl lg:border lg:border-gray-20">
            <Header />
            {children}
          </div>
          <Footer />
        </div>
      </main>
      <FloatingMenu />
    </>
  )
}
