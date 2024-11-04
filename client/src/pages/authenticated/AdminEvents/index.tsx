import DataTable from '@/components/Datatable'

const Index = () => {
  const columns = [
    { header: 'Event Name', accessor: 'name' },
    { header: 'Date', accessor: 'date' },
    { header: 'Location', accessor: 'location' },
    { header: 'Actions', accessor: 'actions' },
  ]

  // Example data
  const data = [
    {
      name: 'Event 1',
      date: '2024-11-05',
      location: 'Location 1',
      actions: 'Edit | Delete',
    },
    {
      name: 'Event 2',
      date: '2024-11-06',
      location: 'Location 2',
      actions: 'Edit | Delete',
    },
    {
      name: 'Event 3',
      date: '2024-11-07',
      location: 'Location 3',
      actions: 'Edit | Delete',
    },
    {
      name: 'Event 4',
      date: '2024-11-08',
      location: 'Location 4',
      actions: 'Edit | Delete',
    },
    {
      name: 'Event 5',
      date: '2024-11-09',
      location: 'Location 5',
      actions: 'Edit | Delete',
    },
  ]

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">All Events</h1>
      <DataTable columns={columns} data={data} />
    </div>
  )
}

export default Index
