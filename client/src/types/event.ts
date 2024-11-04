export interface Event {
  name: string
  startDate: string
  endDate: string
  totalSeats: number
  availableSeats: number
  venue: string
  id?: string
  createdBy?: any
  createdAt?: string
  updatedAt?: string
}
