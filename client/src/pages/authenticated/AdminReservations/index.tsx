import DataTable from '@/components/Datatable'
import { reservationService } from '@/services/reservation' // Adjust path if necessary
import React, { useEffect, useState } from 'react'

const ReservationsPage: React.FC = () => {
  const [reservations, setReservations] = useState([])

  // Define columns for the DataTable
  const columns = [
    { header: 'User Name', accessor: 'userName' },
    { header: 'Event Name', accessor: 'eventName' },
    { header: 'Seats', accessor: 'seats' },
    { header: 'Start Date', accessor: 'startDate' },
    { header: 'End Date', accessor: 'endDate' },
    { header: 'Created At', accessor: 'createdAt' },
  ]

  useEffect(() => {
    // Fetch reservations using reservationService
    const fetchReservations = async () => {
      try {
        const data = await reservationService.getReservations()
        console.log('data', data)
        // Format dates and map user and event names
        const formattedData = data.map((reservation: any) => ({
          ...reservation,
          userName: reservation.user?.name || 'N/A', // Map user name
          eventName: reservation.event?.name || 'N/A', // Map event name
          startDate: new Date(reservation.startDate).toLocaleDateString(),
          endDate: new Date(reservation.endDate).toLocaleDateString(),
          createdAt: new Date(reservation.createdAt).toLocaleDateString(),
        }))

        setReservations(formattedData)
      } catch (error) {
        console.error('Failed to fetch reservations:', error)
      }
    }

    fetchReservations()
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Reservations</h1>
      <DataTable columns={columns} data={reservations} />
    </div>
  )
}

export default ReservationsPage
