import EventData from '@/components/Event/eventData'
import { useAuth } from '@/context/AuthContext'
import { motion } from 'framer-motion' // Import motion from framer-motion
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EventDetails = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const event = EventData.find((event) => event.id === id)
  const { isAuthenticated, user } = useAuth()
  const [reservationData, setReservationData] = useState({
    name: '',
    email: '',
    seats: 1,
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setReservationData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle reservation logic here
    console.log('Reservation data:', reservationData)
  }

  const handleLoginRedirect = () => {
    navigate('/login') // Navigate to login page
  }

  if (!event) {
    return <div className="py-20 text-center">Event not found</div>
  }

  return (
    <motion.div
      className="bg-gray-50 dark:bg-gray-900 py-20 lg:py-25 xl:py-30"
      initial={{ opacity: 0 }} // Initial state
      animate={{ opacity: 1 }} // Animate to this state
      exit={{ opacity: 0 }} // Exit state
      transition={{ duration: 0.5 }} // Animation duration
    >
      <div className="mx-auto max-w-4xl px-4 md:px-8">
        <motion.div
          className="rounded-lg shadow-lg bg-white dark:bg-gray-800 p-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={event.mainImage}
            alt={event.name}
            className="w-full h-60 object-cover rounded-lg"
          />
          <h1 className="mt-5 text-3xl font-bold text-black dark:text-white">
            {event.name}
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            {event.startDate} - {event.endDate}
          </p>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            {event.venue}
          </p>
          <p className="mt-5 text-gray-700 dark:text-gray-300">
            {event.description}
          </p>

          {isAuthenticated && user?.role === 'USER' ? (
            <motion.form
              onSubmit={handleSubmit}
              className="mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                Reserve Your Seats
              </h2>
              <div className="mt-4">
                <label className="block text-gray-700 dark:text-gray-300">
                  Name:
                </label>
                <input
                  type="text"
                  name="name"
                  value={reservationData.name}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-secondary"
                  required
                />
              </div>
              <div className="mt-4">
                <label className="block text-gray-700 dark:text-gray-300">
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  value={reservationData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-secondary"
                  required
                />
              </div>
              <div className="mt-4">
                <label className="block text-gray-700 dark:text-gray-300">
                  Number of Seats:
                </label>
                <select
                  name="seats"
                  value={reservationData.seats}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-secondary"
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="mt-4 w-full bg-primary text-white p-3 rounded hover:bg-secondary transition focus:outline-none focus:ring-2 focus:ring-secondary dark:hover:bg-primary dark:bg-secondary"
              >
                Reserve Seats
              </button>
            </motion.form>
          ) : (
            <div className="mt-8 text-center">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                You need to log in to reserve seats.
              </h2>
              <button
                onClick={handleLoginRedirect}
                className="mt-4 bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition focus:outline-none"
              >
                Log In
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default EventDetails
