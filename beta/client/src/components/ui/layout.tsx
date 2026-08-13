import { Outlet } from "react-router-dom"
import { SidebarProvider, SidebarTrigger } from "./sidebar"

import { AppSidebar } from "./app-sidebar"

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />

      <main className="w-full p-4">
        <Outlet />
      </main>
    </SidebarProvider>
  )
}
