import { useState } from 'react'
import {
  FiChevronDown,
  FiChevronUp,
  FiGrid,
  FiHome,
  FiList,
  FiLogOut,
  FiSettings,
  FiStar,
  FiUser,
  FiX,
} from 'react-icons/fi'
import { Link } from 'react-router-dom'

const Sidebar = ({ sidebarOpen, toggleSidebar }: any) => {
  // Receive props
  const [openDropdown, setOpenDropdown] = useState(null) // Track which dropdown is open

  const menuItems = [
    {
      name: 'Home',
      icon: <FiHome />,
      path: '/', // Assuming this is the homepage path
      subItems: [],
    },
    {
      name: 'Dashboard',
      icon: <FiGrid />,
      path: '/admin',
      subItems: [],
    },
    {
      name: 'Users',
      icon: <FiUser />,
      path: '/admin/users',
      subItems: [
        { name: 'All Users', path: '/admin/users/all' },
        { name: 'Create User', path: '/admin/users/create' },
      ],
    },
    {
      name: 'Categories',
      icon: <FiList />,
      path: '/admin/categories',
      subItems: [
        { name: 'All Categories', path: '/admin/categories/all' },
        { name: 'Create Category', path: '/admin/categories/create' },
      ],
    },
    {
      name: 'Posts', // Updated from Reviews to Posts
      icon: <FiStar />,
      path: '/admin/posts',
      subItems: [
        { name: 'All Posts', path: '/admin/posts/all' },
        { name: 'Create Post', path: '/admin/posts/create' },
      ],
    },
    {
      name: 'Settings',
      icon: <FiSettings />,
      path: '/admin/settings',
      subItems: [
        { name: 'General', path: '/admin/settings/general' },
        { name: 'Security', path: '/admin/settings/security' },
      ],
    },
  ]

  const logout = () => {
    console.log('Logout')
  }

  const toggleDropdown = (index: any) => {
    if (openDropdown === index) {
      setOpenDropdown(null)
    } else {
      setOpenDropdown(index)
    }
  }

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-black shadow-md transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-200 md:relative md:translate-x-0`}
    >
      {/* Sidebar header */}
      <div className="flex items-center justify-between h-16 px-4">
        <span className="text-xl font-semibold text-black dark:text-white">
          Admin
        </span>
        {/* Close button on mobile */}
        <button
          onClick={toggleSidebar} // Toggle sidebar
          className="text-black dark:text-white md:hidden focus:outline-none"
        >
          <FiX size={24} />
        </button>
      </div>

      {/* Navigation menu */}
      <nav className="px-4 py-2 overflow-y-auto">
        {menuItems.map((item, index) => (
          <div key={item.name} className="mb-2">
            {/* Main Menu Item */}
            <div
              className="flex items-center justify-between px-4 py-2 text-gray-600 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md cursor-pointer"
              onClick={() => item.subItems.length > 0 && toggleDropdown(index)}
            >
              <Link to={item.path} className="flex items-center">
                <span className="text-xl">{item.icon}</span>
                <span className="ml-4">{item.name}</span>
              </Link>
              {item.subItems.length > 0 && (
                <span>
                  {openDropdown === index ? <FiChevronUp /> : <FiChevronDown />}
                </span>
              )}
            </div>

            {/* Submenu (Dropdown) */}
            <div
              className={`overflow-hidden transition-all duration-1000 ease-in-out transform ${
                openDropdown === index
                  ? 'max-h-screen opacity-100'
                  : 'max-h-0 opacity-0'
              }`}
            >
              {item.subItems.length > 0 && (
                <div className="ml-8 mt-1 space-y-1">
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.name}
                      to={subItem.path}
                      className="block px-4 py-2 text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md"
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Logout Button */}
        <div className="mt-8">
          <span
            className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md cursor-pointer"
            onClick={logout}
          >
            <FiLogOut className="text-xl text-red-700" />
            <span className="ml-4">Logout</span>
          </span>
        </div>
      </nav>
    </div>
  )
}

export default Sidebar