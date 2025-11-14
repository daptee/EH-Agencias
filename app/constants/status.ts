export type StatusKeyHistory = 1 | 2 | 3 | 4 | 'default'
export type StatusKey = 'F' | 'Z' | 'default'

export interface StatusItem {
  name: string
  color: string
  icon: string
}

interface StatusItemHistory {
  name: string
  bullet: {
    border: string
    center: string
  }
}

export const BASE_STATUSES_LIST_HISTORY: Record<
  StatusKeyHistory,
  StatusItemHistory
> = {
  1: {
    name: 'Iniciada',
    bullet: {
      border: '#AFCFE7',
      center: '#3686C3',
    },
  },
  2: {
    name: 'Confirmada',
    bullet: {
      border: '#9EE1E1',
      center: '#0CB4B5',
    },
  },
  3: {
    name: 'Cancelada',
    bullet: {
      border: '#E8B455',
      center: '#F6E1BB',
    },
  },
  4: {
    name: 'Rechazada',
    bullet: {
      border: '#E85555',
      center: '#F6BBBB',
    },
  },
  default: {
    name: '',
    bullet: {
      border: '#e3e3e3',
      center: '#9d9d9d',
    },
  },
} as const

export const BASE_STATUSES_LIST: Record<StatusKey, StatusItem> = {
  F: {
    name: 'Pendiente',
    color: '#E8B455',
    icon: '$bullet_point_pending',
  },
  Z: {
    name: 'Completada',
    color: '#0CB4B5',
    icon: '$bullet_point_confirmed',
  },
  default: {
    name: '',
    color: '#9d9d9d',
    icon: '',
  },
} as const
