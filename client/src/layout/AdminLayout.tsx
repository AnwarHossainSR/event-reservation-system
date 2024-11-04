import Header from '@/components/Authenticated/Common/Header'
import Sidebar from '@/components/Authenticated/Common/Sidebar'
import { useState } from 'react'

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false) // Initially set sidebar to closed

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev) // Toggle sidebar open/close
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-black">
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex flex-col flex-1">
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}

export default AdminLayout
