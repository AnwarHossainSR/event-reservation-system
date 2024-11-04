import { useAuth } from '@/context/AuthContext'
import { formatDate, randomStaticImage } from '@/lib/utils'
import { eventService } from '@/services/event'
import { reservationService } from '@/services/reservation'
import { Event } from '@/types/event'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'

const EventDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated, user } = useAuth()
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [reservationData, setReservationData] = useState({
    seats: 1,
    userId: user?.id || '',
    eventId: id,
  })

  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) return
      try {
        setLoading(true)
        const data = await eventService.fetchEventById(id)
        setEvent(data.data)
      } catch (err: any) {
        setError(err.response.data.message)
      } finally {
        setLoading(false)
      }
    }

    fetchEvent()
  }, [id])

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setReservationData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      const data = {
        ...reservationData,
        startDate: event?.startDate,
        endDate: event?.endDate,
      }
      const response = await reservationService.createReservation(data)
      if (response) {
        toast.success(response.message)
        setTimeout(() => {
          toast.success('Please check your email for confirmation')
        }, 3000)
      }
    } catch (error: any) {
      console.log('error', error)
      toast.error(error.response.data.message)
    }
  }

  const handleLoginRedirect = () => {
    navigate('/login')
  }

  if (loading) return <div className="py-20 text-center">Loading...</div>
  if (error) return <div className="py-20 text-center">{error}</div>
  if (!event) return <div className="py-20 text-center">Event not found</div>

  return (
    <motion.div
      className="bg-gray-50 dark:bg-gray-900 py-20 lg:py-25 xl:py-30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
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
            src={event.mainImage || randomStaticImage()}
            alt={event.name}
            className="w-full h-60 object-cover rounded-lg"
          />
          <h1 className="mt-5 text-3xl font-bold text-black dark:text-white">
            {event.name}
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            {formatDate(event.startDate)} to {formatDate(event.endDate)}
          </p>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Vanue: {event.venue}
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
