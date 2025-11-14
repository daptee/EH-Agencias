import type { AvailabilityCalendarData } from './AvailabilityCalendar'
import type { ReservationData } from './Reservations'
import type { AvailableRooms } from './RoomsServices'

export interface BuyProcessModalProps {
  disabled: boolean
  roomData: AvailableRooms
  reservationData: ReservationData
  availabilityCalendarData: AvailabilityCalendarData
}
