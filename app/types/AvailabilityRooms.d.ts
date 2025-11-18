import type { AvailabilityCalendarData } from './AvailabilityCalendar'
import type { ReservationData } from './Reservations'
import type { AvailableRooms } from './RoomsServices'

export interface AvailabilityRoomsProps {
  reservationData: ReservationData
  availableRooms: AvailableRooms[]
  availabilityCalendarData: AvailabilityCalendarData
}
