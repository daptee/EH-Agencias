import type {
  DatePickerModel,
  DatePickerRangeObject,
} from 'v-calendar/dist/types/src/use/datePicker.js'

export interface AvailabilityCalendarProps {
  availabilityCalendarData: AvailabilityCalendarData
}

export interface AvailabilityCalendarEmits {
  (e: 'checkAvailability'): void
}

export interface AvailabilityCalendarData {
  dates: DatePickerRangeObject | null
  adults: number
  children: number
}
