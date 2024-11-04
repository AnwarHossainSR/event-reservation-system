import { eventService } from '@/services/event'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const AdminCreateEvent = () => {
  const [eventData, setEventData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    totalSeats: 0,
    availableSeats: 0,
    venue: '',
  })

  // State for minimum date
  const [minDate, setMinDate] = useState('')
  const [errors, setErrors] = useState<string[]>([]) // State for error messages

  useEffect(() => {
    // Get the current date and time in the format YYYY-MM-DDTHH:mm
    const now = new Date()
    const currentDate = now.toISOString().slice(0, 16) // Format: YYYY-MM-DDTHH:mm
    setMinDate(currentDate)
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setEventData((prevData) => ({
      ...prevData,
      [name]:
        name === 'totalSeats' || name === 'availableSeats'
          ? parseInt(value)
          : value,
    }))
  }

  const validateForm = () => {
    const newErrors: string[] = []

    if (!eventData.name) newErrors.push('Event name is required.')
    if (!eventData.startDate) newErrors.push('Start date is required.')
    if (!eventData.endDate) newErrors.push('End date is required.')
    if (eventData.startDate >= eventData.endDate) {
      newErrors.push('End date must be after start date.')
    }
    if (eventData.totalSeats <= 0) {
      newErrors.push('Total seats must be greater than zero.')
    }
    if (eventData.availableSeats < 0) {
      newErrors.push('Available seats cannot be negative.')
    }
    if (eventData.availableSeats > eventData.totalSeats) {
      newErrors.push('Available seats cannot exceed total seats.')
    }
    if (!eventData.venue) newErrors.push('Venue is required.')

    setErrors(newErrors)
    return newErrors.length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (validateForm()) {
        const response = await eventService.createEvent(eventData)
        if (response) {
          toast.success(response.message)
          setEventData({
            name: '',
            startDate: '',
            endDate: '',
            totalSeats: 0,
            availableSeats: 0,
            venue: '',
          })
        }
      }
    } catch (error: any) {
      toast.error('Something went wrong')
      console.error(error)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-white dark:bg-gray-900 p-5">
      <div className="bg-gray-200 dark:bg-gray-800 rounded-lg shadow-md p-8 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Create New Event
        </h2>
        <form onSubmit={handleSubmit}>
          {errors.length > 0 && (
            <div className="mb-4">
              <ul className="text-red-600">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Event Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={eventData.name}
              onChange={handleChange}
              required
              className="mt-1 p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Start Date
            </label>
            <input
              type="datetime-local"
              id="startDate"
              name="startDate"
              value={eventData.startDate}
              onChange={handleChange}
              required
              min={minDate}
              className="mt-1 p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="endDate"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              End Date
            </label>
            <input
              type="datetime-local"
              id="endDate"
              name="endDate"
              value={eventData.endDate}
              onChange={handleChange}
              required
              min={eventData.startDate ? eventData.startDate : minDate}
              className="mt-1 p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="totalSeats"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Total Seats
            </label>
            <input
              type="number"
              id="totalSeats"
              name="totalSeats"
              value={eventData.totalSeats}
              onChange={handleChange}
              required
              min="1"
              className="mt-1 p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="availableSeats"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Available Seats
            </label>
            <input
              type="number"
              id="availableSeats"
              name="availableSeats"
              value={eventData.availableSeats}
              onChange={handleChange}
              required
              min="0"
              className="mt-1 p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="venue"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Venue
            </label>
            <input
              type="text"
              id="venue"
              name="venue"
              value={eventData.venue}
              onChange={handleChange}
              required
              className="mt-1 p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-6 p-3 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminCreateEvent
