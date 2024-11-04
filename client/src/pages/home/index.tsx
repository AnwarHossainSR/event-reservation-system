import EventItem from '@/components/Event/EventItem'
import { eventService } from '@/services/event'
import { Event } from '@/types/event'
import { useEffect, useState } from 'react'

const Home = () => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await eventService.fetchEvents()
        setEvents(data.data)
      } catch (error) {
        console.error('Failed to fetch events:', error)
      }
    }

    fetchEvents()
  }, [])

  return (
    <section className="py-20 lg:py-25 xl:py-30">
      <div className="mx-auto mt-15 max-w-c-1280 px-4 md:px-8 xl:mt-20 xl:px-0">
        <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
          {events &&
            events.length > 0 &&
            events.map((event: Event) => (
              <EventItem key={event.id} event={event} />
            ))}
        </div>
      </div>
    </section>
  )
}

export default Home
