import Header from "./Header/Header"
import React from "react"

interface LayoutInterface {
    children: React.ReactNode
}

export default function Layout({ children }: LayoutInterface) {
    return (
        <>
          <Header />
          {children}
        </>

    )
}