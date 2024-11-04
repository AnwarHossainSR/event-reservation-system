import React, { useState } from 'react'

interface DataTableProps {
  columns: Array<{ header: string; accessor: string }>
  data: Array<Record<string, any>>
}

const DataTable: React.FC<DataTableProps> = ({ columns, data }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortConfig, setSortConfig] = useState<{
    key: string
    direction: 'ascending' | 'descending'
  } | null>(null)

  // Filtered and sorted data based on search and sorting
  const filteredData = data.filter((item) =>
    columns.some((column) =>
      item[column.accessor]
        ?.toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
  )

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig) return 0
    const { key, direction } = sortConfig
    if (a[key] < b[key]) {
      return direction === 'ascending' ? -1 : 1
    }
    if (a[key] > b[key]) {
      return direction === 'ascending' ? 1 : -1
    }
    return 0
  })

  // Sorting request function
  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending'
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  return (
    <div className="overflow-x-auto">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 p-2 rounded dark:bg-gray-800 dark:text-white"
        />
      </div>
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700">
            {columns.map((column) => (
              <th
                key={column.accessor}
                className="px-4 py-2 cursor-pointer text-left text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
                onClick={() => requestSort(column.accessor)}
              >
                <div className="flex items-center">
                  {column.header}
                  {sortConfig?.key === column.accessor && (
                    <span className="ml-2">
                      {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center px-4 py-2 dark:bg-gray-800"
              >
                No data available
              </td>
            </tr>
          ) : (
            sortedData.map((row, index) => (
              <tr
                key={index}
                className="hover:bg-gray-100 dark:hover:bg-gray-600 border-b border-gray-300 dark:border-gray-600"
              >
                {columns.map((column) => (
                  <td
                    key={column.accessor}
                    className="px-4 py-2 text-gray-800 dark:text-white"
                  >
                    {row[column.accessor]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default DataTable
