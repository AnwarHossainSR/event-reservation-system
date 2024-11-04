import DataTable from '@/components/Datatable'
import Modal from '@/components/Modal'
import { eventService } from '@/services/event'
import { Event } from '@/types/event'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Index = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isModalOpen, setModalOpen] = useState(false)
  const [currentEventId, setCurrentEventId] = useState<string | null>(null)
  const navigate = useNavigate()

  const columns = [
    { header: 'Event Name', accessor: 'name' },
    { header: 'Date', accessor: 'date' },
    { header: 'Venue', accessor: 'venue' },
    { header: 'Actions', accessor: 'actions' },
  ]

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await eventService.fetchEvents()
        setEvents(response.data)
      } catch (error) {
        setError('Failed to fetch events')
        toast.error('Failed to fetch events')
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  const data = events.map((event: Event) => ({
    name: event.name,
    date: new Date(event.startDate).toLocaleDateString(),
    venue: event.venue,
    actions: (
      <div>
        <button
          className="mr-2 px-3 py-1 text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
          onClick={() => handleEdit(event.id ?? '')}
        >
          Edit
        </button>
        <button
          className="px-3 py-1 text-sm font-semibold text-white bg-red-500 rounded hover:bg-red-600"
          onClick={() => handleDelete(event.id ?? '')}
        >
          Delete
        </button>
      </div>
    ),
  }))

  const handleEdit = (eventId: string) => {
    if (eventId) {
      navigate(`/admin/events/edit/${eventId}`)
    }
  }

  const handleDelete = (eventId: string) => {
    setCurrentEventId(eventId)
    setModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (currentEventId) {
      try {
        await eventService.deleteEvent(currentEventId)
        setEvents((prevEvents) =>
          prevEvents.filter((event: any) => event.id !== currentEventId)
        )
        toast.success('Event deleted successfully')
      } catch (error: any) {
        toast.error(error.response.data.message)
        console.error(error)
      } finally {
        setModalOpen(false)
        setCurrentEventId(null)
      }
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">All Events</h1>
      {loading ? (
        <p>Loading events...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <DataTable columns={columns} data={data} />
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Confirm Delete"
        message="Are you sure you want to delete this event?"
      />
    </div>
  )
}

export default Index
