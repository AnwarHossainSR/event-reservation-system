import { randomStaticImage } from '@/lib/utils'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const EventItem = ({ event }: { event: any }) => {
  const {
    mainImage,
    name,
    startDate,
    endDate,
    availableSeats,
    venue,
    description,
  } = event

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 1, delay: 0.5 }}
      viewport={{ once: true }}
      className="rounded-lg bg-white p-4 pb-9 shadow-solid-8 dark:bg-blacksection"
    >
      <Link
        to={`/events/${event.id}/reservation`}
        className="relative block aspect-[368/239]"
      >
        <img src={mainImage || randomStaticImage()} alt={name} />
      </Link>

      <div className="px-4">
        <h3 className="mt-7.5 mb-3.5 text-lg font-medium text-black dark:text-white xl:text-itemtitle2">
          <Link to={`/events/${event.id}/reservation`}>{name}</Link>
        </h3>
        <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
          {new Date(startDate).toLocaleDateString()} -{' '}
          {new Date(endDate).toLocaleDateString()}
        </p>
        <p className="mb-2 text-sm font-semibold">{venue}</p>
        <p className="mb-2 line-clamp-3">{description}</p>
        <p className="text-sm font-semibold text-primary">
          {availableSeats} seats available
        </p>
      </div>
    </motion.div>
  )
}

export default EventItem
