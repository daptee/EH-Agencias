export interface AvailabilityCalendarProps {
  availabilityCalendarData: AvailabilityCalendarData
}

export interface AvailabilityCalendarData {
  dates: Date[] | null
  adults: number
  children: number
}
