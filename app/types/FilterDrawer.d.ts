export interface FiltersEmit {
  (e: 'apply', filters: Filters): void
}

export interface Filters {
  fromDate?: Date | string | null
  toDate?: Date | string | null
  room?: string | null | undefined
  status?: string | null | undefined
}
