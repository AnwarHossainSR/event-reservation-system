import ThemeToggler from '@/components/Header/ThemeToggler'
import { useState } from 'react'
import { FiMenu, FiSearch } from 'react-icons/fi'

const Header = ({ toggleSidebar, menuItems }: any) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredItems, setFilteredItems] = useState([])

  const handleSearch = (e: any) => {
    const query = e.target.value.toLowerCase()
    setSearchQuery(query)

    // Filter the menu items based on the search query
    const filtered = menuItems.filter(
      (item: any) =>
        item.name.toLowerCase().includes(query) ||
        item.subItems.some((subItem: any) =>
          subItem.name.toLowerCase().includes(query)
        )
    )
    setFilteredItems(filtered)
  }

  return (
    <header className="flex items-center justify-between h-16 px-4 bg-white dark:bg-black shadow-md">
      {/* Mobile menu button */}
      <button
        onClick={toggleSidebar}
        className="text-black dark:text-white md:hidden focus:outline-none"
      >
        <FiMenu size={24} />
      </button>

      {/* Search bar (Visible only on large screens) */}
      <div className="relative hidden md:flex items-center w-full max-w-md">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search..."
          className="w-full px-4 py-2 text-gray-700 bg-gray-100 dark:bg-gray-900 dark:text-white border rounded-md focus:outline-none"
        />
        <FiSearch className="absolute right-4 text-gray-500 dark:text-gray-300" />

        {/* Search Results Dropdown */}
        {searchQuery && (
          <div className="absolute top-12 left-0 w-full bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-auto">
            {filteredItems.length > 0 ? (
              filteredItems.map((item: any) => (
                <div key={item.name} className="p-2">
                  <div className="text-black dark:text-white font-semibold">
                    {item.name}
                  </div>
                  {/* Show subitems if they match */}
                  {item.subItems.length > 0 && (
                    <div className="ml-4">
                      {item.subItems
                        .filter((subItem: any) =>
                          subItem.name.toLowerCase().includes(searchQuery)
                        )
                        .map((subItem: any) => (
                          <div
                            key={subItem.name}
                            className="text-gray-600 dark:text-gray-300"
                          >
                            {subItem.name}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="p-4 text-gray-500 dark:text-gray-400">
                No results found
              </div>
            )}
          </div>
        )}
      </div>

      {/* Theme Toggler on the right side */}
      <div className="flex items-center">
        <ThemeToggler />
      </div>
    </header>
  )
}

export default Header
