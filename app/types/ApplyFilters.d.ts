import type { Filters } from './FilterDrawer'

export interface ApplyFiltersProps {
  filters: Filters
}

export interface ApplyFiltersEmit {
  (e: 'remove', key: string): void
}
